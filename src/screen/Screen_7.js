import React, { useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import TcpSocket from 'react-native-tcp-socket';
import Port from '../common/Port';

const Screen_7 = () => {
  //   LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  //   LogBox.ignoreAllLogs();
  const targetIPs = ['192.168.5.1', '192.168.5.102'];
  const targetPorts = Port;

  const [open, setOpen] = useState([]);

  const checkPortsOnIPs = () => {
    targetIPs.forEach(ip => {
      targetPorts.forEach(port => {
        checkPortStatus(ip, port);
      });
    });
  };

  const checkPortStatus = (ip, port) => {
    const client = TcpSocket.createConnection({
      host: ip,
      port: port,
    });

    client.on('connect', () => {
      console.error(`Port ${port} is open on ${ip}`);
      //   setOpen({ ip_: ip, port_: port });
      {
        open == ''
          ? setOpen({ ip_: ip, port_: port + '_1' })
          : setOpen(...open, { ip_: ip, port_: port });
      }

      client.destroy(); // Close the socket connection
    });

    client.on('error', error => {
      //   console.log(`Port ${port} is closed on ${ip}`);
      client.destroy(); // Close the socket connection
    });
  };

  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      checkPortsOnIPs();
    } else {
      console.log('Device is not connected to the internet.');
    }
  });

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#b3e629ff',
        borderRadius: 10,
      }}>
      <Text>Available port </Text>
      <Text style={{ fontSize: 16 }}>{JSON.stringify(open, null, 2)}</Text>
    </View>
  );
};

export default Screen_7;
