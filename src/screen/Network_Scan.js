import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Network_Scan = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate('Scan_IP_Connected')}>
        <Text style={styles.text}>Connected Devices</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate('Screen_5')}>
        <Text style={styles.text}>Network Logger</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Network_Scan;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 3,
    borderWidth: 1,
    padding: 20,
    flex: 1,
    borderRadius: 20,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#50869850',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  text: {
    color: '#08698099',
    fontSize: 18,
    margin: 3,
  },
});
