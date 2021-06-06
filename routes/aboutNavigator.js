import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';
import AboutUs from '../components/AboutUs';
function AboutScreen() {
  return (

    <AboutUs />
  );
}



const Stack = createStackNavigator();

export default function aboutNavigator() {
  return (
      <Stack.Navigator  screenOptions={NavigatorProps} >
      
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

 