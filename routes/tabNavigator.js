import * as React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import stack screens

import HomeNavigator from './homeNavigator';
import ContactNavigator from './contactNavigator';
import AboutNavigator from './aboutNavigator';
import ExpenceNavigator from './expencesNavigator';

// import tab screens

import Expences from '../components/Expences';
import Payables from'../components/Payables';
import Receivables from '../components/Recievables';
import AddExpence from '../components/AddExpence';

function LiSt({data}){
  return(
  // const Expences = this.props.data;
  //   Expences.map(expence=>(
  //     <View style={{backgroundColor:'Green',flex:1,zIndex:1}}>
      <Text style={{fontSize:15,fontWeight:'bold'}}>{data}</Text>
  //     </View>
  //     )
  // )
  )
}

  
const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//       <Tab.Navigator>
//         <Tab.Screen name="Tab1" component={Tab1} />
//         <Tab.Screen name="Tab2" component={Tab2} />
//         <Tab.Screen name="Tab3" component={Tab3} />
//       </Tab.Navigator>
   
//   );
// }


// export default class TabNavigator extends React.Component{
//   // var exp = this.props.data;
//   // exp.map(expence=>(
//   //       <View style={{backgroundColor:'Green',flex:1,zIndex:1}}>
//   //       <Text style={{fontSize:15,fontWeight:'bold'}}>{expence.desc}</Text>
//   //       </View>
     
//   // ))

//   render(){
//     const data = this.props.data;
//     // data.map(expence=>(
//     //         <View style={{backgroundColor:'Green',flex:1,zIndex:1}}>
//     //         <Text style={{fontSize:15,fontWeight:'bold'}}>{expence.desc}</Text>
//     //         </View>
         
//     //   ))
    
//     return(
//       <LiSt data={data}/>
//   // <Text>{this.props.data}</Text>

//     )
//   }
// }


export default class TabNavigator extends React.Component{

  render(){
    const data = this.props.data;
    // const addExpence = this.props.addExpence;
    

  // var expences=this.props.expences;
  // var payables=this.props.payables;
  // var receivables=this.props.receivables;

    function Tab1() {
    //   var expences=[];
    //   data.forEach(element => {
    //     if(element.paidBy=="You" && element.splitWith=="None" && element.status=="Paid"){
    //       expences.push(element);
    //     }
    //   });
 
      return (
  
        // <LiSt/>
        <Expences expences={data} />
        // <ExpenceNavigator/>
        // <AddExpence/>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>{data}</Text>
        //  </View>
        // <TabNavigator />
  
      );
    }
    
     function Tab2() {

      // var payables=[];
      // data.forEach(element => {
      //   if(element.paidBy!="You" && element.status=="Unpaid"){
      //     payables.push(element);
      //   }
      // });
 
      return (
  
        <Payables payables={data}/>
  
  
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>Tb2</Text>
        //  </View>
        // <TabNavigator />
      );
    }
    
     function Tab3() {

      // var receivables=[];
      // data.forEach(element => {
      //   if(element.paidBy=="You" && element.splitWith!="None" && element.status=="Unpaid"){
      //     receivables.push(element);
      //   }
      // });
 

      return (
  
        <Receivables receivables={data} />
  
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>Tab3</Text>
        //  </View>
        // <TabNavigator />
      );
    }
    
    function  Tab4(){
      return (
  
        <AddExpence />
  
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>Tab3</Text>
        //  </View>
        // <TabNavigator />
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
            // fontWeight:'bold',
            fontFamily: 'sans-serif',// 'tahoma', verdana, arial, sans-serif;
            marginBottom: 8,
            fontSize:13.5
          },
          iconStyle:{
            marginBottom:-2,
            marginTop:2.5,
          },
          // allowFontScaling:"true",
          style:{
            height:75,
          }
        }}
      >
        <Tab.Screen name="Expences" component={Tab1} />
        <Tab.Screen name="Payables" component={Tab2} />
        <Tab.Screen name="Receivables" component={Tab3} />
        {/* <Tab.Screen name="Add" component={Tab4} /> */}

      </Tab.Navigator>
  );
}
}