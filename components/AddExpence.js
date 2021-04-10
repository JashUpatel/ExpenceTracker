import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet,TouchableHighlight, Icon } from 'react-native';
import { TextInput,  } from 'react-native-gesture-handler';

// adding date time lib
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

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

        }
        
        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

       
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
        })

    }

    onSubmit(){


        if(this.state.paidBy=="You" && this.state.splitWith=="None"){
            
            let newExpence = {
                date:this.state.date,
                amount:this.state.amount,
                desc:this.state.desc,
                paidBy:this.state.paidBy,
                splitWith:this.state.splitWith,
                share:this.state.share,
                status:"Paid"
            }

        this.props.addFunc(newExpence);
        // this.resetForm();
        // this.props.modalFlag();

    
        }
        else if(this.state.paidBy!="You"){

            if(this.state.splitWith=="None"){

                let newPayable = {
                    date:this.state.date,
                    amount:this.state.amount,
                    desc:this.state.desc,
                    paidBy:this.state.paidBy,
                    splitWith:this.state.splitWith,
                    share:this.state.share,
                    status:"Unpaid"
                }
    
            this.props.addFunc(newPayable);

            // this.props.expences.push(newPayable);

            
            }
            else{

                let splitArr = this.state.splitWith.split(",");
                let payAmount = (this.state.amount/(splitArr.length+1));
                let newExpence = {
                    date:this.state.date,
                    amount:payAmount,
                    desc:this.state.desc,
                    paidBy:this.state.paidBy,
                    splitWith:this.state.splitWith,
                    share:this.state.share,
                    status:"Unpaid"
                }
    
            this.props.addFunc(newExpence);

            // this.props.expences.push(newExpence);

            }

           
        // this.resetForm();
        // this.props.modalFlag();

        }
        else if(this.state.paidBy=="You" && this.state.splitWith!="None"){

            let splitArr = this.state.splitWith.split(",");
                let payAmount = (this.state.amount/(splitArr.length+1));
                let newExpence = {
                    date:this.state.date,
                    amount:payAmount,
                    desc:this.state.desc,
                    paidBy:this.state.paidBy,
                    splitWith:"None",
                    share:this.state.share,
                    status:"Paid"
                }
                splitArr.forEach( name => {

                    let newReceiveable = {
                        date:this.state.date,
                        amount:payAmount,
                        desc:this.state.desc,
                        paidBy:this.state.paidBy,
                        splitWith:name,
                        share:this.state.share,
                        status:"Unpaid"
                    }

            this.props.addFunc(newReceiveable);

                // this.props.expences.push(newReceiveable);
                    
                });
                
    
            this.props.addFunc(newExpence);

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
        this.resetForm();
        this.props.modalFlag();




      }
    

    //  onChange(event, selectedDate){
    //     const currentDate = new Date(selectedDate);
    //     this.setState({date:currentDate});
    //   };

    render(){
        // const data = this.props.expences;
        // data.forEach(element => {
        //     this.state.Expences.push(element);
            
        // });
        // this.setState({Expences:data})
        return(
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel} onPress={() => this.setState({ show: true, mode: 'date' })}>Date</Text>
                    <DatePicker
                    androidVariant="nativeAndroid"
                    dividerHeight='1'
                        style={styles.formItem}
                        date={this.state.date} // Initial date from state
                        mode="date" // The enum of date, datetime and time
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01/01/2016"
                        maxDate="01/10/2021"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            display: 'none',
                            },
                            dateInput: {
                                borderRightWidth: 0,
                                borderLeftWidth: 0,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            marginLeft: -56,
                            color:"white"
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({date:date});
                        }}
                        />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Amount</Text>
                    <TextInput style={styles.formItem} value={this.state.amount} onChangeText={(value)=>this.setState({amount:value})} placeholder='$ 0.00' keyboardType="decimal-pad" />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Description</Text>
                    <TextInput style={styles.formItem} value={this.state.desc} onChangeText={(value)=>this.setState({desc:value})} placeholder='Note' />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Paid by</Text>
                    <TextInput style={styles.formItem} value={this.state.paidBy} onChangeText={(value)=>this.setState({paidBy:value})} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Split with</Text>
                    <TextInput style={styles.formItem} value={this.state.splitWith} onChangeText={(value)=>{this.setState({splitWith:value});this.setState({share:'Equally'})}} />
                </View>
                <View style={styles.formRow}>
        <Text style={styles.formLabel}>Share</Text>
                    <TextInput style={styles.formItem} value={this.state.share} onChangeText={(value)=>this.setState({share:value})} />
                </View>


            
            <View styles={{alignItems:'center'}}>
            <TouchableHighlight elevation style={styles.button} underlayColor='#137863' onPress={()=>this.onSubmit()}>
            <Text style={styles.mainText}>Save</Text>
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
      button:{
        height:50,
        width:'75%',
        borderWidth:1.75,
        borderColor:'white',
        borderRadius:50,
        marginTop:25,
        padding:10,
        alignSelf:'center',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1cc29f',
    
      }
});