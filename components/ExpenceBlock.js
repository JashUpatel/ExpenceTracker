import React, { Component } from 'react';
import { Text, View,Alert, StyleSheet, Animated,TouchableOpacity,Modal,Button} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Expences from './Expences';

//import swipeables
import { Swipeable } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';


import Select2 from 'react-native-select-two';

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


  

class ExpenceBlock extends Component{

  constructor(props){
    super(props);
    this.state={
      categoryModal:false,
      selectedValue:'',
      nullCategory:0,
    }
    this.csetModalVisible = this.csetModalVisible.bind(this);
  }

  csetModalVisible(){
    this.setState({categoryModal:!this.state.categoryModal});

  }


  render(){
    const {
      expences,
      onDelete,
      onSwipe,
      onSelect,

    } = this.props;
// const ExpenceBlock=({expences,onDelete=f=>f,onSwipe=f=>f,onSelect=f=>f})=>{
  

  const mockData = [
    { id: 'Rent', name: 'Rent' },
    { id: 'Food', name: 'Food' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Online/Offline Shopping', name: 'Online/Offline Shopping' },
    { id: 'Groceries', name: 'Groceries' },
    { id: 'Insurance/loan', name: 'Insurance/loan' },
    { id: 'Recharge and bills', name: 'Recharge and bills' },
    { id: 'Movies and entertainment', name: 'Movies and entertainment' },
    { id: 'Traveling', name: 'Traveling' },
    { id: 'Fuel', name: 'Fuel' },
    { id: 'Occasions', name: 'Occasions' },
    { id: 'Medical and Healthcare', name: 'Medical and Healthcare' },
    { id: 'Education', name: 'Education' },
    { id: 'Donation', name: 'Donation' },
    { id: 'Snacks and drinks', name: 'Snacks and drinks' },
    { id: 'Investment', name: 'Investment' },
    { id: 'Products and repairs', name: 'Products and repairs' },
    { id: 'Personal expenses', name: 'Personal expenses' },
    { id: 'Others', name: 'Others' }
];
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

const addCommas=(num) =>{
  
  let dec = num.toString().split('.')[0]

  if(dec.length==4){

      return dec[0]+','+dec.slice(1)
  }
  else if(dec.length==5){
      return dec.slice(0,2)+','+dec.slice(2)

  }
  else if(dec.length==6){
      return dec.slice(0,1)+','+dec.slice(1,3)+','+dec.slice(3)

  }
  else if(dec.length==7){
      return dec.slice(0,2)+','+dec.slice(2,4)+','+dec.slice(4)

  }
  else if(dec.length==8){
      return dec.slice(0,1)+','+dec.slice(1,3)+','+dec.slice(3,5)+','+dec.slice(5)
  }
  else{
      return dec
  }
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

      onLongPress={()=>{ 
        if(this.props.editable){
          optionsSelect(expences)

        }
      }}

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
                                onPress={()=>
                                  {
                                    let temp =expences.category;
                                    this.setState({selectedValue:temp})
                                  // console.log("press")
                                   this.csetModalVisible()
                                  }

                                }
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
                                <Text style={style.amount}>{expences.amount.toString().split(".").length==2?addCommas(expences.amount.toString().split(".")[0])+"."+expences.amount.toString().split(".")[1]:addCommas(expences.amount.toString())}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text>
                                {((expences.paidBy.slice(0,3)=='You' && expences.splitWith!="None" && expences.status=="Unpaid")||(expences.paidBy.slice(0,3)=='You'&& expences.splitWith=="None"))?<Text>Paid by: </Text>: expences.paidBy.slice(0,3)!="You"?<Text>To: </Text>:<Text>From: </Text>}
                            <Text style={style.from}>{expences.paidBy=='You' && expences.splitWith!='None'? expences.splitWith : expences.paidBy}</Text></Text>
                                <Text> Status: <Text style={{fontWeight:'bold'}}>{expences.status}</Text></Text>
                            </View>

                </View>
                </View>
                </TouchableHighlight>
                 {/* // </Swipeable> */}

                 <Modal animationType = {"slide"} transparent = {true}
                    visible = {this.state.categoryModal}
                    onDismiss = {() => this.csetModalVisible() }
                    onRequestClose = {() => this.csetModalVisible() }>
                    <View style = {style.modal}>
                      <View style={{justifyContent:'center',paddingVertical:25, marginLeft:-25}}>
                      <View>
                    {/* <Text>Add Income : </Text> */}
                    {/* <View style={style.formRow}> */}
                    
                              <Text style={style.formLabel}>Edit Category: </Text>
                    <Select2
                    isSelectSingle
                    style={this.state.nullCategory==0?{ borderRadius: 5, width:'150%', marginBottom:25 }:[{ borderRadius: 5, width:'150%', marginBottom:25 },style.nullErr]}
                    colorTheme={'green'}
                    popupTitle='Select Category'
                    title={this.state.selectedValue}
                    data={mockData}
                    value={expences.category}
                    onSelect={data => {
                        if(data!=''){
                        this.setState({ selectedValue :data });
                        }
                        else{
                        this.setState({ selectedValue :'Pick a Category' });
                        this.setState({nullCategory:1})


                        }
                    }}
                    onRemoveItem={data => {
                        this.setState({ selectedValue:data });
                        this.setState({nullCategory:1})

                    }} 
                    cancelButtonText={'Cancel'}
                    selectButtonText ={'Select'}
                    searchPlaceHolderText='Search Category'
                    listEmptyTitle='Category not found!'
                    // popupTitle={"Pick category"}
                    // placeholder={"place"}
                />
                {/* </View> */}
                    </View>
                    <View
                    style={{
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // flex: 1,
                      flexDirection: 'row',
                    }}>
                        {/* <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/> */}
                        <Button 
                            onPress = {() =>this.csetModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
                            <Button 
                            onPress = {() =>{if(this.state.selectedValue==''){this.setState({nullCategory:1})}else{this.setState({nullCategory:0});expences.category=this.state.selectedValue; console.log("ok");this.csetModalVisible()}console.log("Save")}}
                            color="#137863"
                            title="Save" 
                            />
                      </View>
                    </View>
                    </View>
                </Modal>

                 </Swipeout>



)}
};

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
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        alignItems: 'center',
      justifyContent: 'center',
      marginBottom:20
      
        // flex: 2
    },
    formItem: {
        // flex: 1,
        justifyContent:'center',
        alignItems: 'center',
      justifyContent: 'center',
      
    },
    nullErr:{
        borderColor:'red',
        // borderWidth:1.5,
        borderBottomWidth: 1.5,
        borderTopWidth:1.5,
        // borderRightWidth:1.5,
        // alignSelf:'center'
    },
    modal: {
      // flex:1,
      width:'85%',
      height:'25%',
      alignContent:'flex-start',
      alignSelf:'center',
      justifyContent: 'flex-start',
      marginTop: '75%',
      // marginLeft:-50,
      backgroundColor:'#fff',
      alignItems:'center'
   },


});