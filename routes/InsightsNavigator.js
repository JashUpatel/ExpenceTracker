// import * as React from 'react';
// import { View, Text } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
// import { Icon } from 'react-native-elements';

// // import common props for navigator
// import NavigatorProps from '../assets/props/navigatorProps';


// //import Screen of Add Expences for rendering.
// import Insights from '../components/Insights';


// const Stack = createStackNavigator();

// export default function InsightsNavigator() {
//   return (
//       <Stack.Navigator  screenOptions={NavigatorProps}> 
//         <Stack.Screen name="Insights" component={Insights}
//           options={
//             ({navigation})=>({headerLeft: ()=>(
//                             <Icon name='menu' size={32} color='#fff'
//                               containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
//                               onPress={()=>navigation.toggleDrawer()}
//                               />
//               ),
//             headerTitle:"Monthly Insights"

//             })
            
//           } 
          
//          />

//       </Stack.Navigator>
   
//   );
// }

 



import  React, {Component} from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';


//import Screen of All Expences for rendering.
import Insights from '../components/Insights';
import AddExpence from '../components/AddExpence';

import CategoryInsights from '../components/CategoryInsight';
//import data 
// import { DATA } from '../components/data';


// function AllExpencesScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>AllExpences Screen</Text>
//     </View>
//   );
// }



// const Stack = createStackNavigator();


class InsightsNavigator extends Component{
  constructor(props){
    super(props);
    this.state={
      // data:DATA,
      // data:[
      //       {
      //           date:"07/03/2021",
      //           // date:"03/07/2021",
      //           amount:'100',
      //           desc:'Lunch',
      //           paidBy:"You",
      //           splitWith:"None",
      //           share:"N/A",
      //           status:"Paid"
      //       },
      //       {
      //           date:"21/03/2021",
      //           // date:"03/21/2021",
      //           amount:'100',
      //           desc:'Lunch',
      //           paidBy:"You",
      //           splitWith:"None",
      //           share:"N/A",
      //           status:"Paid"
      //       },
      //       {
      //           date:"21/03/2021",
      //           //  date:"03/21/2021",
      //           amount:'100',
      //           desc:'Lunch',
      //           paidBy:"You",
      //           splitWith:"None",
      //           share:"N/A",
      //           status:"Paid"
      //       },
      //       {
      //           date:"08/03/2021",
      //           amount:'150',
      //           desc:'BF',
      //           paidBy:"Jash",
      //           splitWith:"None",
      //           share:"N/A",
      //           status:"Unpaid"

      //       },
      //       {
      //           date:"03/03/2021",
      //           amount:'500',
      //           desc:'Diner',
      //           paidBy:"You",
      //           splitWith:"JK",
      //           share:"N/A",
      //           status:"Unpaid"

      //       },
      //       {
      //           date:"05/03/2021",
      //           // date:"03/05/2021", 
      //           amount:'50',
      //           desc:'Snacks',
      //           paidBy:"You",
      //           splitWith:"None",
      //           share:"N/A",
      //           status:"Paid"

      //       },
      //   ]
    }

    this.InsightsData = this.InsightsData.bind(this)
  }

  InsightsData=({navigation})=>{
    return(
      <Insights  expences={this.props.data} income={this.props.income} onPress={(el,total,income,sav)=>navigation.navigate("Category",{CategoryFilterData:el,expence:total,income:income,saving:sav})}/>
    );
  }

  // CategoryInsightsData=()=>{
  //   return(
  //     <Insights  expences={this.props.data} />

  //   );
  // }
  render(){
      const Stack = createStackNavigator();
      

    return(
      <Stack.Navigator  screenOptions={NavigatorProps} > 
        <Stack.Screen name="Insights" component={this.InsightsData}
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              ),
            headerTitle:"Monthly Insights"

            })
            
          } 
          
         />
         <Stack.Screen name='Category' component={CategoryInsights}
    options={{ headerTitle: "Category List", headerTintColor:'#fff'}}
     />
         
      </Stack.Navigator>
    );
  }
}

export default InsightsNavigator;


// export default function AllExpencesNavigator() {
//   return (
//       <Stack.Navigator  screenOptions={NavigatorProps}> 
//         <Stack.Screen name="AllExpences" component={AllExpenceData}
//           options={
//             ({navigation})=>({headerLeft: ()=>(
//                             <Icon name='menu' size={32} color='#fff'
//                               containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
//                               onPress={()=>navigation.toggleDrawer()}
//                               />
//               ),
//             headerTitle:"All Expences"

//             })
            
//           } 
          
//          />
         
//       </Stack.Navigator>
   
//   );
// }

 