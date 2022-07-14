import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigator from './Tab1';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tab2Screen} from './Tab2';
import Tab1 from './Tab1';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      initialRouteName={'SearchScreen'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D5',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.82)',
          paddingBottom: Platform.OS === 'ios' ? 15 : 15,
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 70 : 80,
          //Now is disable, but is available to use
          display:'none'
        },
      }}>
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={Tab1}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => <Icon name="list" color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
