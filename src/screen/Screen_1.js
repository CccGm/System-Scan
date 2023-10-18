import React, {useEffect} from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

export const Screen_1 = () => {
  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted');
    } else {
      console.log('Note give permission');
    }
  };

  WifiManager.getIP().then(
    abc => {
      console.log('Connected successfully!', abc);
    },
    () => {
      console.log('Connection failed!');
    },
  );

  WifiManager.getCurrentWifiSSID().then(
    ssid => {
      console.log('Your current connected wifi SSID is ' + ssid);
    },
    () => {
      console.log('Cannot get current SSID!');
    },
  );

  return (
    <View style={{flex: 1, margin: 10, borderWidth: 1}}>
      <Text>Hiii Screnn_1</Text>
    </View>
  );
};
