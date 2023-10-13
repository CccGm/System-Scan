import React, {useState} from 'react';
import {Platform, Text, View} from 'react-native';

export const Screen_1 = () => {
  const [Device, setDevice] = useState(Platform.OS);
  const [Version, setVersion] = useState(Platform.Version);

  return (
    <View style={{margin: 20, backgroundColorL: '#986985'}}>
      <Text style={{fontSize: 20}}>Screen 1</Text>
      <Text style={{fontSize: 20}}>Your Device is :- {Device}</Text>
      <Text style={{fontSize: 20}}>Your Device version is :- {Version}</Text>
    </View>
  );
};
