import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import WiFiManager from 'react-native-wifi-reborn';

class WiFiScanner extends Component {
  constructor() {
    super();
    this.state = {
      wifiList: [],
    };
  }

  componentDidMount() {
    this.scanWifi();
  }

  async scanWifi() {
    try {
      const wifiList = await WiFiManager.loadWifiList();
      this.setState({wifiList});
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View>
        <Text>Available Wi-Fi Networks:</Text>
        {this.state.wifiList.map((wifi, index) => (
          <Text key={index}>{wifi.SSID}</Text>
        ))}
      </View>
    );
  }
}

export default WiFiScanner;
