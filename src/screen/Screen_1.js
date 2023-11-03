import React, { Children, useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ping from 'react-native-ping';
import { NetworkInfo } from 'react-native-network-info';
import { getIpAddressesForHostname } from 'react-native-dns-lookup';

export const Screen_1 = () => {
  const [ip, setip] = useState(null);
  const [available, setAvailable] = useState([]);
  const [scan, setScan] = useState(false);

  async function lanScan() {
    setAvailable([]);
    setScan(true);
    for (var i = 1; i <= 255; i++) {
      try {
        await Ping.start(ip.substring(0, ip.lastIndexOf('.')) + '.' + i, {
          timeout: 500,
        });
        console.log(
          ip.substring(0, ip.lastIndexOf('.')) + '.' + i,
          '<- awailable ->',
        );

        setAvailable(old => [
          ...old,
          ip.substring(0, ip.lastIndexOf('.')) + '.' + i,
        ]);
      } catch (error) {
        // console.log('special code', error.code, error.message, 'no is:-', i);
      }
    }
    setScan(false);
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
    });
  }, []);

  useEffect(() => {
    if (ip != null) {
      lanScan();
      getIpAddressesForHostname('192.168.5.102').then(ipAddresses =>
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
    <View
      style={{
        flex: 1,
        margin: 10,
        borderWidth: 1,
        padding: 20,
        borderColor: '#b8c553ff',
        borderRadius: 10,
      }}>
      <Text style={{ fontSize: 20, color: '#909109' }}>
        Connected IP Address
      </Text>
      {available == null ? (
        <Text>Scanning ...</Text>
      ) : (
        <View style={{ flex: 1, padding: 10, marginLeft: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <Text style={{ fontSize: 16, color: 'black' }}>No.</Text>
            <Text style={{ fontSize: 16, color: 'black', marginLeft: 40 }}>
              IP Address
            </Text>
          </View>
          {available.map((data, key) => {
            return (
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                }}
                key={key}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#34bbd3a6',
                    marginHorizontal: 12,
                  }}>
                  {key + 1}.
                </Text>
                <Text
                  style={{ fontSize: 15, color: '#d36318', marginLeft: 30 }}>
                  {data}
                </Text>
              </View>
            );
          })}
          {scan ? (
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'red',
                }}>
                Scanning....
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={lanScan}
              style={{
                margin: 40,
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#74e470ad',
              }}>
              <Text
                style={{ fontSize: 16, fontWeight: '600', color: '#bb9b1bff' }}>
                Re Scan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
