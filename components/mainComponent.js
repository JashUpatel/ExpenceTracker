// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import drawer navigation

import DrawerNavigator from '../routes/drawerNavigator';


const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
        
      <DrawerNavigator />

    </NavigationContainer>
  );
}

export default Main;