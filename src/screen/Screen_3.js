import React from 'react';
import {DeviceEventEmitter, Text, View} from 'react-native';
import FindLocalDevices from 'react-native-find-local-devices';

export const Screen_3 = () => {
  FindLocalDevices.getLocalDevices({
    ports: [70],
    timeout: 10,
  });

  DeviceEventEmitter.addListener('NEW_DEVICE_FOUND', device => {
    console.log(`NEW DEVICE FOUND: ${device.ipAddress}:${device.port} 100`);
    // This listener will be activated at the moment when the device has been found.
    // FORMAT: {ipAddress: "192.168.1.66", port: 70}
  });

  DeviceEventEmitter.addListener('RESULTS', devices => {
    console.log(`NEW DEVICE FOUND: ${devices} 200`);
    // ALL OF RESULTS when discovering has been finished.
    // FORMAT: [{ipAddress: "192.168.1.66", port: 70}, {ipAddress: "192.168.1.69", port: 85}]
  });

  DeviceEventEmitter.addListener('CHECK', device => {
    console.log(`NEW DEVICE FOUND: ${device.ipAddress}:${device.port}`);
    // console.log(JSON.stringify(device));

    // This listener will be activated in that moment when package checking a device.
    // FORMAT: {ipAddress: "192.168.1.65", port: 70}
  });

  DeviceEventEmitter.addListener('NO_DEVICES', () => {
    console.log(`NEW DEVICE FOUND: 300`);
    // This listener will be activated at the end of discovering.
  });

  DeviceEventEmitter.addListener('NO_PORTS', () => {
    console.log(`NEW DEVICE FOUND: 400`);
    // This listener will be activated if you don't pass any ports to the package.
  });

  DeviceEventEmitter.addListener('CONNECTION_ERROR', error => {
    // console.log(`NEW DEVICE FOUND: ${JSON.stringify(error)} 500`);
    // Handle error messages for each socket connection
    // console.log(error.message);
  });

  return (
    <View style={{flex: 1}}>
      <Text>Hiii</Text>
    </View>
  );
};
