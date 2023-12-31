import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import {Reduce_AppData} from '../common/Reduce_AppData';

export const Installed_Apps = () => {
  const [result, setResult] = useState(null);
  const [b, setb] = useState(null);

  useEffect(() => {
    setResult(InstalledApps.getSortedApps());
    console.log(JSON.stringify(result, '', 2));
    Battery();
  }, []);

  const Battery = async () => {
    const result = await RNLauncherKitHelper.getBatteryStatus();
    console.log(result, 'battery');
    setb(result);
  };

  return (
    <View
      style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#e0e0e050'}}>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          marginBottom: 10,
          marginLeft: 15,
          color: '#909109',
        }}>
        Installed Apps
      </Text>
      {result !== null ? (
        <FlatList
          data={result}
          renderItem={item => <Reduce_AppData item={item} />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={60} />
        </View>
      )}
    </View>
  );
};
