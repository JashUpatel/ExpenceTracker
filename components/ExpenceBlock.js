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

//importing icon
import Ionicons from 'react-native-vector-icons/Ionicons';


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
      icon:'',

    }
    this.csetModalVisible = this.csetModalVisible.bind(this);
    this.selectIcon=this.selectIcon.bind(this);
  }

  csetModalVisible(){
    this.setState({categoryModal:!this.state.categoryModal});

  }

  selectIcon(value){
    // console.log("icon call" + value)
    if(value=="Rent"){
      // console.log("rent call")
      // this.props.expences.icon="home-outline";
        this.setState({icon:'home-outline'});
      // console.log("after rent" + this.state.icon)
        
    }
    else if(value=='Food and restaurants'){
      // this.props.expences.icon="fast-food-outline";

        this.setState({icon:'fast-food-outline'});
        // console.log("after food" + this.state.icon)

    }
    else if(value=='Online and Offline Shopping'){
        this.setState({icon:'pricetags-outline'});
        // console.log("after shop" + this.state.icon)

    }
    else if(value=='Groceries'){
        this.setState({icon:'cart-outline'});

    }
    else if(value=='Insurance and loan'){
        this.setState({icon:'shield-outline'});

    }
    else if(value=='Recharge and bills'){
        this.setState({icon:'receipt-outline'});

    }
    else if(value=='Movies and entertainment'){
        this.setState({icon:'film-outline'});

    }
    else if(value=='Traveling'){
        this.setState({icon:'subway-outline'});

    }
    else if(value=='Fuel'){
        this.setState({icon:'flame-outline'});

    }
    else if(value=='Medical and Healthcare'){
        this.setState({icon:'medkit-outline'});

    }
    else if(value=='Education'){
        this.setState({icon:'school-outline'});

    }
    else if(value=='Snacks and drinks'){
        this.setState({icon:'wine-outline'});

    }
    else if(value=='Investment'){
        this.setState({icon:'golf-outline'});

    }else if(value=='Personal expenses'){
        this.setState({icon:'wallet-outline'});

    }else if(value=='Others'){
        this.setState({icon:'planet-outline'});

    }
    else{
        this.setState({icon:''});
    }
}


  render(){
    const {
      expences,
      onDelete,
      onSwipe,
      onSelect,

    } = this.props;
// const ExpenceBlock=({expences,onDelete=f=>f,onSwipe=f=>f,onSelect=f=>f})=>{
  

//   const mockData = [
//     { id: 'Rent', name: 'Rent' },
//     { id: 'Food', name: 'Food' },
//     { id: 'Clothing', name: 'Clothing' },
//     { id: 'Online/Offline Shopping', name: 'Online/Offline Shopping' },
//     { id: 'Groceries', name: 'Groceries' },
//     { id: 'Insurance/loan', name: 'Insurance/loan' },
//     { id: 'Recharge and bills', name: 'Recharge and bills' },
//     { id: 'Movies and entertainment', name: 'Movies and entertainment' },
//     { id: 'Traveling', name: 'Traveling' },
//     { id: 'Fuel', name: 'Fuel' },
//     { id: 'Occasions', name: 'Occasions' },
//     { id: 'Medical and Healthcare', name: 'Medical and Healthcare' },
//     { id: 'Education', name: 'Education' },
//     { id: 'Donation', name: 'Donation' },
//     { id: 'Snacks and drinks', name: 'Snacks and drinks' },
//     { id: 'Investment', name: 'Investment' },
//     { id: 'Products and repairs', name: 'Products and repairs' },
//     { id: 'Personal expenses', name: 'Personal expenses' },
//     { id: 'Others', name: 'Others' }
// ];


const mockData = [
  { id: 'Rent', name: 'Rent' },
  { id: 'Food and restaurants', name: 'Food and restaurants' },
  // { id: 'Clothings', name: 'Clothings' },
  { id: 'Online and Offline Shopping', name: 'Online and Offline Shopping' },
  { id: 'Groceries', name: 'Groceries' },
  { id: 'Insurance and loan', name: 'Insurance and loan' },
  { id: 'Recharge and bills', name: 'Recharge and bills' },
  { id: 'Movies and entertainment', name: 'Movies and entertainment' },
  { id: 'Traveling', name: 'Traveling' },
  { id: 'Fuel', name: 'Fuel' },
  // { id: 'Occasions', name: 'Occasions' },
  { id: 'Medical and Healthcare', name: 'Medical and Healthcare' },
  { id: 'Education', name: 'Education' },
  // { id: 'Donation', name: 'Donation' },
  { id: 'Snacks and drinks', name: 'Snacks and drinks' },
  { id: 'Investment', name: 'Investment' },
  // { id: 'Products Purchase', name: 'Products Purchase' },
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
          console.log("am:"+expences.amount)
          optionsSelect(expences)

        }
      }}

      >
            <View style={style.block} >

                    <View>
                            {/* <Icon 
                            name='bowl-mix-outline' 
                            size={40}
                            raised
                            // name='heartbeat'
                            // type='font-awesome'
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
                                /> */}
             <Ionicons 
             name={expences.icon}
            // name='planet-outline' 
             size={42} 
             containerStyle={{marginLeft:0}}
             style={{color:"#109a7d",marginLeft:3,marginTop:7.5}}
             onPress={()=>
              {
                let temp =expences.category;
                let temp2 = expences.icon;
                this.setState({selectedValue:temp,icon:temp2})
              // console.log("press")
               this.csetModalVisible()
              }}
            //  color={color}
              />

                                


                    </View>
                    
                    <View style={style.expData}>

                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={expences.desc.length<10? style.desc: style.smallDesc}>{expences.desc}</Text>
                                    
                                <View style={{flexDirection:'row'}}>
                                <Icon name='currency-inr' size={expences.amount.length>5?22:32}
                                // containerStyle={{marginLeft:5}}
                                style={expences.amount.length>5?{
                                  // color:'#d33737s',
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    marginTop:3,
                                    flexDirection:'column'
                                }:{flexDirection:'column'}}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                                <Text style={expences.amount.length>5?style.smallAmount:style.amount}>{expences.amount.toString().split(".").length==2?addCommas(expences.amount.toString().split(".")[0])+"."+expences.amount.toString().split(".")[1]:addCommas(expences.amount.toString())}</Text>
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
                      <View style={{justifyContent:'center',paddingVertical:25, marginLeft:-50}}>
                      <View>
                    {/* <Text>Add Income : </Text> */}
                    {/* <View style={style.formRow}> */}
                    
                    <Text style={[style.formLabel,{ fontSize:21,fontWeight:'bold', color:"#109a7d",}]}>Select Category : </Text>
                    <Select2
                    isSelectSingle
                    style={this.state.nullCategory==0?{ borderRadius: 5, width:'120%', marginBottom:25 }:[{ borderRadius: 5, width:'1230%', marginBottom:25 },style.nullErr]}
                    colorTheme={'#109a7d'}
                    popupTitle='Select Category'
                    title={this.state.selectedValue}
                    data={mockData}
                    value={expences.category}
                    onSelect={data => {
                        if(data!=''){
                        this.setState({ selectedValue :data });
                        this.selectIcon(data);
                        // this.
                      
                      }
                        else{
                        this.setState({ selectedValue :'Pick a Category' });
                        this.setState({nullCategory:1})


                        }
                    }}
                    onRemoveItem={data => {
                        this.setState({ selectedValue:data });
                        this.setState({nullCategory:1})
                        this.selectIcon(data);

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
                      marginLeft:10,
                      alignItems: 'center',
                      justifyContent:'space-around',
                      // flex: 1,
                      flexDirection: 'row',
                    }}>
                        {/* <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/> */}
                        {/* <Button 
                            
                            onPress = {() =>this.csetModalVisible()}
                            color="#109a7d"
                            title="Close" 
                            /> */}
                            {/* <Button 
                            onPress = {() =>{if(this.state.selectedValue==''){this.setState({nullCategory:1})}else{this.setState({nullCategory:0});expences.category=this.state.selectedValue;expences.icon=this.state.icon; console.log(this.state.icon);this.csetModalVisible()}console.log("Save : "+this.state.icon)}}
                            color="#109a7d"
                            title="Save" 
                            /> */}
                            <TouchableOpacity
                            activeOpacity={0.75}
                             style={{borderWidth:1,borderRadius:50,borderColor:'#109a7d',paddingHorizontal:30,paddingVertical:7.5, }}
                             onPress = {()=>this.csetModalVisible()}
                             
                             >
                              <Text style={{color:'#109a7d', fontWeight:'bold'}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            activeOpacity={0.75}
                             style={{borderWidth:1,borderRadius:50,backgroundColor:'#109a7d',borderColor:'#109a7d',paddingHorizontal:40,paddingVertical:7.5,marginLeft:15}}
                            //  onPress = {()=>this.csetModalVisible()}
                            onPress = {() =>{if(this.state.selectedValue==''){this.setState({nullCategory:1})}else{this.setState({nullCategory:0});expences.category=this.state.selectedValue;expences.icon=this.state.icon; this.props.reRender(); console.log(this.state.icon);this.csetModalVisible()}console.log("Save : "+this.state.icon)}}
                             
                             >
                              <Text style={{color:'#fff', fontWeight:'bold'}}>Save</Text>
                            </TouchableOpacity>
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
        paddingLeft:23,
        paddingRight:0,
    },
    amount:{
        fontWeight:'bold',
        fontSize:35,
        marginTop:-10,
    },
    smallAmount:{
      fontSize:21,
      fontWeight:'bold',
      marginTop:-2,

      // color:'#d33737'
       },
    desc:{
        // fontWeight:'bold',
        fontSize:23
    },
    smallDesc:{
      fontSize:20,
      marginBottom:7,
    },
    from:{
        fontWeight:'bold',
        // fontSize:15,
    },
    block:{
        flexDirection:'row',
        padding:15,
        // paddingHorizontal:15,
        // paddingVertical:13,
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