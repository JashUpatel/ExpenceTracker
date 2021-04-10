import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';


//import Screen of Add Expences for rendering.
import AddExpence from '../components/AddExpence';


const Stack = createStackNavigator();

export default function AddExpenceNavigator() {
  return (
      <Stack.Navigator  screenOptions={NavigatorProps}> 
        <Stack.Screen name="AddExpence" component={AddExpence}
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              ),
            headerTitle:"Add Expences"

            })
            
          } 
          
         />

      </Stack.Navigator>
   
  );
}

 