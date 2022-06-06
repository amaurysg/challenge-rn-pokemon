import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from './src/navigation/Navigator';
import { Tabs } from './src/navigation/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
};
export default App;
