import React, { Component } from 'react';
import { Text, View,Alert, StyleSheet, Animated,TouchableOpacity } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Expences from './Expences';

//import swipeables
import { Swipeable } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';

// const RightActions = (progress, dragX) => {
//     const scale = dragX.interpolate({
//       inputRange: [-100, 0],
//       outputRange: [0.7, 0]
//     })
//     return (
//       <>
//         <TouchableOpacity onPress={() => alert('Delete button pressed')}>
//           <View
//             style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
//             <Animated.Text
//             duration={2000}
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 10,
//                 fontWeight: '600',
//                 transform: [{ scale }]
//               }}>
//               Unpaid
//             </Animated.Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => alert('Archive button pressed')}>
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: 'green',
//               justifyContent: 'center'
//             }}>
//             <Animated.Text
//             duration={2000}
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 10,
//                 fontWeight: '600',
//                 transform: [{ scale }]
//               }}>
//               Paid
//             </Animated.Text>
//           </View>
//         </TouchableOpacity>
//         </>
//     )
//    }


// const LeftActions = (progress, dragX) => {
//     const scale = dragX.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 0.7],
//     //   extrapolate: 'clamp'
//     })
//     return (
//       <View
//         style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
//         <Animated.Text
//         duration={2000}
//           style={{
//             color: 'black',
//             paddingHorizontal: 10,
//             fontWeight: '600',
//             transform: [{ scale }]
//           }}>
//           Update Status
//         </Animated.Text>
//       </View>
//     )
//    }
  

//    const LeftItem = () => {
//     return (
//       <View style={style.leftItem}>
//         <Text style={[style.leftItemText]}>Open</Text>
//       </View>
//     );
//   };
  
//   const RightItem = () => {
//     return (
//       <View style={style.rightItem}>
//         <TouchableOpacity style={style.deleteButtonStyle}>
//           <Text style={style.textButtonStyle}>Delete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={style.archiveButtonStyle}>
//           <Text style={style.archiveTextButtonStyle}>Archive</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };


  

// class ExpenceBlock extends Component{
const ExpenceBlock=({expences,onDelete=f=>f,onSwipe=f=>f,onSelect=f=>f})=>{
  
  const rightButton = [
    {
        text: 'Paid', 
        type: 'delete',
        onPress: () => {

          onSwipe(expences)
            // Alert.alert(
            //     'Update Status?',
            //     'Are you sure you wish to change the favorite dish  ?',
            //     [
            //         { text: 'Cancel', 
            //         onPress: ()=> console.log('not Deleted'),
            //         style:' cancel',
            //         },
            //         {
            //             text: 'OK',
            //             onPress:()=>console.log('Deleted'),
            //         }
            //     ],
            //     { cancelable: false }

            // );


        }
    }
];

const optionsSelect=(expences)=>{


  Alert.alert(
    'Edit Expence',
              'Select between below options to edit the expence.',
              [
                  {
                      text: 'Cancel',
                      onPress: ()=>console.log('Cancel Pressed'),
                      style: 'cancel'
                  },
                  {
                    text: 'Update',
                    onPress: ()=>onSwipe(expences),
                    style: 'cancel'
                },
                  {
                      text:'Delete',
                      onPress:()=>{
                        onDelete(expences)
                        // this.props.remove(expence)
                        // this.setState({refresh:!this.state.refresh});

                      }
                  }

              ],
              { cancelable: true }

              )


}
  
  return(
    // <Swipeable
    // renderLeftActions={LeftActions}
    // renderRightActions={RightActions}
    // onSwipeableLeftOpen ={()=>onSwipe(expences)}
    // onSwipeableRightOpen ={()=>onSwipe(expences)}
   
    
    // // onSwipeableLeftOpen={() => console.log('Swiped Leftt')}
    // // onSwipeableRightOpen={() => console.log('Swiped right')}
    // // renderLeftActions={(progress, dragx) => <LeftItem />}
    // // renderRightActions={(progress, dragx) => <RightItem />}

    // >
    <Swipeout style={{backgroundColor:'none'}} 
    // right={rightButton} 
    autoClose={true}>

    <TouchableHighlight
     style={{marginVertical:10}}
      underlayColor='#DDDDDD'
      activeOpacity={0.6}

    //   onPress={()=>{onSelect(backgroundColor)}}
      onLongPress={()=>{optionsSelect(expences)}}

      >
            <View style={style.block} >

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
                                {((expences.paidBy.slice(0,3)=='You' && expences.splitWith!="None" && expences.status=="Unpaid")||(expences.paidBy.slice(0,3)=='You'&& expences.splitWith=="None"))?<Text>Paid by: </Text>: expences.paidBy.slice(0,3)!="You"?<Text>To: </Text>:<Text>From: </Text>}
                            <Text style={style.from}>{expences.paidBy=='You' && expences.splitWith!='None'? expences.splitWith : expences.paidBy}</Text></Text>
                                <Text>{expences.category} Status: <Text style={{fontWeight:'bold'}}>{expences.status}</Text></Text>
                            </View>

                </View>
                </View>
                </TouchableHighlight>
                 {/* // </Swipeable> */}
                 </Swipeout>



)};

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
        // marginVertical:10,
        // marginHorizontal:20,
        borderWidth:1,
        borderRadius:5,
        flex:1,
        alignItems:"stretch",
        alignContent:"space-between",
        justifyContent:"space-between",
        alignSelf:'stretch',
    },

    leftItem: {
      flex:1,
      backgroundColor: '#76a21e',
      justifyContent: 'center',
    },
    archiveButtonStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#3e64ff',
    },
    archiveTextButtonStyle:{
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    textButtonStyle: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    deleteButtonStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#c00000',
    },
    rightItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'yellow',
      justifyContent: 'center',
    },
    leftItemText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft:20,
      color: '#fff',
    },
  


});