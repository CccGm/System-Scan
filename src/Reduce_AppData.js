import React from 'react';
import {Text, View} from 'react-native';

export const Reduce_AppData = props => {
  const DATA = props.item;

  return (
    <View style={{margin: 10, padding: 5, borderWidth: 1, borderRadius: 3}}>
      <Text>{DATA.index}</Text>
      <Text>{DATA.item.label}</Text>
      <Text>{DATA.item.packageName}</Text>
    </View>
  );
};
