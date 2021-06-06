import React, { Component } from 'react';
import { Text, View,Alert, StyleSheet,TouchableOpacity,Modal} from 'react-native';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Swipeout from 'react-native-swipeout';

//importing icon
import Ionicons from 'react-native-vector-icons/Ionicons';


import Select2 from 'react-native-select-two';

  

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
    if(value=="Rent"){
        this.setState({icon:'home-outline'});
        
    }
    else if(value=='Food and restaurants'){
      
        this.setState({icon:'fast-food-outline'});
       
    }
    else if(value=='Online and Offline Shopping'){
        this.setState({icon:'pricetags-outline'});

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


const mockData = [
  { id: 'Rent', name: 'Rent' },
  { id: 'Food and restaurants', name: 'Food and restaurants' },
  { id: 'Online and Offline Shopping', name: 'Online and Offline Shopping' },
  { id: 'Groceries', name: 'Groceries' },
  { id: 'Insurance and loan', name: 'Insurance and loan' },
  { id: 'Recharge and bills', name: 'Recharge and bills' },
  { id: 'Movies and entertainment', name: 'Movies and entertainment' },
  { id: 'Traveling', name: 'Traveling' },
  { id: 'Fuel', name: 'Fuel' },
  { id: 'Medical and Healthcare', name: 'Medical and Healthcare' },
  { id: 'Education', name: 'Education' },
  { id: 'Snacks and drinks', name: 'Snacks and drinks' },
  { id: 'Investment', name: 'Investment' },
  { id: 'Personal expenses', name: 'Personal expenses' },
  { id: 'Others', name: 'Others' }
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
    
    <Swipeout style={{backgroundColor:'none'}} 
    autoClose={true}>

    <TouchableHighlight
     style={{marginVertical:10}}
      underlayColor='#DDDDDD'
      activeOpacity={0.6}
      key={expences.id}


      onLongPress={()=>{ 
        if(this.props.editable){
          console.log("am:"+expences.amount)
          optionsSelect(expences)

        }
      }}

      >
            <View style={style.block} >

                    <View>
                            
             <Ionicons 
             name={expences.icon}
             size={42} 
             containerStyle={{marginLeft:0}}
             style={{color:"#109a7d",marginLeft:3,marginTop:7.5}}
             onPress={()=>
              {if(this.props.editable!=false){
                let temp =expences.category;
                let temp2 = expences.icon;
                this.setState({selectedValue:temp,icon:temp2})
               this.csetModalVisible()
              }
              }}
              />

                                


                    </View>
                    
                    <View style={style.expData}>

                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={expences.desc.length<10? style.desc: style.smallDesc}>{expences.desc}</Text>
                                    
                                <View style={{flexDirection:'row'}}>
                                <Icon name='currency-inr' size={expences.amount.length>5?22:32}
                                style={expences.amount.length>5?{
                                    marginTop:3,
                                    flexDirection:'column'
                                }:{flexDirection:'column'}}
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

                 <Modal animationType = {"slide"} transparent = {true}
                    visible = {this.state.categoryModal}
                    onDismiss = {() => this.csetModalVisible() }
                    onRequestClose = {() => this.csetModalVisible() }>
                    <View style = {style.modal}>
                      <View style={{justifyContent:'center',paddingVertical:25, marginLeft:-50}}>
                      <View>
                    
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
                />
                    </View>
                    <View
                    style={{
                      marginLeft:10,
                      alignItems: 'center',
                      justifyContent:'space-around',
                      flexDirection: 'row',
                    }}>
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

       },
    desc:{
        fontSize:23
    },
    smallDesc:{
      fontSize:20,
      marginBottom:7,
    },
    from:{
        fontWeight:'bold',
    },
    block:{
        flexDirection:'row',
        padding:15,
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
      
    },
    formItem: {
        justifyContent:'center',
        alignItems: 'center',
      justifyContent: 'center',
      
    },
    nullErr:{
        borderColor:'red',
        borderBottomWidth: 1.5,
        borderTopWidth:1.5,
    },
    modal: {
      width:'85%',
      height:'25%',
      alignContent:'flex-start',
      alignSelf:'center',
      justifyContent: 'flex-start',
      marginTop: '75%',
      backgroundColor:'#fff',
      alignItems:'center'
   },


});