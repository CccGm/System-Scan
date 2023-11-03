import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const Screen_6 = () => {
  const [wifiList, setWifiList] = useState([]);
  const [connectedSSID, setConnectedSSID] = useState(null);

  useEffect(() => {
    const check = async () => {
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
        // You can now use react-native-wifi-reborn loadWifiList();
        getCurrentWifiSSID();
        loadWifiList();
      } else {
        check();
      }
    };
    check();
  }, []);

  const loadWifiList = async () => {
    try {
      const wifiArray = await WifiManager.loadWifiList();
      setWifiList(wifiArray);
      console.log('Available Wi-Fi networks:', wifiArray);
    } catch (error) {
      console.error('Error loading Wi-Fi list:', error);
    }
  };

  const getCurrentWifiSSID = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      setConnectedSSID(ssid);
      console.log('Connected Wi-Fi network SSID:', ssid);
    } catch (error) {
      console.error('Error getting connected Wi-Fi network:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Connected Wi-Fi SSID: {connectedSSID}</Text>
      <Text>Available Wi-Fi Networks:</Text>
      {wifiList.map((wifi, index) => (
        <Text key={index}>{wifi.SSID}</Text>
      ))}
    </View>
  );
};

export default Screen_6;
