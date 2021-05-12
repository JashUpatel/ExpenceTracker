import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import tabnavigator and passing to the home navigator
import TabNavigator from '../routes/tabNavigator';
import AddExpence from './AddExpence';


// import Expences Block
import ExpenceBlock from './ExpenceBlock';
import Expences from './Expences';


//import Data
// import Data from './data';
// import { DATA } from './data';


class HomeScreen extends Component{

    constructor(props){
        super(props);
        this.state={
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
            // Expences:DATA,

            // Expences:[
            //     {
            //         date:"07/03/2021",
            //         // date:"03/07/2021",
            //         amount:'100',
            //         desc:'Lunch',
            //         paidBy:"You",
            //         splitWith:"None",
            //         share:"N/A",
            //         status:"Paid"
            //     },
            //     {
            //         date:"21/03/2021",
            //         // date:"03/21/2021",
            //         amount:'100',
            //         desc:'Lunch',
            //         paidBy:"You",
            //         splitWith:"None",
            //         share:"N/A",
            //         status:"Paid"
            //     },
            //     {
            //         date:"21/03/2021",
            //         //  date:"03/21/2021",
            //         amount:'100',
            //         desc:'Lunch',
            //         paidBy:"You",
            //         splitWith:"None",
            //         share:"N/A",
            //         status:"Paid"
            //     },
            //     {
            //         date:"08/03/2021",
            //         amount:'150',
            //         desc:'BF',
            //         paidBy:"Jash",
            //         splitWith:"None",
            //         share:"N/A",
            //         status:"Unpaid"

            //     },
            //     {
            //         date:"03/03/2021",
            //         amount:'500',
            //         desc:'Diner',
            //         paidBy:"You",
            //         splitWith:"JK",
            //         share:"N/A",
            //         status:"Unpaid"

            //     },
            //     {
            //         date:"05/03/2021",
            //         // date:"03/05/2021", 
            //         amount:'50',
            //         desc:'Snacks',
            //         paidBy:"You",
            //         splitWith:"None",
            //         share:"N/A",
            //         status:"Paid"

            //     },
            // ]

        }

        
    // this.state.Expences.sort(function(a, b) {
    //     var c = new Date(a.date);
    //     var d = new Date(b.date);
    //     return c-d;
    // }).reverse();





        // this.expenceFilter = this.expenceFilter.bind(this);
        // this.payableFilter = this.payableFilter.bind(this);
        // this.recievableFilter = this.recievableFilter.bind(this);

    }




    // expenceFilter(){
    // var expences=[];
    //   this.state.Expences.forEach(element => {
    //     if(element.paidBy=="You" && element.splitWith=="None" && element.status=="Paid"){
    //       expences.push(element);
    //     }
    //   });
    //   return expences;
    // }

    // payableFilter(){
    // var payables=[];
    // this.state.Expences.forEach(element => {
    //     if(element.paidBy!="You" && element.status=="Unpaid"){
    //       payables.push(element);
    //     }
    //   });
    //   return payables;
    // }

    // recievableFilter(){

    //     var receivables=[];
    //     this.state.Expences.forEach(element => {
    //       if(element.paidBy=="You" && element.splitWith!="None" && element.status=="Unpaid"){
    //         receivables.push(element);
    //       }
    //     });

    //     return receivables;

    // }


    render(){

            return(
                //   this.state.Expences.map(expence=>(
                //     <View style={styles.formRow,{backgroundColor:'Green',flex:1,zIndex:1}}>
                //     <Text style={{fontSize:15,fontWeight:'bold'}}>{expence.desc}</Text>
                //     </View>
                //     )
                // )
              
            // <TabNavigator expences={this.expenceFilter()} payables={this.payableFilter()} receivables={this.recievableFilter()}  data={this.state.Expences}  />
            <TabNavigator remove={(expence)=>this.props.remove(expence)}  data={this.props.Expences} income={this.props.income} />

        )}

    };

export default HomeScreen;

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
      },
      formLabel: {
          fontSize: 18,
          flex: 2
      },
      formItem: {
          flex: 1,
          justifyContent:'flex-end'
      },
      mainText:{
          fontSize: 18,
          color:'white',
          fontFamily:'monospace',
          fontWeight:'bold',
          marginVertical: 6,
        },
});