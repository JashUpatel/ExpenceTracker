import React, { Component } from 'react';
import { ScrollView,SafeAreaView, View,Picker, Text, StyleSheet,TouchableHighlight,TouchableOpacity, Icon } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';

import NumberFormat from 'react-number-format';

// adding date time lib
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

// select lib

// import Select from 'react-select'; //maybe for react only
// import CustomMultiPicker from "react-native-multiple-select-list";
// import SelectBox from 'react-native-multi-selectbox'
import SelectPicker from 'react-native-form-select-picker'; // Import the package
// import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
// import DropDown, {
//     Select,
//     Option,
//     OptionList,
//   } from 'react-native-selectme';
import Select2 from 'react-native-select-two';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;



// var Expencess=['req','res'];
class AddExpence extends Component{
   
    constructor(props){
        super(props);
        
        this.state={
            nullAmount:0,
            nullDesc:0,
            errShare:0,
            nullCategory:0,
            selectedValue:'Pick a Category',
            Expences:[
                {
                    date:"07/03/2021",
                    amount:'50',
                    desc:'Lunch',
                    paidBy:"You",
                    splitWith:"None",
                    share:"N/A"
                },
            ],
            day:'',
            date: today,
            amount:'',
            desc:'',
            paidBy:"You",
            splitWith:"None",
            share:"N/A",
            mode: 'date',
            show:true,
            category:'',
            icon:''

        }
        
        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

       
    }


    _canada(province) {

        this.setState({
            ...this.state,
            canada: province
          });
        }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
      }

    resetForm(){
        this.setState({
            date:today,
            amount:"",
            desc:"",
            paidBy:"You",
            splitWith:"None",
            share:"N/A",
            mode: 'date',
            show:true,
        }
        )

    }

     addCommas(num) {
        let dec = num.split('.')[0]

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

    validateAmount(value){
        this.setState({nullAmount:0})

          

      
        // this.setState({amount:value})

        // if(value.length>3){
        // //    let carr = value.split(',')
        // //    var n =''
        // //    for(var i=0;i<carr.length;i++){
        // //         n =n+carr[i] 
        // //    }
        // //  let l = n.length;
        // //     let temp = n.slice(0,l-3)+','+ n.slice(-(l-1),l);
        // //     this.setState({amount:temp})
        // let carr = value.split(',')
        // let x = carr[0].length;
        //    var n =''
        //    for(var i=0;i<carr.length;i++){
        //         n =n+carr[i] 
        //    }
        //  let l = n.length;
        //     let temp = n.slice(0,l-3)+','+ n.slice(-(l-x-1),l);
        //     this.setState({amount:temp})
       
        // }
        // else{
        //     this.setState({amount:value})

        // }
        
        if(value!='.' && value!='0' && value.split('.').length==2){
            if(value.split('.')[1].length<3){

                

                let dec = value.split('.')[0]
                let dec2 = dec.replace(/,/g, "");

            // let temp = Number(value.toFixed(0)).toLocaleString().split(/\s/).join(',') + '.' + Number(value.toString().slice(value.toString().indexOf('.')+1)).toLocaleString()
            let temp=this.addCommas(dec2) +'.' +value.split('.')[1]
                //  let temp = Number(value).toLocaleString()
                this.setState({amount:temp})

            }

        }
        else if(value!='.' && value!='0' && value.split('.').length<2 ){

            if(value.split('.')[0].length<9){
            // let temp = value.slice()
            // let result = Number(value.toFixed(0)).toLocaleString().split(/\s/).join(',') + '.' + Number(value.toString().slice(value.toString().indexOf('.')+1)).toLocaleString()
            // let temp=value.toString().replace( /\B(?=(?:\d{3})+)$/g, "," );
            
            // let dec = value.split('.')[0]
            let dec2 = value.replace(/,/g, "");
            
            let temp=this.addCommas(dec2)            
            // let temp=value.toString().replace(/\B(?=(?:\d{3})+)$/g, ",");
            
            //  let temp = Number(value).toLocaleString()
            this.setState({amount:temp})
            }
        }
    
        
        // var flag=[];

        // if(this.state.amount !=''){
        //     if(this.state.amount.slice(0,1)!='.'){

        //     if(this.state.amount.split('.').length<3){

        //         let amnt = Math.round((this.state.amount + Number.EPSILON) * 100) / 100;
        //         this.setState({amount:amnt})

        //     }
        //     else{
        //         flag.push('amount');
        //     }
                
        //     }else{
        //         flag.push('amount');

        //     }

        // }else{
        //     flag.push('amount');

        // }

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

    validateDesc(value){
        this.setState({desc:value,nullDesc:0});
        var foodArr = ["food", "breakfast", "lunch", "dinner","zomato","swiggy","pizza","burger","tiffin", "restaurants"];
        var food = foodArr.findIndex(item => value.toLowerCase() == item.toLowerCase())
        var clothArr = ["shirt","t-shirt","jeans","wear","shoe","shop"];
        var cloth = clothArr.findIndex(item => value.toLowerCase() == item.toLowerCase())
        var billArr = ["bill", "credit", "card", "electricity", "electricity bill","water bill", "recharge", "gas"];
        var bill = billArr.findIndex(item => value.toLowerCase() == item.toLowerCase())
        var snacksArr = ["snacks", "tea", "coffee", "wafer","frooti","juice","soda","cupcake"];
        var snacks = snacksArr.findIndex(item => value.toLowerCase() == item.toLowerCase())
        
        if(value.toLowerCase().includes("rent")){
            this.setState({selectedValue:"Rent",category:"Rent",nullCategory:0,icon:'home-outline'});
        }
        else if(food!=-1){
            this.setState({selectedValue:"Food and restaurants",category:"Food and restaurants",icon:'fast-food-outline',nullCategory:0});
            
        }
        else if(cloth!=-1){
            this.setState({selectedValue:"Online and Offline Shopping",category:"Online and Offline Shopping",icon:'pricetags-outline',nullCategory:0});
            
        }
        else if(value.toLowerCase().includes("dmart")||value.toLowerCase().includes("mall")){
            this.setState({selectedValue:"Groceries",category:"Groceries",icon:'cart-outline',nullCategory:0});

        }
        else if(value.toLowerCase().includes("lic") || value.toLowerCase().includes("emi")){
            this.setState({selectedValue:"Insurance and loan",category:"Insurance and loan",icon:'shield-outline',nullCategory:0});

        }
        else if(bill!=-1 || value.toLowerCase().includes("recharge") || value.toLowerCase().includes("bill")){
            this.setState({selectedValue:"Recharge and bills",category:"Recharge and bills",icon:'receipt-outline',nullCategory:0});
        
        }
        else if(value.toLowerCase().includes("movie")){
            this.setState({selectedValue:"Movies and entertainment",category:"Movies and entertainment",icon:'film-outline',nullCategory:0});

        }
        else if(value.toLowerCase().includes("ticket") || value.toLowerCase().includes("uber") || value.toLowerCase().includes("auto") || value.toLowerCase().includes("ola")){
            this.setState({selectedValue:"Traveling",category:"Traveling",icon:'subway-outline',nullCategory:0});

        }
        else if(value.toLowerCase().includes("fuel") || value.toLowerCase().includes("petrol") || value.toLowerCase().includes("deisel")){
            this.setState({selectedValue:"Fuel",category:"Fuel",icon:'flame-outline',nullCategory:0});

        }
        else if(value.toLowerCase().includes("medicine") || value.toLowerCase().includes("medical") || value.toLowerCase().includes("doctor")){
            this.setState({selectedValue:"Medical and Healthcare",category:"Medical and Healthcare",icon:'medkit-outline',nullCategory:0});

        }
        else if(value.toLowerCase().includes("fee")){
            this.setState({selectedValue:"Education",category:"Education",icon:'school-outline',nullCategory:0});

        }
        else if(snacks!=-1){
            this.setState({selectedValue:"Snacks and drinks",category:"Snacks and drinks",icon:'wine-outline',nullCategory:0});
            
        }
        else if(value.toLowerCase().includes("invest") || value.toLowerCase().includes("stock") || value.toLowerCase().includes("gold")){
            this.setState({selectedValue:"Investment",category:"Investment",icon:'golf-outline',nullCategory:0});

        }
        else{
            this.setState({selectedValue:"Pick a Category",category:'',icon:''});

        }
    }

    validatePaidBy(value){
        if(value.length>0){
        var letters = /^[A-Za-z ]+$/;
    if(value.match(letters))
     {
      this.setState({paidBy:value})
     }
    }
    else{
      this.setState({paidBy:value})

    }

    }
    validateSplitwith(value){
        if(value.length>0){
        var letters = /^[A-Za-z ,]+$/;
    if(value.match(letters))
     {
        this.setState({splitWith:value});
        if(value=='None' || value==''){
            this.setState({share:'N/A'})   
        }else{
        this.setState({share:'Equally'})
            }
    //   this.setState({paidBy:value})
     }
    }
    else{
    //   this.setState({paidBy:value})
    this.setState({splitWith:value});
    // if(this.state.splitWith=='None'){
    // this.setState({share:'N/A'})   
    // }else{
    this.setState({share:'Equally'})


    }
    }

    validateShare(value){
        if(value.length>0){
        var letters = /^[0-9,]+$/;
    if(value.match(letters))
     {
        this.setState({share:value})
     }
    }
    else{
        this.setState({share:value})

    }
}



    onSubmit(){
        // console.log("err status1 "+ this.state.errShare)

        if(this.state.amount=='' && this.state.desc==''){
            this.setState({nullAmount:1})
            this.setState({nullDesc:1})
            // this.setState({errShare:1})


        }
        else if(this.state.amount=='' || parseInt(this.state.amount)==0 ){
            this.setState({nullAmount:1})
        }
        else if(this.state.desc==''){
            this.setState({nullDesc:1})
            // console.log("des status1 "+ this.state.nullDesc)

        }
        else if(this.state.category==''){
            this.setState({nullCategory:1})
            // nullCategory
        }
        else if(this.state.share!="Equally" && this.state.share!="N/A" && (this.state.splitWith.split(",").length != this.state.share.split(",").length)){
            //    console.log("set errShare else if last")    
            // this.setState({errShare:1})
            // if(this.state.share!="Equally" && this.state.share!="N/A"){
                this.setState({errShare:1})

            // }

        //     console.log("errr share chaneg to 1" + this.state.errShare)
        // console.log("err status1.5 "+ this.state.errShare)
           
            // this.setState({errShare:1});
        }
        // else if(shareAmount>parseInt(this.state.amount)){
        //     this.setState({errShare:1})

        // }
        else{
            this.setState({nullDesc:0})
            this.setState({nullAmount:0})
            // this.setState({errShare:0})

            // console.log("err status2 "+ this.state.errShare)


        if(this.state.paidBy.slice(0,3)=="You" && this.state.splitWith=="None"){
            
          
            let newExpence = {
                id:Date.now(),
                date:this.state.date,
                amount:this.state.amount.replace(/,/g,""),
                desc:this.state.desc,
                category:this.state.category,
                icon:this.state.icon,
                paidBy:this.state.paidBy,
                splitWith:this.state.splitWith,
                share:this.state.share,
                status:"Paid"
            }

        this.props.addFunc(newExpence);
        
        this.resetForm();
        this.props.modalFlag(false);
        // after nnot getting sol not to close module
        // this.resetForm();
        // this.props.modalFlag();

    
        }
        else if(this.state.paidBy!="You"){

            if(this.state.splitWith=="None"){
           
                let newPayable = {
                    id:Date.now(),
                    date:this.state.date,
                    amount:this.state.amount.replace(/,/g,""),
                    desc:this.state.desc,
                    category:this.state.category,
                    icon:this.state.icon,
                    paidBy:this.state.paidBy,
                    splitWith:this.state.splitWith,
                    share:this.state.share,
                    status:"Unpaid"
                }
    
            this.props.addFunc(newPayable);

            this.resetForm();
            this.props.modalFlag(false);
            // after nnot getting sol not to close module
            // this.props.expences.push(newPayable);

            
            }
            else{
           

                let splitArr = this.state.splitWith.split(",");
                let payAmount = Math.round(((Number(this.state.amount.replace(/,/g,""))/(splitArr.length+1)) + Number.EPSILON) * 100) / 100;
                let newExpence = {
                    id:Date.now(),
                    date:this.state.date,
                    amount:payAmount,
                    desc:this.state.desc,
                    category:this.state.category,
                    icon:this.state.icon,
                    paidBy:this.state.paidBy,
                    splitWith:this.state.splitWith,
                    share:this.state.share,
                    status:"Unpaid"
                }
    
            this.props.addFunc(newExpence);
            
        this.resetForm();
        this.props.modalFlag(false);
        // after nnot getting sol not to close module

            // this.props.expences.push(newExpence);

            }

           
        // this.resetForm();
        // this.props.modalFlag();

        }
        else if(this.state.paidBy=="You" && this.state.splitWith!="None"){
            
            // console.log("1");
        // console.log("err status3 "+ this.state.errShare)
         
            if(this.state.share=="Equally"){
                // this.setState({errShare:2})
        
            let splitArr = this.state.splitWith.split(",");
                let payAmount = Math.round(((this.state.amount.replace(/,/g,"")/(splitArr.length+1)) + Number.EPSILON) * 100) / 100;
               let Id = String(Date.now())
                let newExpence = {
                    id:Date.now(),
                    date:this.state.date,
                    amount:payAmount,
                    desc:this.state.desc,
                    category:this.state.category,
                    icon:this.state.icon,
                    paidBy:this.state.paidBy,
                    splitWith:"None",
                    share:this.state.share,
                    status:"Paid"
                }
                splitArr.forEach( name => {

                    let newReceiveable = {
                    id:Date.now(),
                        date:this.state.date,
                        amount:payAmount,
                        desc:this.state.desc,
                        category:this.state.category,
                        icon:this.state.icon,
                        paidBy:this.state.paidBy+" for "+name,
                        splitWith:name,
                        share:this.state.share,
                        status:"Unpaid"
                    }

            this.props.addFunc(newReceiveable);
            this.setState({errShare:0})
            // console.log("err status4 "+ this.state.errShare)

                // this.props.expences.push(newReceiveable);
                    
                });
                
    
            this.props.addFunc(newExpence);
            
        this.resetForm();
        this.props.modalFlag(false);
        // after nnot getting sol not to close module

            }
            else {
                // this.setState({errShare:0})
                // console.log("else");
                // console.log("err status5 "+ this.state.errShare)

                var splitArr = this.state.splitWith.split(",");
                var payAmountArr = this.state.share.split(",");
                var shareAmount = 0;
                for (var i = 0; i < payAmountArr.length; i++) {
                    shareAmount =  parseInt(shareAmount) + parseInt(payAmountArr[i])
                  }

            //     if(splitArr.length != payAmountArr.length){
                   
            // this.setState({errShare:1})
            // // this.setState({errShare:1});
            //     }
                if(shareAmount>parseInt(this.state.amount.replace(/,/g,""))){
                    // console.log("share > amount errShare 1" + this.state.errShare)
                    // console.log("err status6 "+ this.state.nullDesc)

            // this.setState({errShare:1});
            // this.setState({errShare:1});
            this.setState({errShare:1})

                    // console.log(this.state.nullDesc)
                    // this.setState({share:shareAmount})


                }

                else if(splitArr.length==payAmountArr.length){
                    // console.log("lenght amount errShare 0")
                    // console.log("err status7 "+ this.state.errShare)

                    var yourShare = parseInt(this.state.amount.replace(/,/g,"")) - parseInt(shareAmount)

                
                let newExpence = {
                    id:Date.now(),
                    date:this.state.date,
                    amount:yourShare,
                    desc:this.state.desc,
                    category:this.state.category,
                    icon:this.state.icon,
                    paidBy:this.state.paidBy,
                    splitWith:"None",
                    share:this.state.share,
                    status:"Paid"
                }

            //     splitArr.forEach( name => {

            //         let newReceiveable = {
            //             date:this.state.date,
            //             amount:payAmount,
            //             desc:this.state.desc,
            //             paidBy:this.state.paidBy+" for "+name,
            //             splitWith:name,
            //             share:this.state.share,
            //             status:"Unpaid"
            //         }

            // this.props.addFunc(newReceiveable);

            //     // this.props.expences.push(newReceiveable);
                    
            //     });

                for(let i=0;i<splitArr.length;i++){

                    let newReceiveable = {
                    id:Date.now(),
                        date:this.state.date,
                        amount:payAmountArr[i],
                        desc:this.state.desc,
                        category:this.state.category,
                        icon:this.state.icon,
                        paidBy:this.state.paidBy+" for "+splitArr[i],
                        splitWith:splitArr[i],
                        share:this.state.share,
                        status:"Unpaid"
                    }

            this.props.addFunc(newReceiveable);
                }
                
                if(newExpence.amount>0){
            this.props.addFunc(newExpence);
                }
            
        this.resetForm();
        this.props.modalFlag(false);
        // after nnot getting sol not to close module
            this.setState({errShare:0})
        // console.log("err status8 "+ this.state.errShare)

            // console.log("errShare 0 last")
            // console.log("err status9 "+ this.state.errShare)

            

            }
        }
            // this.props.expences.push(newExpence);

            }
        
        

        // var newExpence = {
        //     date:this.state.date,
        //     amount:this.state.amount,
        //     desc:this.state.desc,
        //     paidBy:this.state.paidBy,
        //     splitWith:this.state.splitWith,
        //     share:this.state.share
        // }

        // // this.state.Expences.push(newExpence);
        // // this.props.addExpence(newExpence);


        // this.props.expences.push(newExpence);
        // console.log("err status10.-1 "+ this.state.errShare)
        
        // if(this.state.errShare!=0){
        //     console.log("mod close")
        // console.log("err status10 "+ this.state.nullDesc)

        // }




      }
    }
    

    //  onChange(event, selectedDate){
    //     const currentDate = new Date(selectedDate);
    //     this.setState({date:currentDate});
    //   };

    render(){

        // const [v, setV] = useState({value: '', label: 'Select anything'});
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
        // const options = ["Apple", "Banana", "Orange"];
        // const sports = [
        //     {
        //       label: 'Football',
        //       value: 'football',
        //     },
        //     {
        //       label: 'Baseball',
        //       value: 'baseball',
        //     },
        //     {
        //       label: 'Hockey',
        //       value: 'hockey',
        //     },
        //   ];
          
        //   const placeholder = {
        //     label: 'Select Category',
        //     value: null,
        //     color: '#9EA0A4',
        //   };
        // const data = this.props.expences;
        // data.forEach(element => {
        //     this.state.Expences.push(element);
            
        // });
        // this.setState({Expences:data})
        return(
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.formRow}>
                    <Text style={{color:'#109a7d',fontWeight:'bold',fontSize:21.5,marginTop:-25,marginBottom:5,borderBottomWidth:1.75,borderColor:'#109a7d'}}>  Add Your Expence  </Text>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} onPress={() => this.setState({ show: true, mode: 'date' })}>-   Date :</Text>
                    <DatePicker
                    androidVariant="nativeAndroid"
                    dividerHeight='1'
                            
                            style={[styles.formItem,{fontWeight:'bold'}]}
                        date={this.state.date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01/01/2016"
                        maxDate={today}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            display: 'none',
                            // color:'#109a7d'
                            },
                            dateInput: {
                                borderRightWidth: 0,
                                borderLeftWidth: 0,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            marginLeft: -56,                         
                            color:"white",
                            },
                            // placeholderText: {
                            //     fontSize: 20,
                            //     color: "#C7C7C7"
                            //   },
                              dateText: {
                                  fontWeight:'bold',
                                fontSize: 18.5,
                                color: "#109a7d",
                                borderBottomWidth:1,
                                borderColor:'#109a7d'
                                // textAlign: "left"
                              }
                        }}
                        onDateChange={(date) => {
                            this.setState({date:date});
                        }}
                        />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>-    Amount :</Text>
                    {/* <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={123456789}/> */}
                    {/* <NumberFormat
      value={this.state.amount}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'₹'}
      renderText={formattedValue => <Text>{formattedValue}</Text>} // <--- Don't forget this!
    /> */}
 


{/* <NumberFormat customInput={TextInput} hintText="Some placeholder" value={this.state.amount} thousandSeparator={true} prefix={'$'} renderText={formattedValue => <Text>{formattedValue}</Text>} /> */}
           
                    <TextInput  style={this.state.nullAmount==0?[styles.formItem,{fontWeight:'bold',marginLeft:-75, borderBottomWidth:1.5,borderColor:'#109a7d'}]:[styles.formItem,{fontWeight:'bold',marginLeft:-75},styles.nullErr]} value={this.state.amount} onChangeText={(value)=>this.validateAmount(value)} placeholder='   0.00' maxLength={9}  keyboardType='decimal-pad' />
                   
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>-    Description :</Text>
                    <TextInput style={this.state.nullDesc==0?[styles.formItem,{marginLeft:-75, borderBottomWidth:1.5,borderColor:'#109a7d'}]:[styles.formItem,{marginLeft:-75},styles.nullErr]} value={this.state.desc} onChangeText={(value)=>this.validateDesc(value)} placeholder='  Note' maxLength={15} />
                </View>
                {/* <View style={styles.formRow}>
                    
                    <Text style={styles.formLabel}>Category</Text> */}
                    {/* <Select2
                    isSelectSingle
                    style={{ borderRadius: 5 }}
                    colorTheme={'green'}
                    popupTitle='Select item'
                    title='Select item'
                    data={mockData}
                    onSelect={data => {
                        this.setState({ selectedValue :data });
                    }}
                    onRemoveItem={data => {
                        this.setState({ selectedValue:data });
                    }} 
                    cancelButtonText={'Cancel'}
                    selectButtonText ={'Select'}
                    // popupTitle={"Pick category"}
                    // placeholder={"place"}
                /> */}
      {/* <SelectPicker
				onValueChange={(value) => {
					// Do anything you want with the value. 
					// For example, save in state.
					this.setState({
						selectedValue: value
					})
				}}
                selected={this.state.selectedValue}
                // disabled={'false'}
                dismissable	={'false'}
                placeholder={'placeholder'}
                placeholderStyle={{fontSize: 15, color:'#757575'}}
                onSelectedStyle={{fontSize: 16, color:'#252525'}}
                style={{padding:10}}
                containerStyle={{backgroundColor:'#FFFFFF'}}
                doneButtonText={'done'}
                doneButtonTextStyle={{textAlign:'center',color: '#1976D2',fontWeight: '600',fontSize:16}}
                maxHeight={500}
                searchable={true}
                >

				
				<SelectPicker.Item label="Rent" value="Rent" />	
				<SelectPicker.Item label="Food" value="Food" />	
				<SelectPicker.Item label="Clothing" value="Clothing" />
                <SelectPicker.Item label="Online/Offline Shopping" value="Online/Offline Shopping" />	
				<SelectPicker.Item label="Groceries" value="Groceries" />	
				<SelectPicker.Item label="Insurance/loan" value="Insurance/loan" />
                <SelectPicker.Item label="Recharge and bills" value="Recharge and bills" />	
				<SelectPicker.Item label="Movies and entertainment" value="Movies and entertainment" />	
				<SelectPicker.Item label="Traveling" value="Traveling" />
                <SelectPicker.Item label="Fuel" value="Fuel" />	
				<SelectPicker.Item label="Occasions" value="Occasions" />	
				<SelectPicker.Item label="Medical and Healthcare" value="Medical and Healthcare" />
                <SelectPicker.Item label="Education" value="Education" />	
				<SelectPicker.Item label="Donation" value="Donation" />	
				<SelectPicker.Item label="Snacks and drinks" value="Snacks and drinks" />
                <SelectPicker.Item label="Investment" value="Investment" />	
				<SelectPicker.Item label="Products and repairs" value="Products and repairs" />	
				<SelectPicker.Item label="Personal expenses" value="Personal expenses" />	
				<SelectPicker.Item label="Others" value="Others" />	
                
			</SelectPicker>

                    {/* <CustomMultiPicker
                            options={userList}
                            search={true} // should show search bar?
                            multiple={false} //
                            placeholder={"Search"}
                            placeholderTextColor={'#757575'}
                            returnValue={"label"} // label or value
                            callback={(res)=>{ console.log(res) }} // callback, array of selected items
                            rowBackgroundColor={"#eee"}
                            rowHeight={50}
                            rowRadius={5}
                            searchIconName="ios-checkmark"
                            searchIconColor="red"
                            searchIconSize={30}
                            iconColor={"#00a2dd"}
                            iconSize={30}
                            selectedIconName={"ios-checkmark-circle-outline"}
                            unselectedIconName={"ios-radio-button-off-outline"}
                            scrollViewHeight={300}
                            selected={["Tom", "Christin"]} // list of options which are selected by default
                            /> */}
                    {/* <Select options={options} value={this.state.v} onChange={(value) => this.setState({v:value})} /> */}
                    
                    {/* <TextInput style={this.state.nullDesc==0?styles.formItem:[styles.formItem,styles.nullErr]} value={this.state.desc} onChangeText={(value)=>this.setState({desc:value,nullDesc:0})} placeholder='Note' maxLength={15} /> */}
                {/* </View> */}



{/* Select picker decided final */}
                <View style={styles.formRow}>
                    
                    <Text style={styles.formLabel}>-    Category :</Text>
                    <Select2
                    isSelectSingle
                    style={this.state.nullCategory==0?{ borderRadius: 5, width:'50 %', }:[styles.nullErr,{ borderRadius: 5, width:'50 %'}]}
                    colorTheme={'#109a7d'}
                    popupTitle='Select Category'
                    title={this.state.selectedValue}
                    data={mockData}
                    value={this.state.selectedValue}
                    onSelect={data => {
                        if(data!=''){
                        this.setState({ selectedValue :data,category:data,nullCategory:0 });
                        this.selectIcon(data);

                        }
                        else{
                        this.setState({ selectedValue :'Pick a Category',category:'' });


                        }
                    }}
                    onRemoveItem={data => {
                        this.setState({ selectedValue:data,category:data });
                        this.selectIcon(data);

                    }} 
                    cancelButtonText={'Cancel'}
                    selectButtonText ={'Select'}
                    searchPlaceHolderText='Search Category'
                    listEmptyTitle='Category not found!'
                    // popupTitle={"Pick category"}
                    // placeholder={"place"}
                />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>-    Paid by :</Text>
                    <TextInput style={[styles.formItem,{borderBottomWidth:1.5,borderColor:'#109a7d',marginLeft:-50}]} value={this.state.paidBy} onFocus={()=>{if(this.state.paidBy=='You'){this.setState({paidBy:''})}}} onBlur={()=>{if(this.state.paidBy==''){this.setState({paidBy:'You'})}}} onChangeText={(value)=>this.validatePaidBy(value)} maxLength={12}/>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>-    Split with :</Text>
                    <TextInput style={[styles.formItem,{borderBottomWidth:1.5,borderColor:'#109a7d',marginLeft:-50}]} value={this.state.splitWith} onFocus={()=>{if(this.state.splitWith==''||this.state.splitWith=='None'){this.setState({splitWith:''})}}} onBlur={()=>{if(this.state.splitWith==''){this.setState({splitWith:'None',share:'N/A'})}}} onChangeText={(value)=>{this.validateSplitwith(value)}} maxLength={25} />
                </View>
                <View style={styles.formRow}>
        <Text style={styles.formLabel}>-    Share :</Text>
                    <TextInput style={this.state.errShare==0? [styles.formItem,{marginLeft:-50,borderBottomWidth:1.5,borderColor:'#109a7d'}]:[styles.formItem,{marginLeft:-50},styles.nullErr]} value={this.state.share} onFocus={()=>{if(this.state.share==''||this.state.share=='N/A'||this.state.share=='Equally'){this.setState({share:''})}}} onBlur={()=>{if(this.state.share==''){if(this.state.splitWith=='None'){this.setState({share:'N/A'})}else{this.setState({share:'Equally'})}}}} onChangeText={(value)=>{this.validateShare(value);this.setState({errShare:0})}} keyboardType="phone-pad" maxLength={20} editable={(this.state.paidBy=="You" && this.state.splitWith!="None")?true:false} />
                </View>


            
                <View styles={{alignItems:'center'}}>
                <TouchableHighlight elevation style={styles.button} underlayColor='#ebf5f0' activeOpacity={0.95} onPress={()=>this.onSubmit()}>
                <Text style={[styles.mainText,{color:'#109a7d'}]}>Save</Text>
                </TouchableHighlight>

                </View>
            


              </View>

            </ScrollView>
        )
    }
}

export default AddExpence;

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        width:'100%',
        justifyContent:"center",
        padding:20,
        marginTop:50,
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
        flex: 2,
        fontWeight:'bold',
        color:'#109a7d'
    },
    formItem: {
        flex: 1,
        fontSize:18,
        // fontWeight:'bold',
        justifyContent:'flex-end',
        color:'#19443c',
        
        
    },
    nullErr:{
        borderColor:'#ec3811',
        // borderWidth:1.5,
        borderBottomWidth: 1.75,
        marginTop:1.5
        // zIndex:-3
        // borderTopWidth:1.5,
        // borderRightWidth:1.5,
        // alignSelf:'center'
    },
    mainText:{
        fontSize: 18,
        color:'white',
        fontFamily:'monospace',
        fontWeight:'bold',
        marginVertical: 6,
      },
      button:{
        height:50,
        width:'65%',
        borderWidth:1.75,
        borderColor:'#109a7d',
        borderRadius:50,
        marginTop:35,
        padding:10,
        alignSelf:'center',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        color:'#fff'
    
      }
});