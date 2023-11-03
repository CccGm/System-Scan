import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen_1 } from '../screen/Screen_1';
import { Screen_2 } from '../screen/Screen_2';
import { Screen_3 } from '../screen/Screen_3';
import { Screen_4 } from '../screen/Screen_4';
import { Platform } from 'react-native';
import Screen_5 from '../screen/Screen_5';
import Screen_6 from '../screen/Screen_6';
import Screen_7 from '../screen/Screen_7';

export const Routs = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function Home() {
    return (
      <Tab.Navigator
        initialRouteName="Screen_3"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Connected Devices" component={Screen_1} />
        <Tab.Screen name="Device Info" component={Screen_2} />
        <Tab.Screen name="Scan ports" component={Screen_3} />
        {Platform.OS == 'ios' ? null : (
          <Tab.Screen name="Installed Apps" component={Screen_4} />
        )}
        <Tab.Screen name="Network Logger" component={Screen_5} />
        {/* <Tab.Screen name="Screen_6" component={Screen_6} /> */}
        <Tab.Screen name="Ip Open Ports" component={Screen_7} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
