// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import drawer navigation

import DrawerNavigator from '../routes/drawerNavigator';
import TabNavigator from '../routes/tabNavigator';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    {/* <TabNavigator /> */}

    </NavigationContainer>
  );
}

export default Main;