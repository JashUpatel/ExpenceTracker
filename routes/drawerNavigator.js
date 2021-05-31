import  React,{Component} from 'react';
import { Button, View, Image, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            {/* <Image source={require('../assets/icon.png')}
            style={styles.drawerIcon}
            /> */}
             <Ionicons 
            //  name={expences.icon}
            name='analytics-outline' 
             size={75} 
             containerStyle={{marginLeft:0}}
             style={{color:"#FFF",marginLeft:0,marginTop:50}}
             
              />

            </View>
            <View style={{flex:2}}>
                <Text style={styles.drawerText}>Expence Tracker</Text>
            </View>

        </View>
        <DrawerItemList  {...props} />
        <View style={{justifyContent:'center', alignItems:'center', marginTop:475}}>

                <View>
                <Text style={{fontSize:16,fontWeight:'bold',marginTop:-325,marginLeft:-35}}>Made With {" "}
                <Text style={{margin:25}}>
                <Ionicons 
             name='heart-outline' 
             size={21.5} 
            //  containerStyle={{marginLeft:10}}
             style={{color:"#109a7d",marginLeft:10,marginTop:7.5}}
             
         
              /></Text>
</Text>


                </View>
                <Text style={{justifyContent:'center', textAlign:'center',alignItems:'center',fontFamily:'monospace',marginTop:-285,marginLeft:-45}}>v ~3.7.5</Text>

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
    this.setIncome = this.setIncome.bind(this);
    this.reRender = this.reRender.bind(this);

    }
    componentDidMount(){
        // this.setState({refresh:!this.state.refresh}) 
       }


    remove(expence){
        var arr = this.state.data
        console.log("remove: "+ expence.id)
        for( var i = 0; i < arr.length; i++)
        {
          if ( arr[i].id == expence.id && arr[i].date == expence.date && arr[i].desc == expence.desc && arr[i].amount == expence.amount && arr[i].paidBy == expence.paidBy && arr[i].splitWith == expence.splitWith )
           {
             arr.splice(i, 1);
           }
         }//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

        //  this.props.expences = arr
        this.setState({data:arr});
        // this.storeData(this.state.availableColors);
        this.setState({refresh:!this.state.refresh});
        this.setState({forceRefresh:true});
    
    
      }

    addFunc(newExpence){

        console.log(this.state.data.length)
        console.log("refresh bef "+this.state.forceRefresh);

        let newState = this.state.data
        newState.push(newExpence);
        this.setState({data:newState})
        this.setState({forceRefresh:true});
        console.log("new:"+this.state.data.length+":"+newExpence.id);
        console.log("refresh af"+this.state.forceRefresh);
        this.forceUpdate();
    }

    reRender(){

        this.setState({forceRefresh:true});

    }

    setIncome(i, newIncome){
        // this.setState({ promptVisible: true})
         var e =  i;
        e.income=newIncome;
        
        let incIndx = this.state.income.findIndex((el)=>(e.month==el.month));
              // var incIndx = incomeArr.findIndex((x)=>(x.month=="05/2021"));
              if(incIndx!=-1){
                this.state.income[incIndx].income=newIncome.replace(/,/g,"");
                // var inc ="2"
              }
              else{

                var tempInc = {
                  month:e.month,
                  income:newIncome.replace(/,/g,"")
                }

                this.state.income.push(tempInc);

                // var inc = "-";
                // var inc = incIndx
                // var inc = incomeArr[0].income;
                // var inc = el.date.slice(3,10)
              }
        // this.setState({ incModalVisible: false,newIncome:''})
        this.setState({forceRefresh:true});

              

       }


    allExpencesWithProps=()=>{
        this.setState({forceRefresh:false})
        return(
            <AllExpencesNavigator reRender={()=>this.reRender()} refresh={this.state.forceRefresh} add={(newExpence)=>this.addFunc(newExpence)} remove={(expence)=>this.remove(expence)}  data={this.state.data} />
        );
    }
    insightsWithProps=()=>{
        this.setState({forceRefresh:false})

        return(
            <InsightsNavigator  data={this.state.data} income={this.state.income} setIncome={(i,newExpence)=>this.setIncome(i, newExpence)} />
        );
    }
    homeNavigatorWithProps=()=>{
        this.setState({forceRefresh:false})

        return(
            <HomeNavigator reRender={()=>this.reRender()} refresh={this.state.refresh} add={(newExpence)=>this.addFunc(newExpence)} remove={(expence)=>this.remove(expence)} data={this.state.data} income={this.state.income} setIncome={(i,newExpence)=>this.setIncome(i, newExpence)} />
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
        <Drawer.Screen name="Home" 
        options={{
            drawerIcon:()=>(
                <Ionicons 
             name='planet-outline' 
             size={24} 
             containerStyle={{marginLeft:0}}
             style={{color:"#109a7d",marginLeft:3,marginTop:7.5}}
             
         
              />
              )},
            this.state.forceRefresh==true?
            {unmountOnBlur:true,
                drawerLabel:"This Month",
                drawerIcon:()=>(
                    <Ionicons 
                 name='calendar-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:3}}
                 
             
                  />
                  )
            }:{unmountOnBlur:false,
                drawerLabel:"This Month",
                drawerIcon:()=>(
                    <Ionicons 
                 name='calendar-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:3}}
                 
             
                  />
                  )
                }}
        component={this.homeNavigatorWithProps} 
        />

        <Drawer.Screen
         name="AllExpences" 
         
          options={
            
              this.state.forceRefresh==true?
              {unmountOnBlur:true,
                drawerLabel:"All Expences",
                drawerIcon:()=>(
                    <Ionicons 
                 name='cash-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:3}}
                 
             
                  />
                  )
            }:{
                drawerLabel:"All Expences",
                drawerIcon:()=>(
                    <Ionicons 
                 name='cash-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:3}}
                 
             
                  />
                  )
            }} 
          component={this.allExpencesWithProps} 
           />

        <Drawer.Screen 
        name="Insights" 
        options={
            
                  this.state.forceRefresh==true?
                  {unmountOnBlur:true,
                    drawerLabel:"Monthly Insights",
                    drawerIcon:()=>(
                        <Ionicons 
                     name='bar-chart-outline' 
                     size={28} 
                     containerStyle={{marginLeft:0}}
                     style={{color:"#109a7d",marginLeft:3}}
                     
                 
                      />
                      )
                }
                :
                {drawerLabel:"Monthly Insights",
                drawerIcon:()=>(
                    <Ionicons 
                 name='bar-chart-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:3}}
                 
             
                  />
                  )
            }
        }
                   
                  component={this.insightsWithProps} 
                  />

        <Drawer.Screen 
        name="About" 
        options={{
            drawerIcon:()=>(
                <Ionicons 
             name='information-circle-outline' 
             size={28} 
             containerStyle={{marginLeft:0}}
             style={{color:"#109a7d",marginLeft:1.5}}
             
         
              />
              )}}
        component={AboutNavigator} 
        />
        <Drawer.Screen
        options={
            {
                drawerIcon:()=>(
                    <Ionicons 
                 name='person-circle-outline' 
                 size={28} 
                 containerStyle={{marginLeft:0}}
                 style={{color:"#109a7d",marginLeft:1.5}}
                 
             
                  />
                  )}
        }
         name="Contact" 
         component={ContactNavigator} 
         />

    </Drawer.Navigator>
    );
}

}

const styles = StyleSheet.create({
    drawerContainer:{
        flex:1,
        marginTop:25,
        // padding:10,
        // height:750
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