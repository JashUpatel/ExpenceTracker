import  React, {Component} from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';


//import Screen of All Expences for rendering.
import AllExpences from '../components/AllExpences';



class AllExpencesNavigator extends Component{
  constructor(props){
    super(props);
    this.state={
    }

    this.AllExpenceData = this.AllExpenceData.bind(this)
  }

  AllExpenceData=()=>{
    return(
      <AllExpences storeExpence={(data)=>this.props.storeExpence(data)} reRender={()=>this.props.reRender()} add={(newExpence)=>this.props.add(newExpence)}  expences={this.props.data} remove={(expence)=>this.props.remove(expence)}/>
    );
  }
  render(){
      const Stack = createStackNavigator();
      

    return(

      <Stack.Navigator  screenOptions={NavigatorProps}> 
        <Stack.Screen name="AllExpences" component={this.AllExpenceData}
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              ),
            headerTitle:"All Expences"

            })
            
          } 
          
         />
         
      </Stack.Navigator>
    );
  }
}

export default AllExpencesNavigator;
 