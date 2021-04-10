import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Expences from './Expences';

const ExpenceBlock=({expences})=>(
    
    
            <View style={style.block}>

                    <View>
                            <Icon name='bowl-mix-outline' size={40}
                                containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'absolute',
                                    // top:19,
                                    // left:16,
                                    // marginLeft:15
                                    // flex:'row'
                                }}
                                onPress={()=>navigation.toggleDrawer()}
                                />

                    </View>
                    
                    <View style={style.expData}>

                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={style.desc}>{expences.desc}</Text>
                                    
                                <View style={{flexDirection:'row'}}>
                                <Icon name='currency-inr' size={32}
                                // containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    flexDirection:'column'
                                }}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                                <Text style={style.amount}>{expences.amount}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text>
                                {expences.paidBy=='You'&& expences.splitWith=="None"?<Text>Paid by: </Text>: expences.paidBy!="You" && expences.status=="Unpaid"?<Text>To: </Text>:<Text>From: </Text>}
                            <Text style={style.from}>{expences.paidBy}</Text></Text>
                                <Text>{expences.date}Status: <Text style={{fontWeight:'bold'}}>{expences.status}</Text></Text>
                            </View>

                </View>
                </View>


);

export default ExpenceBlock;

const style = StyleSheet.create({

   
    expData:{
        flex:1,
        paddingLeft:25,
        paddingRight:0,
    },
    amount:{
        fontWeight:'bold',
        fontSize:35,
        marginTop:-10,
    },
    desc:{
        // fontWeight:'bold',
        fontSize:21
    },
    from:{
        fontWeight:'bold',
        // fontSize:15,
    },
    block:{
        flexDirection:'row',
        padding:15,
        marginVertical:10,
        // marginHorizontal:20,
        borderWidth:1,
        borderRadius:5,
        flex:1,
        alignItems:"stretch",
        alignContent:"space-between",
        justifyContent:"space-between",
        alignSelf:'stretch',
    }
});