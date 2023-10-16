/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Routs} from './src/routs/Routs';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Routs />
    </SafeAreaView>
  );
}

export default App;
