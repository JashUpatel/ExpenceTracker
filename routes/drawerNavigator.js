import  React,{Component} from 'react';
import { Button, View, Image, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator,DrawerItemList } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import AsyncStorage from '@react-native-community/async-storage'; //deprecated
import AsyncStorage from '@react-native-async-storage/async-storage';
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
// import { DATA } from '../components/data';
import * as Animatable from 'react-native-animatable';

const Drawer = createDrawerNavigator();

const CustomDrawer=(props)=>(
    <ScrollView style={styles.drawerContainer}>
        <View style={{flex:1,justifyContent:"space-between"}}>
        {/* <View style={{flex:1,justifyContent:"space-between", backgroundColor:"#fff", marginTop:25}}> */}
       
            <View style={styles.drawerHeader}>
            <View style={{flex:1,marginTop:35}}>
            <Image source={require('../assets/ETIcon1w.png')}
            style={styles.drawerIcon}
            />
             {/* <Ionicons 
            //  name={expences.icon}
            name='analytics-outline' 
             size={75} 
             containerStyle={{marginLeft:0}}
             style={{color:"#FFF",marginLeft:0,marginTop:50}}
             
              /> */}

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
            isLoading:true,
            data:[],
            refresh:false,
            forceRefresh:false,
            income:[]
            // income:[
            //     {
            //         month:"05/2021",
            //         income:"1000"
            //     },
            //     {
            //         month:"04/2021",
            //         income:"500"
            //     }

            // ]
        }
    this.homeNavigatorWithProps = this.homeNavigatorWithProps.bind(this)
    this.allExpencesWithProps = this.allExpencesWithProps.bind(this)
    this.remove = this.remove.bind(this);  

    this.addFunc = this.addFunc.bind(this);
    this.setIncome = this.setIncome.bind(this);
    this.reRender = this.reRender.bind(this);
    this.storeExpence = this.storeExpence.bind(this);
    this.storeIncome = this.storeIncome.bind(this);
    this.getData = this.getData.bind(this);


    }


    storeExpence = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          console.log(jsonValue)
          await AsyncStorage.setItem('@ExpenceTracker-ExpenceList', jsonValue)
        } catch (e) {
          console.log('saving error')
            }
      }

      storeIncome = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          console.log(jsonValue)
          await AsyncStorage.setItem('@ExpenceTracker-IncomeList', jsonValue)
        } catch (e) {
          console.log('saving error')
            }
      }
    
      getData = async () => {
          try {
            const ExpenceList = await AsyncStorage.getItem('@ExpenceTracker-ExpenceList');
            const IncomeList = await AsyncStorage.getItem('@ExpenceTracker-IncomeList');
           
            if (ExpenceList !== null) {
              console.log('1'+ExpenceList)
    
              var data = JSON.parse(ExpenceList)
              console.log('2'+data)
              this.setState({data:data});
              this.setState({isLoading:false})
              // return availableColor
            } else {
              console.log('--data no .')
            //   const availableColors=['red','green','blue','yellow'];
    
              this.setState({data:[]});
              this.setState({isLoading:false})

            }

            if (IncomeList !== null) {
                console.log('1'+IncomeList)
      
                var income = JSON.parse(IncomeList)
                console.log('2'+income)
                this.setState({income:income});
              this.setState({isLoading:false})

                // return availableColor
              } else {
                console.log('--income no .')
              //   const availableColors=['red','green','blue','yellow'];
      
                this.setState({income:[]});
              this.setState({isLoading:false})

              }


          } catch (e) {
            console.log('cant fetch -'+e);
          }
          this.setState({forceRefresh:true});


          
        };
    
      componentDidMount() {
        this.getData()
        // this.setState({forceRefresh:true});

      }
    
      componentWillUnmount() {
          this.storeExpence(this.state.data);
          this.storeIncome(this.state.income);
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
        this.storeExpence(this.state.data);

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
        this.storeExpence(this.state.data);

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
                let tempSav = Number(this.state.income[incIndx].total)-Number(this.state.income[incIndx].income)
                this.state.income[incIndx].saving= Math.round((tempSav + Number.EPSILON) * 100) / 100 
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
        this.storeIncome(this.state.income);

              

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
        if (this.state.isLoading) {
            return (<View style={{flex:1,justifyContent:'center',alignContent:'center'}}>

                <View style={{alignSelf:'center'}}>
                    
                    <Animatable.View animation='pulse'  iterationCount="infinite" >
                    
                        <Ionicons 
                        name='sync-outline' 
                        size={45} 
                        style={{color:"#109a7d",marginLeft:30,marginTop:17.5}}
                        
                        />
                        {/* {"  "} */}
                        <Text style={{fontSize:28,fontWeight:'normal'}}>Loading...</Text>
                   
                    </Animatable.View>
      

                    </View>
                
                </View>
                );
          }
          else{

          


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
              ),
            drawerLabel:'About Us'}}
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
                  ),
                  drawerLabel:'Reach Out Developer'}
        }
         name="Contact" 
         component={ContactNavigator} 
         />

    </Drawer.Navigator>
    );
    }
}

}

const styles = StyleSheet.create({
    drawerContainer:{
        flex:1,
        // marginTop:25,
        // padding:10,
        // height:750
    },
    drawerHeader:{
        borderBottomWidth:1.25,
        borderColor:'gray',
        backgroundColor: '#1cc29f',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:25,
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
    },
    // loading:{
    //     -webkit
    // }

})