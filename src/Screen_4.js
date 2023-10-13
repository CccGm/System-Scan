import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
import {Reduce_AppData} from './Reduce_AppData';

export const Screen_4 = () => {
  const result = InstalledApps.getApps();

  return (
    <View style={{flex: 1}}>
      <Text>Installed Apps:</Text>
      <FlatList
        data={result}
        renderItem={item => <Reduce_AppData item={item} />}
      />
    </View>
  );
};
