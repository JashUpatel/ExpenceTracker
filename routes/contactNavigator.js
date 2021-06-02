import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';
import Contact from '../components/Contact';


function ContactScreen() {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Contact Screen</Text>
    // </View>
    <Contact />
  );
}

const Stack = createStackNavigator();

export default function contactNavigator() {
  return (
      <Stack.Navigator  screenOptions={NavigatorProps}> 
        <Stack.Screen name="Get in Touch" component={ContactScreen}
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              )
            }
            )
            
          } 
          
         />
      </Stack.Navigator>
   
  );
}

 