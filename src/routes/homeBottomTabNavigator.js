//React
import React from 'react';
import {Image, Text} from 'react-native';

//Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screen
import Home from '../screens/Home';

//Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#000000',
        },
        activeTintColor: '#ffffff',
      }}>
      {/*------------------------------*/}
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name={'home'} color={color} size={25} />
          ),
        }}
      />
      {/*------------------------------*/}
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name={'search1'} color={color} size={25} />
          ),
        }}
        name={'Search'}
        component={() => <Text>Search</Text>}
      />
      {/*------------------------------*/}
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={{height: 30, resizeMode: 'contain'}}
              source={require('../assets/images/plus-icon.png')}
            />
          ),
          tabBarLabel: () => null,
        }}
        name={'Upload'}
        component={() => <Text>Upload</Text>}
      />
      {/*------------------------------*/}
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name={'message-minus-outline'}
              color={color}
              size={25}
            />
          ),
        }}
        name={'Inbox'}
        component={() => <Text>Inbox</Text>}
      />
      {/*------------------------------*/}
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={'ios-person-outline'} color={color} size={25} />
          ),
        }}
        name={'Profile'}
        component={() => <Text>Profile</Text>}
      />
      {/*------------------------------*/}
    </Tab.Navigator>
  );
}
