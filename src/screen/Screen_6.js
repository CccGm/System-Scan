import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const Screen_6 = () => {
  const [wifiList, setWifiList] = useState([]);
  const [connectedSSID, setConnectedSSID] = useState(null);
  const [savedWifiList, setSavedWifiList] = useState([]);

  useEffect(() => {
    const loadSavedWifiList = async () => {
      //   try {
      //     const savedNetworks = await WifiManager.loadSavedWifiList();
      //     setSavedWifiList(savedNetworks);
      //     console.log('Saved Wi-Fi networks:', savedNetworks);
      //   } catch (error) {
      //     console.error('Error loading saved Wi-Fi networks:', error);
      //   }
      const connection = await WifiManager.connectionStatus();
      console.log(connection, 'connect');
    };

    loadSavedWifiList();
  }, []);

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
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        padding: 15,
        margin: 10,
        borderRadius: 10,
      }}>
      <Text>Connected Wi-Fi SSID: {connectedSSID}</Text>
      <Text>Available Wi-Fi Networks:</Text>
      {wifiList.map((wifi, index) => (
        <Text key={index}>{wifi.SSID}</Text>
      ))}
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text>Saved Wi-Fi Networks:</Text>
        {savedWifiList.map((wifi, index) => (
          <Text key={index}>{wifi.SSID}</Text>
        ))}
      </View>
    </View>
  );
};

export default Screen_6;
