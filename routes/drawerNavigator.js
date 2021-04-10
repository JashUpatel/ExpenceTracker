import * as React from 'react';
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
import AddExpenceNavigator from './addExpenceNavigator';

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
        <DrawerItemList {...props} />
        <View style={{justifyContent:'center', alignItems:'center', marginTop:475}}>

                <View>
                <Text style={{fontSize:16,fontWeight:'bold',marginTop:-235,marginLeft:-50}}>Made With </Text>


                </View>
                <Text style={{justifyContent:'center', textAlign:'center',alignItems:'center',fontFamily:'monospace',marginTop:-185,marginLeft:-15}}>v ~3.7.5</Text>

        </View>



    </View>

    </ScrollView>

);
export default function DrawerNavigator(){

    return(

    <Drawer.Navigator initialRouteName="Home"
    drawerStyle={{backgroundColor:"#f8f8f8",fontWeight:'bold'}}
    drawerContent={props=><CustomDrawer {...props}/>}
    drawerContentOptions={{
        labelStyle:{fontWeight:'bold',fontSize:14.5}
    }}
    >
        <Drawer.Screen name="Home" component={HomeNavigator} />
        <Drawer.Screen name="AllExpences" options={{drawerLabel:"All Expences"}} component={AllExpencesNavigator} />
        <Drawer.Screen name="AddExpence" options={{drawerLabel:"Add Expences"}} component={AddExpenceNavigator} />
        <Drawer.Screen name="About" component={AboutNavigator} />
        <Drawer.Screen name="Contact" component={ContactNavigator} />

    </Drawer.Navigator>
    );

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