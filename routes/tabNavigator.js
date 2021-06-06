import * as React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// import tab screens

import Expences from '../components/Expences';
import Payables from'../components/Payables';
import Receivables from '../components/Recievables';


  
const Tab = createBottomTabNavigator();


export default class TabNavigator extends React.Component{

  render(){
    var data = this.props.data;
    var income = this.props.income;
    var remove = this.props.remove;
    
    var add = this.props.add;
    var setIncome = this.props.setIncome;
    var reRender = this.props.reRender;


    function Tab1() {
      return (
  
        <Expences reRender={()=>reRender()} add={(newExpence)=>add(newExpence)} remove={(expence)=>remove(expence)} expences={data} income={income} setIncome={(i,newExpence)=>setIncome(i, newExpence)} />
  
      );
    }
    
     function Tab2() {

      return (
  
        <Payables reRender={()=>reRender()} add={(newExpence)=>add(newExpence)} remove={(expence)=>remove(expence)} payables={data}/>
  
      );
    }
    
     function Tab3() {
 
      return (
  
        <Receivables reRender={()=>reRender()} add={(newExpence)=>add(newExpence)} remove={(expence)=>remove(expence)} receivables={data} />
  
      );
    }
    
  


  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Expences') {
              iconName = focused
                ? 'ios-swap-vertical'
                : 'ios-swap-vertical-outline';
            } else if (route.name === 'Payables') {
              iconName = focused ? 'ios-share' : 'ios-share-outline';
            }
            else if (route.name === 'Receivables') {
              iconName = focused ? 'md-download' : 'md-download-outline';
            }
            else{
              iconName = focused ? 'md-download' : 'md-download-outline';

            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={35} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1cc29f',
          inactiveTintColor: 'gray',
          swipeEnabled:'True',
          labelStyle:{
            fontFamily: 'sans-serif',
            marginBottom: 8,
            fontSize:13.5
          },
          iconStyle:{
            marginBottom:-2,
            marginTop:2.5,
          },
          
          style:{
            height:75,
          }
        }}
      >
        <Tab.Screen name="Expences" component={Tab1} />
        <Tab.Screen name="Payables" component={Tab2} />
        <Tab.Screen name="Receivables" component={Tab3} />

      </Tab.Navigator>
  );
}
}