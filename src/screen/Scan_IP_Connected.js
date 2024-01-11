import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
// import Ping from 'react-native-ping';
import { NetworkInfo } from 'react-native-network-info';
import { getIpAddressesForHostname } from 'react-native-dns-lookup';
import { useNavigation } from '@react-navigation/native';

export const Scan_IP_Connected = () => {
  const [ip, setip] = useState(null);
  const [available, setAvailable] = useState([]);
  const [scan, setScan] = useState(false);
  const navigation = useNavigation();

  async function lanScan() {
    // setAvailable([]);
    // setScan(true);
    // for (var i = 1; i <= 255; i++) {
    //   try {
    //     await Ping.start(ip.substring(0, ip.lastIndexOf('.')) + '.' + i, {
    //       timeout: 200,
    //     });
    //     // console.log(
    //     //   ip.substring(0, ip.lastIndexOf('.')) + '.' + i,
    //     //   '<- awailable ->',
    //     // );
    //     setAvailable(old => [
    //       ...old,
    //       ip.substring(0, ip.lastIndexOf('.')) + '.' + i,
    //     ]);
    //   } catch (error) {
    //     // console.log('special code', error.code, error.message, 'no is:-', i);
    //   }
    // }
    // setScan(false);
    // console.log('Done! IP Scan');
  }

  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ipv4Address => {
      console.log(ipv4Address, '----ip v4');
      setip(ipv4Address);
    });
    if (ip != null) {
      lanScan();
      getIpAddressesForHostname(ip).then(ipAddresses =>
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
        padding: 10,
        borderWidth: 1,
        borderColor: '#b8c553ff',
        borderRadius: 10,
      }}>
      <Text style={{ fontSize: 20, padding: 10, color: '#909109' }}>
        Connected IP Address
      </Text>

      <View style={{ flex: 1, padding: 15 }}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 16, color: 'black' }}>No.</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>IP Address</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>Open Ports</Text>
        </View>
        {available == '' && scan == false ? (
          <Text style={{ color: 'green', fontSize: 20, padding: 30 }}>
            No Data Found ...
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={available}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#34bbd3a6',
                    marginHorizontal: 10,
                  }}>
                  {index + 1}.
                </Text>
                <Text style={{ fontSize: 15, color: '#d36318' }}>{item}</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('Ip_Port_Scan', { IP: [item] })
                  }>
                  <Text style={{ fontSize: 16, color: 'green' }}>
                    Scan Port
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      {scan ? (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: 'red',
            }}>
            Scanning....
          </Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={lanScan}
            style={{
              // marginHorizontal: 60,
              padding: 10,
              width: '45%',
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
          <TouchableOpacity
            style={{
              // marginHorizontal: 60,
              width: '45%',
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#74e470ad',
            }}
            onPress={() =>
              navigation.navigate('Ip_Port_Scan', {
                IP: available.length == 1 ? [available] : available,
              })
            }>
            <Text
              style={{ fontSize: 16, fontWeight: '600', color: '#bb9b1bff' }}>
              All Port Scan
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
