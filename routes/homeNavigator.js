import * as React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//importing homescreen comp and rendering instead of directly rendering tabs
import HomeScreen from '../components/HomeScreen';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';

const Stack = createStackNavigator();

export default class HomeNavigator extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      refresh:false
    }
    this.HomeScreenWithProps = this.HomeScreenWithProps.bind(this)

  }

  HomeScreenWithProps=()=>{
    return(

    <HomeScreen reRender={()=>this.props.reRender()} add={(newExpence)=>this.props.add(newExpence)} remove={(expence)=>this.props.remove(expence)} Expences={this.props.data} income={this.props.income} setIncome={(i,newExpence)=>this.props.setIncome(i, newExpence)} />

    );

  }

  render(){
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
                            marginLeft:15
                        }}
                          onPress={()=>navigation.toggleDrawer()}
                          />
          ),

        headerRight:()=>(
                        <Icon name='calendar-search' size={36} color='#fff'
                        containerStyle={{marginLeft:5}}
                        style={{
                            marginTop:3,
                            marginRight:20
                      }}
                        onPress={()=>navigation.navigate('Insights')}
                        />
        ),

        headerTitle:"Expence Tracker"
      
      })
        
      }
      

        component={this.HomeScreenWithProps} />

        
      </Stack.Navigator>
   
  );
    }
}

 