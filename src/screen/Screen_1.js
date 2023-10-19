import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import Ping from 'react-native-ping';
import {NetworkInfo} from 'react-native-network-info';

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
        LIST.push(i);
      } catch (error) {
        // console.log('special code', error.code, error.message, 'no is:-', i);
      }
    }
    console.log(JSON.stringify(LIST));
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
    }
  }, [ip]);

  return (
    <View style={{flex: 1, margin: 10, borderWidth: 1}}>
      <Text>Hiii Screnn_1</Text>
      {available == null ? (
        <Text>Scanning ...</Text>
      ) : (
        <View>
          <Text style={{fontSize: 20}}>
            Available Devices : - {JSON.stringify(available)}
          </Text>
          <Button title="Rescan" onPress={lanScan()} />
        </View>
      )}
    </View>
  );
};
