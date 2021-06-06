import React, { Component } from 'react';
import { View,Image, Text, ScrollView, StyleSheet } from 'react-native';
import {  Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class AboutUs extends Component {


  constructor(props){
    super(props);
    this.state={
      backgroundColor: '#fcfcfc',

    }
  }

  render(){

    return(
      <ScrollView>
      <View style={{flex:1}}>
      <ScrollView contentContainerStyle={[styles.container,{backgroundColor:this.state.backgroundColor},{ flexGrow: 1 }]}>

      <View style={styles.imgcontainer}>

      <Animatable.View animation='bounceIn' duration={2000} delay={1500} >
      <Image
        style={styles.Logo}
        source={require('./icon/ETIcon1.png')}
      />
      <Text style={{justifyContent:'center', textAlign:'center',alignItems:'center',fontFamily:'monospace',marginTop:12}}>v ~3.7.5</Text>

      </Animatable.View>

      </View>
      <Animatable.View animation='fadeInDown' duration={2000} >

      <Card  title="About ColorApp" >
                  <Text style={{fontFamily:'sans-serif', fontSize:16}}>
                  <Text style={{color:'#109a7d', fontWeight:'bold'}}>Expence Tracker</Text> helps you track your financial activity efficiently. Its design makes it simple, straightforward and very easy to use. It’s done in one click, You need just a few SECONDS daily to save the amount and each spending purpose.   {/* <br/><br/> */}
                  {"\n\n"}
                  No matter where you are just a couple of taps will save your expense.
                  </Text>
          </Card>
        </Animatable.View>

        <Animatable.View animation='fadeInUp' duration={2000} >

              <Card title="How to use?"  >
                <Text style={{color:'#109a7d',fontWeight:'bold',fontSize:23,marginBottom:10}}>Key features:</Text>
                          <Text style={{fontFamily:'sans-serif-thin',fontSize:16}}>
                          
                          Money management is always complicated and most of the time you get to wonder where did all your money go, luckily, our simple personal finance app can helps you easily manage your money and keep track of your expense. You can stay on top of your money anytime, anywhere.
                          {"\n\n"}
                          
                          Easy to Use, Clean and Intuitive Expense & Income Tracker.
                            {/* <br/><br/> */}
                          {"\n\n"}
                          Easily record the transaction to track where your money comes and goes it's the Whole Picture in One Place.
                          {"\n\n"}
                          Clear view on your financial life. Better understand where your money comes and goes with visualized reports about income, expense by time and category.
                          {"\n\n"}
                          See your spending distribution in the nice and informative way or get, view your transactions grouped by categories.
                          {"\n\n"}
                          
                          Have fun using this App.
                          </Text>
              </Card>
              </Animatable.View>

              <Text style={{marginTop:25,fontSize:16,fontFamily:'Roboto'}}>Copyright &copy; Expence Tracker</Text>
      </ScrollView>
      </View>
</ScrollView>

      );
  }


}

const styles = StyleSheet.create({

  imgcontainer:{
    alignItems: 'center',
    padding:15,
    justifyContent:'center'

  },
  Logo:{
    width:100,
    height:100,
    borderWidth:1,
    borderRadius:100,

  },
  container:{
    flex:1,
    alignItems: 'center',
    padding:25,
    justifyContent:'center'

  },

});




export default AboutUs;
