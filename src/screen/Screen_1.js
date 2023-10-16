import React, {useState} from 'react';
import {Platform, Text, View} from 'react-native';

export const Screen_1 = () => {
  const [Device, setDevice] = useState(Platform.OS);
  const [Version, setVersion] = useState(Platform.Version);

  return (
    <View style={{flex: 1, borderWidth: 1, margin: 10, padding: 10}}>
      <Text style={{fontSize: 20}}>Your Device is :- {Device}</Text>
      <Text style={{fontSize: 20}}>Your Device version is :- {Version}</Text>
    </View>
  );
};
