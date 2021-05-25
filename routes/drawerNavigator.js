import  React,{Component} from 'react';
import { Button, View, Image, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';

// import { NavigationContainer } from '@react-navigation/native';

// import Stack navigation screen
import HomeNavigator from './homeNavigator';
import ContactNavigator from './contactNavigator';
import AboutNavigator from './aboutNavigator';
import AllExpencesNavigator from './AllExpencesNavigator';
import { HeaderTitle } from '@react-navigation/stack';
import AddExpence from '../components/AddExpence';
import Insights from '../components/Insights';
import AddExpenceNavigator from './addExpenceNavigator';
import InsightsNavigator from './InsightsNavigator';
//import data centralizing at one point  
import { DATA } from '../components/data';

const Drawer = createDrawerNavigator();

const CustomDrawer=(props)=>(
    <ScrollView style={styles.drawerContainer}>
        <View style={{flex:1,justifyContent:"space-between"}}>
        {/* <View style={{flex:1,justifyContent:"space-between", backgroundColor:"#fff", marginTop:25}}> */}
       
            <View style={styles.drawerHeader}>
            <View style={{flex:1}}>
            <Image source={require('../assets/icon.png')}
            style={styles.drawerIcon}
            />
            </View>
            <View style={{flex:2}}>
                <Text style={styles.drawerText}>Expence Tracker</Text>
            </View>

        </View>
        <DrawerItemList  {...props} />
        <View style={{justifyContent:'center', alignItems:'center', marginTop:475}}>

                <View>
                <Text style={{fontSize:16,fontWeight:'bold',marginTop:-235,marginLeft:-50}}>Made With </Text>


                </View>
                <Text style={{justifyContent:'center', textAlign:'center',alignItems:'center',fontFamily:'monospace',marginTop:-185,marginLeft:-15}}>v ~3.7.5</Text>

        </View>



    </View>

    </ScrollView>

);


export default class DrawerNavigator extends Component{
    constructor(props){
        super(props);
        this.state={
            data:DATA,
            refresh:false,
            forceRefresh:false,
            income:[
                {
                    month:"05/2021",
                    income:"1000"
                },
                {
                    month:"04/2021",
                    income:"500"
                }

            ]
        }
    this.homeNavigatorWithProps = this.homeNavigatorWithProps.bind(this)
    this.allExpencesWithProps = this.allExpencesWithProps.bind(this)
    this.remove = this.remove.bind(this);  

    this.addFunc = this.addFunc.bind(this);
    }
    componentDidMount(){
        this.setState({refresh:!this.state.refresh}) 
       }


    remove(expence){
        var arr = this.state.data
        for( var i = 0; i < arr.length; i++)
        {
          if ( arr[i].date == expence.date && arr[i].desc == expence.desc && arr[i].amount == expence.amount && arr[i].paidBy == expence.paidBy && arr[i].splitWith == expence.splitWith )
           {
             arr.splice(i, 1);
           }
         }//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

        //  this.props.expences = arr
        this.setState({data:arr});
        // this.storeData(this.state.availableColors);
        this.setState({refresh:!this.state.refresh});
    
    
      }

    addFunc(newExpence){
        console.log(this.state.data.length)
        let newState = this.state.data
        newState.push(newExpence);
        this.setState({data:newState})
        this.setState({forceRefresh:true});
        console.log(this.state.data.length)
        console.log("refresh "+this.state.forceRefresh);
        this.forceUpdate();
    }
    allExpencesWithProps=()=>{
        return(
            <AllExpencesNavigator refresh={this.state.forceRefresh} add={(newExpence)=>this.addFunc(newExpence)} remove={(expence)=>this.remove(expence)}  data={this.state.data} />
        );
    }
    insightsWithProps=()=>{
        return(
            <InsightsNavigator  data={this.state.data} income={this.state.income} />
        );
    }
    homeNavigatorWithProps=()=>{
        return(
            <HomeNavigator refresh={this.state.refresh} add={(newExpence)=>this.addFunc(newExpence)} remove={(expence)=>this.remove(expence)} data={this.state.data} income={this.state.income} />
        );
    }

    render(){


    return(

    <Drawer.Navigator initialRouteName="Home"
    drawerStyle={{backgroundColor:"#f8f8f8",fontWeight:'bold'}}
    drawerContent={props=><CustomDrawer {...props}/>}
    drawerContentOptions={{
        labelStyle:{fontWeight:'bold',fontSize:14.5}
    }}
    >
        <Drawer.Screen name="Home" options={{unmountOnBlur:true}} component={this.homeNavigatorWithProps} />
        <Drawer.Screen name="AllExpences"  options={{unmountOnBlur:true,drawerLabel:"All Expences"}} component={this.allExpencesWithProps}  />
        <Drawer.Screen name="Insights" options={{unmountOnBlur:true,drawerLabel:"Monthly Insights"}} component={this.insightsWithProps} />
        <Drawer.Screen name="About" component={AboutNavigator} />
        <Drawer.Screen name="Contact" component={ContactNavigator} />

    </Drawer.Navigator>
    );
}

}

const styles = StyleSheet.create({
    drawerContainer:{
        flex:1,
        marginTop:25,
        // padding:10,
    },
    drawerHeader:{
        borderBottomWidth:1.25,
        borderColor:'gray',
        backgroundColor: '#1cc29f',
        height: 210,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // flexDirection: 'row',
    },
    drawerIcon:{
        height:75,
        width:75,
        borderRadius:80,
        // marginLeft:10,
        marginTop:50
    },
    drawerText:{
        fontWeight:'bold',
        color:"#fff",
        // marginLeft:20,
        fontSize:25,
        marginTop:75,
    }

})