import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';
import AboutUs from '../components/AboutUs';
function AboutScreen() {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>About Screen</Text>
    // </View>

    <AboutUs />
  );
}



const Stack = createStackNavigator();

export default function aboutNavigator() {
  return (
      <Stack.Navigator  screenOptions={NavigatorProps} >
        {/* <Stack.Screen name="Tab" component={TabNavigator} /> */}
      
        <Stack.Screen name="About Us" component={AboutScreen} 
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              )
            })
            
          } 
    
        />
      </Stack.Navigator>
   
  );
}

 