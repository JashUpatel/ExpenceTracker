import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Foundation';
// import Icon from 'react-native-vector-icons/MaterialIcons';


// import tab navigation
import TabNavigator from './tabNavigator';

//importing homescreen comp and rendering instead od directly rendering tabs
import HomeScreen from '../components/HomeScreen';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';
import AddExpence from '../components/AddExpence';


// function HomeScreen() {
//   return (
//       <TabNavigator/>
   
//   );
// }

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={NavigatorProps}

      >
        <Stack.Screen name="Home" 
        options={
        ({navigation})=>({
          headerLeft: ()=>(
                        <Icon name='menu' size={40} color='#fff'
                          containerStyle={{marginLeft:5}}
                          style={{
                            // position:'absolute',
                            // top:19,
                            // left:16,
                            marginLeft:15
                        }}
                          onPress={()=>navigation.toggleDrawer()}
                          />
          ),

        headerRight:()=>(
                        <Icon name='calendar-search' size={36} color='#fff'
                        containerStyle={{marginLeft:5}}
                        style={{
                            // position:'absolute',
                            // top:19,
                            // left:16,
                            marginTop:3,
                            marginRight:20
                      }}
                        onPress={()=>navigation.navigate('AddExpence')}
                        />
        ),

        headerTitle:"Expence Tracker"
      
      })
        
      }
      

        component={HomeScreen} />

        
      </Stack.Navigator>
   
  );
}

 