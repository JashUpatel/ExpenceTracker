import React, { Component } from 'react';
import { View,Image,Linking, Text,Platform,Share, ScrollView, Dimensions, KeyboardAvoidingView, StyleSheet, Alert, TouchableHighlight, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Icon, Card,SocialIcon ,Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

// import ColorButton from './colorButton';
// import ColorForm from './ColorForm';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
// const screenHeight = Dimensions.get('window').height

// const availableColors=['red','salmon','yellow','cyan','magenta','purple','green','blue','pink'];


class Contact extends Component {


  constructor(props){
    super(props);
    this.state={
      backgroundColor: '#fcfcfc',

    }
    this.invite = this.invite.bind(this);

  }


  invite(){
     Share.share({
       title:'ColorApp',
       message: 'Download the ColorApp now...',
       url:'https://github.com/JashUpatel'
     },{
       dialogTitle:'Share ColorApp...'
     })

   }

  render(){

    return(
      <ScrollView>
      <View style={{flex:1,backgroundColor:'#fff'}}>
      <ScrollView contentContainerStyle={[styles.container,{backgroundColor:this.state.backgroundColor},{ flexGrow: 1 }]}>
      <View style={styles.imgcontainer}>
      <Animatable.View animation='zoomIn' duration={2500} >

      <Image
        style={[styles.Logo,{borderWidth:1.75,borderColor:'#dddddd',marginBottom:75,marginTop:25}]}
        source={require('./jash2.jpg')}
      />

      </Animatable.View>

      </View>
      <Text style={{fontSize: 20,
      color:'#343434',
      fontFamily:'Roboto',
      fontWeight:'bold',
      marginBottom:25
    }}> Feel free to reach out here.... </Text>


<View style={{flex:1,width:'100%'}}>

    <Animatable.View animation='bounceInLeft' duration={2000} >
    <Animatable.View iterationCount='infinite' iterationDelay={5000} animation='pulse' duration={2000} delay={3000} >

      <SocialIcon
        raised={true}
        button
        underlayColor='#9e9e9e94'
        title='Instagram'
        type='instagram'
        style={{width:'100%',backgroundColor:'#E1306C'}}
        onPress={() => Linking.openURL('https://www.instagram.com/jash_u_patel/')}

      />
      </Animatable.View>

      </Animatable.View>



      <Animatable.View animation='bounceInRight' duration={2000} >
      <Animatable.View iterationCount='infinite' iterationDelay={5000} animation='pulse' duration={2000} delay={4000} >

      <SocialIcon
        raised={true}
        underlayColor='#9e9e9e94'
        style={{width:'100%'}}
        title='Facebook'
        button
        type='facebook'
        onPress={() => Linking.openURL('https://www.facebook.com/jash.patel.75054')}

      />
      </Animatable.View>
      </Animatable.View>

      <Animatable.View animation='bounceInLeft' duration={2000} >
      <Animatable.View iterationCount='infinite' iterationDelay={5000} animation='pulse' duration={2000} delay={5000} >

      <SocialIcon
      underlayColor='#9e9e9e94'
        raised={true}
        style={{width:'100%'}}
        title='Twitter'
        button
        type='twitter'
        onPress={()=> Linking.openURL('https://twitter.com/Jash_u_patel')}

      />
      </Animatable.View>

      </Animatable.View>

      <Animatable.View animation='bounceInRight' duration={2000} >
      <Animatable.View iterationCount='infinite' iterationDelay={5000} animation='pulse' duration={2000} delay={6000} >

      <SocialIcon
        raised={true}
        style={{width:'100%'}}
        title='LinkedIn'
        button
        type='linkedin'
        onPress={()=> Linking.openURL('https://www.linkedin.com/in/jash-patel-31bb9b134/')}
        underlayColor='#9e9e9e94'

      />
      </Animatable.View>
      </Animatable.View>

      <Animatable.View animation='bounceInLeft' duration={2000} >
      <Animatable.View iterationCount='infinite' iterationDelay={5000} animation='pulse' duration={2000} delay={7000} >

      <SocialIcon
        raised={true}
        style={{width:'100%'}}
        title='Github'
        button
        type='github'
        onPress={()=> Linking.openURL('https://github.com/JashUpatel')}
        underlayColor='#9e9e9e94'

      />

      </Animatable.View>

      </Animatable.View>


</View>
      <Text style={{marginTop:150,fontSize:16,fontFamily:'Roboto'}}>Copyright &copy; Expence Tracker</Text>
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
    backgroundColor:'white',
    width:250,
    height:250,
    borderWidth:1,
    borderRadius:150,

  },
  container:{
    flex:1,
    alignItems: 'center',
    padding:25,
    justifyContent:'center'

  },

  button:{
    borderWidth:1,
    borderRadius:50,
    margin:5,
    padding:10,
    alignSelf:'stretch',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'space-around',
  }



});




export default Contact;
