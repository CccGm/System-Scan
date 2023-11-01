import React, { useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import TcpSocket from 'react-native-tcp';
import Port from '../common/Port';

const Screen_6 = () => {
  // Define a list of IP addresses and ports to check
  const targetIPs = ['192.168.5.1', '192.168.5.102', '192.168.5.103'];
  const targetPorts = Port;
  const [open, setOpen] = useState(null);

  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  // Create a function to check the status of multiple IP addresses and ports
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
      setOpen(`Port ${port} is open on ${ip}`);
      client.end(); // Close the socket connection
    });

    client.on('error', error => {
      //   console.log(`Port ${port} is closed on ${ip}`);
      client.destroy(); // Close the socket connection
    });
  };

  // Use NetInfo to check the network status before checking ports
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      checkPortsOnIPs();
    } else {
      console.log('Device is not connected to the internet.');
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <Text>hiii</Text>
      <Text>{open}</Text>
    </View>
  );
};

export default Screen_6;
