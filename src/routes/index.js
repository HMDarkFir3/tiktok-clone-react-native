//React
import React from 'react';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import HomeBottomTabNavigator from './homeBottomTabNavigator';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeBottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
