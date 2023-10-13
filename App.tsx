/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Screen_1} from './src/Screen_1';
import {Screen_2} from './src/Screen_2';
import {Screen_3} from './src/Screen_3';
import {Screen_4} from './src/Screen_4';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}}>
        <Screen_1 />
        <Screen_2 />
        <Screen_3 />
        <Screen_4 />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
