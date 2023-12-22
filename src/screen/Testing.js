import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from './axiosIntersepter';

const Testing = () => {
  useEffect(() => {
    // Create a UDP socket
    axios
      .get('https://ipinfo.io/192.168.5.100/json')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <View>
      <Text>hiii</Text>
    </View>
  );
};

export default Testing;
