import  React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';


//import Screen of All Expences for rendering.
import Insights from '../components/Insights';

import CategoryInsights from '../components/CategoryInsight';


class InsightsNavigator extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }

    this.InsightsData = this.InsightsData.bind(this)
  }

  InsightsData=({navigation})=>{
    return(
      <Insights reRender={()=>this.props.reRender()} expences={this.props.data} income={this.props.income} setIncome={(i,newExpence)=>this.props.setIncome(i, newExpence)} onPress={(el,total,income,sav)=>navigation.navigate("Category",{CategoryFilterData:el,expence:total,income:income,saving:sav})}/>
    );
  }

  

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
