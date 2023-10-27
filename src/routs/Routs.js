import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screen_1} from '../screen/Screen_1';
import {Screen_2} from '../screen/Screen_2';
import {Screen_3} from '../screen/Screen_3';
import {Screen_4} from '../screen/Screen_4';
import {Platform} from 'react-native';
import Screen_5 from '../screen/Screen_5';

export const Routs = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function Home() {
    return (
      <Tab.Navigator
        initialRouteName="Screen_5"
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Screen_1" component={Screen_1} />
        <Tab.Screen name="Screen_2" component={Screen_2} />
        <Tab.Screen name="Screen_3" component={Screen_3} />
        {Platform.OS == 'ios' ? null : (
          <Tab.Screen name="Screen_4" component={Screen_4} />
        )}
        <Tab.Screen name="Screen_5" component={Screen_5} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
