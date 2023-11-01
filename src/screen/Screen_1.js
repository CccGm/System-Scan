import React, { Children, useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ping from 'react-native-ping';
import { NetworkInfo } from 'react-native-network-info';
import { getIpAddressesForHostname } from 'react-native-dns-lookup';

export const Screen_1 = () => {
  const [ip, setip] = useState(null);
  const [available, setAvailable] = useState(null);
  const [getway, setgateWay] = useState(null);

  let LIST = [];
  async function lanScan() {
    setAvailable(null);
    for (var i = 1; i <= 255; i++) {
      try {
        await Ping.start(ip.substring(0, ip.lastIndexOf('.')) + '.' + i, {
          timeout: 500,
        });
        console.log(
          ip.substring(0, ip.lastIndexOf('.')) + '.' + i,
          '<- awailable ->',
        );
        LIST.push(ip.substring(0, ip.lastIndexOf('.')) + '.' + i);
      } catch (error) {
        // console.log('special code', error.code, error.message, 'no is:-', i);
      }
    }
    console.log(JSON.stringify(LIST), '<---Available ips');
    setAvailable(LIST);
    console.log('Done!');
  }
  useEffect(() => {
    NetworkInfo.getIPAddress().then(ipAddress => {
      console.log(ipAddress, '----ipaddress');
    });

    // Get IPv4 IP (priority: WiFi first, cellular second)
    NetworkInfo.getIPV4Address().then(ipv4Address => {
      console.log(ipv4Address, '----ip v4');
      setip(ipv4Address);
    });

    // Get Default Gateway IP
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log(defaultGateway, '----gate way');
      setgateWay(defaultGateway);
    });
  }, []);

  useEffect(() => {
    if (ip != null) {
      lanScan();
      getIpAddressesForHostname('192.168.0.109').then(ipAddresses =>
        console.log(ipAddresses, 'host name ---'),
      );
    }
    getPublicIPAddress();
  }, [ip]);

  const getPublicIPAddress = async () => {
    try {
      const response = await fetch(
        'https://dns.google/resolve?name=o-o.myaddr.l.google.com&type=TXT',
      );
      if (response.data && response.data.Answer) {
        const ipAddress = response.data.Answer[0].data;
        console.log('Your public IP address is:', ipAddress);
        return ipAddress;
      }
    } catch (error) {
      console.error('Error getting public IP address:', error);
    }
    return null;
  };

  return (
    <View style={{ flex: 1, margin: 10, borderWidth: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, color: '#5da539' }}>Screen 1</Text>
      {available == null ? (
        <Text>Scanning ...</Text>
      ) : (
        <View style={{ flex: 1, padding: 10 }}>
          {available.map((data, key) => {
            return (
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#b8c553ff',
                  borderRadius: 10,
                  marginTop: 5,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#34bbd3a6',
                    marginHorizontal: 12,
                  }}>
                  {key + 1}.
                </Text>
                <Text style={{ fontSize: 16, color: '#d36318' }}>{data}</Text>
              </View>
            );
          })}

          <TouchableOpacity
            onPress={lanScan}
            style={{
              margin: 25,
              padding: 10,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#74e470ad',
            }}>
            <Text
              style={{ fontSize: 16, fontWeight: '500', color: '#bb9b1bff' }}>
              Re Scan
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
