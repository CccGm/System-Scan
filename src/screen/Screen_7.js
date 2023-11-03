import React, { useEffect, useState } from 'react';
import { LogBox, Text, TouchableOpacity, View } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import Port from '../common/Port';

const Screen_7 = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  const targetIPs = [
    '192.168.5.1',
    '192.168.5.100',
    '192.168.5.102',
    '192.168.5.103',
    '192.168.5.104',
    '192.168.5.105',
    '192.168.5.117',
    '192.168.5.118',
    '192.168.5.119',
    '192.168.5.121',
    '192.168.5.124',
    '192.168.5.125',
  ];
  const targetPorts = Port;
  const [open, setOpen] = useState([]);

  const checkPortsOnIPs = () => {
    setOpen([]);
    targetIPs.forEach(ip => {
      targetPorts.forEach(port => {
        checkPortStatus(ip, port);
      });
    });
    console.log('DONE');
  };

  const checkPortStatus = (ip, port) => {
    const client = TcpSocket.createConnection({
      host: ip,
      port: port,
    });

    client.on('connect', () => {
      console.error(`Port ${port} is open on ${ip}`);
      setOpen(old => [...old, { ip_: ip, port_: port }]);
      client.destroy(); // Close the socket connection
    });

    client.on('error', error => {
      console.log(`Port ${port} is closed on ${ip}`);
      client.destroy(); // Close the socket connection
    });
  };

  useEffect(() => {
    checkPortsOnIPs();
  }, []);

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={{ fontSize: 20, padding: 10, color: '#909109' }}>
          Available port
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
            backgroundColor: '#94e5ebc0',
            borderRadius: 10,
            margin: 5,
          }}
          onPress={checkPortsOnIPs}>
          <Text style={{ color: 'green', fontSize: 14, fontWeight: '500' }}>
            Re Scan
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 16, color: 'black' }}>No.</Text>
        <Text style={{ fontSize: 16, color: 'black' }}>IP Address</Text>
        <Text style={{ fontSize: 16, color: 'black' }}>Open Port</Text>
      </View>
      {open.map((data, key) => {
        return (
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              marginHorizontal: 15,
              justifyContent: 'space-between',
              paddingRight: 20,
            }}
            key={key}>
            <Text
              style={{
                fontSize: 15,
                color: '#34bbd3a6',
              }}>
              {key + 1}.
            </Text>

            <Text style={{ fontSize: 15, color: '#d36318' }}>{data.ip_}</Text>
            <Text style={{ fontSize: 15, color: '#d36318' }}>{data.port_}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Screen_7;
