import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
//import tabnavigator and passing to the home navigator
import TabNavigator from '../routes/tabNavigator';



class HomeScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh:false,
            
        }


    }




    render(){

            return(
               <TabNavigator reRender={()=>this.props.reRender()} add={(newExpence)=>this.props.add(newExpence)} remove={(expence)=>this.props.remove(expence)}  data={this.props.Expences} income={this.props.income} setIncome={(i,newExpence)=>this.props.setIncome(i, newExpence)} />

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