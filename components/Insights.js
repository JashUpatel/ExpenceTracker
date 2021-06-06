import React, {Component} from 'react';
import { Text,TextInput, View, StyleSheet, TouchableHighlight,TouchableOpacity, Button,Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddExpence from './AddExpence';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

class Insights extends Component{
    
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            data:[],
            incModalVisible:false,
            newIncome: '',
            tempEl:"",
          
        }

        this.incsetModalVisible=this.incsetModalVisible.bind(this);
        this.expenceFilter = this.expenceFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.monthlyTotal = this.monthlyTotal.bind(this);
        this.setIncome = this.setIncome.bind(this);

       }


       setIncome(){
        var e =  this.state.tempEl;
        e.income=this.state.newIncome;
        
        let incIndx = this.props.income.findIndex((el)=>(e.month==el.month));
              if(incIndx!=-1){
                this.props.income[incIndx].income=this.state.newIncome.replace(/,/g,"");
                
              }
              else{

                var tempInc = {
                  month:e.month,
                  income:this.state.newIncome.replace(/,/g,"")
                }

                this.props.income.push(tempInc);

              }
        this.setState({ incModalVisible: false,newIncome:""})
              

       }

      


      categoryFilter(expence){
        var categoryArr = []
        var categoryFilterExpence = []
        
        expence.forEach(el=>{
          console.log("pos: "+categoryArr.indexOf(String(el.category)))

         if(!categoryArr.includes(String(el.category))){
           if(categoryArr.indexOf(String(el.category))==-1){
           console.log("no:" + el.category +":"+ categoryArr);
      
           let newFormat={
             month:el.date.slice(3,10),
             category:el.category,
             total:el.amount,
             expences:[el]
           }
           categoryFilterExpence.push(newFormat)
           categoryArr.push(String(el.category))
         }
        }
         else{
          console.log("yes:"+ categoryArr);

           let indx = categoryFilterExpence.findIndex((e)=>(String(el.category)==String(e.category)));
          let tempSum = Number(categoryFilterExpence[indx].total)+Number(el.amount)
          categoryFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
          categoryFilterExpence[indx].expences.push(el)
         }    

        });
       
        return categoryFilterExpence;
      }







  
      monthlyTotal(monthlyFilterArr){
        var totalObj= monthlyFilterArr.filter(el=>(el.month==today.slice(3,10)))[0]
        var total = totalObj.total;
        this.setState({monthlyTotal:total});

      }

       monthlyFilter(expence){
         var monthArr = []
         var monthlyFilterExpence = []
         var incomeArr = this.props.income;
         
         expence.forEach(el=>{


              let incIndx = incomeArr.findIndex((e)=>(el.date.slice(3,10)==e.month));
              if(incIndx!=-1){
                var inc = incomeArr[incIndx].income;
                
              }
              else{
                var inc = "-";
              }
              
              if(isNaN(parseInt(inc)-parseInt(el.amount))){
                var sav ="-"
              }
              else{
                var sav = parseInt(inc)-parseInt(el.amount)

              }



          if(!monthArr.includes(el.date.slice(3,10))){
       
            let newFormat={
              month:el.date.slice(3,10),
              total:el.amount,
              income:inc,
              saving:sav,
              expences:[el]
            }
            monthlyFilterExpence.push(newFormat)
            monthArr.push(el.date.slice(3,10))
          }
          else{
            let indx = monthlyFilterExpence.findIndex((e)=>(el.date.slice(3,10)==e.month));
            let tempSum = Number(monthlyFilterExpence[indx].total)+Number(el.amount)
            monthlyFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
            
            let tempSav = Number(monthlyFilterExpence[indx].saving)-Number(el.amount)
            monthlyFilterExpence[indx].saving=Math.round((tempSav + Number.EPSILON) * 100) / 100
            
            monthlyFilterExpence[indx].expences.push(el)
          }    

         });
        
         return monthlyFilterExpence;
       }


       dateFilter(expence){
        var dateArr = []
        var dateFilterExpence = []
        var total=0
        expence.forEach(el=>{
         if(!dateArr.includes(el.date)){
           let newFormat={
             date:el.date,
             total:el.amount,
             expences:[el]
           }
           dateFilterExpence.push(newFormat)
           dateArr.push(el.date)
         }
         else{
           let indx = dateFilterExpence.findIndex((e)=>(el.date==e.date));
          let tempSum = Number(dateFilterExpence[indx].total)+Number(el.amount)
          dateFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
          dateFilterExpence[indx].expences.push(el)
         }    

        });

        return dateFilterExpence;
      }


       getMonthName(date){
         var dateArr = date.split('/');
         var dd = dateArr[0];
         var mm = dateArr[1];
         var yyyy = dateArr[2];
         var monthArr=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
      var d = new Date(mm+'/'+dd+'/'+yyyy);
      var month = d.getMonth();
      return monthArr[month];

       }


    distinctDateExpences(data){
    const map = new Map();
    for (const item of data) {
        if(!map.has(item.date)){
            map.set(item.date, [item]);    // set any value to Map
          }
        else{
          map.get(item.date).push(item);
        }
    }
    return map
    }

    expenceFilter(data){
    var expences=[];
      data.forEach(element => {
        if((element.paidBy.slice(0,3)=="You" && element.splitWith!='None' && element.status=="Unpaid")||(element.paidBy.slice(0,3)=="You" && element.splitWith=='None' && element.status=="Paid")){
          expences.push(element);
          
      }
    });
      return expences;
    }



// js date sorting comment
    sortByDate(a, b) {

      var arr1 = a.date.split('/');
      var arr2 = b.date.split('/');
      var d1 = arr1[1]+'/'+arr1[0]+'/'+arr1[2];
      var d2 = arr2[1]+'/'+arr2[0]+'/'+arr2[2];
      var x= new Date(d1); // js date format mmddyyyy
      var y = new Date(d2);
      if (x < y) {
          return 1;
      }
      if (x > y) {
          return -1;
      }
      return 0;
  }


    setModalVisible(){
        this.setState({modalVisible:!this.state.modalVisible});
    }

    incsetModalVisible(){
        this.setState({incModalVisible:!this.state.incModalVisible});
    }
    validateIncome(value){

      if(value!="." && value.replace(/,/g, "").length<8){
        
    if(value!='.' && value!='0' && value.split('.').length<2)
     {
      let dec2 = value.replace(/,/g, "");

      let temp=this.addCommas(dec2)

        this.setState({newIncome:temp})
     }
    }
    
    

    }



    monthlyTotal(monthlyFilterArr){
      var totalObjArr= monthlyFilterArr.filter(el=>(el.month==today.slice(3,10)))
      if(totalObjArr.length!=0){
        total=totalObjArr[0].total
      this.setState({monthlyTotal:total});

      }

    }


addCommas=(num) =>{
  
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
    

   
    render(){


    if(this.props.expences.length>0){
    var expences = this.expenceFilter(this.props.expences);
    expences.sort(this.sortByDate);
    
    var monthlyFilterArr = this.monthlyFilter(expences);



    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
      
    
        <View style={style.container}>

            




 
            

            {



                // display date wise exp

                monthlyFilterArr.map(el=>{
                  var categoryFilterData=this.categoryFilter(el.expences)
                  return(
                    <View>



{/* montly insight chart start */}


<TouchableHighlight style={style.month,{marginVertical:10,paddingHorizontal:35,paddingVertical:12,borderRadius:5,borderWidth:0.75,}}
    
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onLongPress={()=>this.setState({incModalVisible:true,tempEl:el})}
    onPress={() => {
      console.log(el.total+" Press "+el.income +" "+ el.saving);
      if(isNaN(el.income)){
        let elIncome = "-";
        var elSaving=""
        var elTotal=""
        
        if(isNaN(el.total))
        {
          elTotal="-";
        }
        else{
          elTotal=el.total;

        }
        if(isNaN(el.saving))
        {
          elSaving="-";
        }
        else{
          elSaving=el.saving;

        }
      console.log(elTotal+" Press "+elIncome +" "+ elSaving);
        
       this.props.onPress(categoryFilterData||[],elTotal||0,elIncome||0,elSaving||0)

      }
      else{
       this.props.onPress(categoryFilterData||[],el.total||0,el.income||0,el.saving||0)
      }
    }
      }
    >
                 <View>
                 <View style={{flex:1, alignSelf:'center'}}>
       <Text style={{flex:1,alignItems:'center',fontSize:21,fontWeight:'bold',marginBottom:9.5}}>{this.getMonthName('01/'+el.month)}, {el.month.split("/")[1]}</Text>
                 </View>
   


                 <View style={{flexDirection:'row',alignContent:'space-between'}}>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={{fontWeight:'800', fontSize:15}}>Expence: </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={{fontWeight:'800', fontSize:15}}>Income: </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={{fontWeight:'800', fontSize:15}}>Savings: </Text>
                 </View>
   
                 </View>
   
   {/*  2 row for insights digits */}
   
   
                 <View style={{flexDirection:'row',alignContent:'space-between', marginLeft:-15}}>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={
                   String(el.total).length>7?
                     
                     {fontWeight:'bold', fontSize:16, color:'#ec3811',marginLeft:-5}:
                     {fontWeight:'bold', fontSize:16, color:'#ec3811'}

                     
                     }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                   {
                   String(el.total).replace(/[-,]/g,"").length>6?
                   el.total.toString().split(".").length==2?this.addCommas(el.total.toString().split(".")[0]):this.addCommas(el.total.toString())
                   :
                   el.total.toString().split(".").length==2?this.addCommas(el.total.toString().split(".")[0])+"."+el.total.toString().split(".")[1]:this.addCommas(el.total.toString())
                   }
                   
                     </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1, alignItems:'center',backgroundColor: "" }]}
                 >
                   <Text style={el.income>=0?
                   String(el.income).length>7?
                   {fontWeight:'bold',fontSize:16,color:'#109a7d',marginLeft:-5}:{fontWeight:'bold',fontSize:16,color:'#109a7d'}:{fontWeight:'bold',fontSize:16}
                   }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                                {
                              String(el.income).length>6?
                                el.income.toString().split(".").length==2?this.addCommas(el.income.toString().split(".")[0]):this.addCommas(el.income.toString())
                                :
                                el.income.toString().split(".").length==2?this.addCommas(el.income.toString().split(".")[0])+"."+el.income.toString().split(".")[1]:this.addCommas(el.income.toString())
                                }
                                
                                 </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={
                   String(el.saving).replace(/[-,]/g,"").length>7?

                    el.saving<0?
                   {fontWeight:'bold',fontSize:16, color:'#ec3811',marginLeft:-5}:el.saving>=0?{fontWeight:'bold',fontSize:16, color:'#109a7d',marginLeft:-5}
                   :{fontWeight:'bold',fontSize:16,marginLeft:-5}
                   :
                    el.saving<0?
                   {fontWeight:'bold',fontSize:16, color:'#ec3811'}:el.saving>=0?{fontWeight:'bold',fontSize:16, color:'#109a7d'}
                   :{fontWeight:'bold',fontSize:16}
                   }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                     {isNaN(el.saving)?"-":
                    String(el.saving).length>8?
                    el.saving>=0?
                                el.saving.toString().split(".").length==2?this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,"")):this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                                :
                    
                                el.saving.toString().split(".").length==2?"-"+this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,"")):"-"+this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                    
                    :
                    el.saving>=0?
                                el.saving.toString().split(".").length==2?this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,""))+"."+el.saving.toString().split(".")[1]:this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                                :
                    
                                el.saving.toString().split(".").length==2?"-"+this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,""))+"."+el.saving.toString().split(".")[1]:"-"+this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                                
                     }   </Text>
                 </View>
   
                
                 </View>
                

               
               {/* spending insights */}


   
   {/*  2 row for insights digits */}
   
  
               </View>


               </TouchableHighlight>



{/* monthly insight chart end */}


            </View>
                  )
                })
                
                
            }

           
        </View>
        
                
    </ScrollView>
    


<Modal animationType = {"slide"} transparent = {true}
                    visible = {this.state.incModalVisible}
                    onDismiss = {() => this.incsetModalVisible() }
                    onRequestClose = {() => this.incsetModalVisible() }>
                    <View style = {[style.modal,{paddingVertical:15}]}>
                      <View style={{justifyContent:'center',paddingVertical:15}}>
                      <View>
                    <Text style={[style.formLabel,{ fontSize:21,fontWeight:'bold', color:"#109a7d", marginLeft:10,marginBottom:15}]} >Add Income : </Text>
                    <TextInput
                    style={{fontSize:21,fontWeight:'bold',borderBottomWidth:1,borderRadius:15,borderColor:'#109a7d',marginBottom:25,paddingVertical:7.5,paddingHorizontal:20}}
                      value={this.state.newIncome} onChangeText={(value)=>
                    
                      this.validateIncome(value)
                      } placeholder='$ 000' keyboardType="decimal-pad"  maxLength={9}/>
                    </View>
                    <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.75}
                             style={{borderWidth:1,borderRadius:50,borderColor:'#109a7d',paddingHorizontal:30,paddingVertical:7.5, }}
                            onPress = {() =>{this.incsetModalVisible();this.setState({newIncome:""})}}
                             
                             >
                              <Text style={{color:'#109a7d', fontWeight:'bold'}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            activeOpacity={0.75}
                             style={{borderWidth:1,borderRadius:50,backgroundColor:'#109a7d',borderColor:'#109a7d',paddingHorizontal:40,paddingVertical:7.5,marginLeft:15}}
                            onPress = {() =>{this.props.setIncome(this.state.tempEl,this.state.newIncome); this.setState({incModalVisible:false,newIncome:''})}}
                            disabled={this.state.newIncome==""?true:false}
                             
                             >
                              <Text style={{color:'#fff', fontWeight:'bold'}}>Save</Text>
                            </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                </Modal>




</View>
   
)
                            }else{
                              return(
                                <View style={{flex:1,marginBottom:18,alignItems:'center',justifyContent:'center'}}>
        <Text>No Record Found!</Text>
  
        
  
   
  </View>
                              )
                            }

}

};

export default Insights;

const style = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:20,
    },
    box: {
      width: 50,
      height: 25,
    },
    monthInsight:{
      flex:1,
      width:"100%",
      paddingHorizontal:35,
      paddingVertical:15,
      marginVertical:10,
      borderWidth:0.75,
      borderRadius:25,
      alignItems:'flex-start'
  
  },
  insightText:{
    flexDirection: "row",
    fontWeight:'bold',
    fontSize:15,
    textAlign:'justify',
    alignContent:'space-around',
    justifyContent:'space-between',
  },
    monthText:{
        fontWeight:'bold',
        fontSize:13.75,
        paddingHorizontal:50,
        paddingVertical:2.5,
        marginVertical:7.5,
        borderWidth:0.75,
        borderRadius:25,
    
    },
    total:{
      alignSelf:'flex-end'
    },
    month:{
      flex:1,
        justifyContent:'space-between',
        alignItems:"center",
    },
    date:{
        justifyContent:'flex-start'
    },
    dateText:{
        fontWeight:'bold',
        fontSize:15,
    },
    dateDigit:{
        fontSize:25,
    },
    digit:{
        fontFamily:'monospace',
        fontWeight:"bold",
    },
    add:{
        fontSize: 32,
        color:'white',
        fontFamily:'monospace',
        fontWeight:'bold',
      },
      button:{
        height:60,
        width:60,
        borderWidth:1,
        borderColor:'white',
        borderRadius:50,
        padding:0,
        alignSelf:'flex-end',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1cc29f'
      },
      modal: {
        width:'75%',
        height:'35%',
        alignContent:'center',
        alignSelf:'center',
        justifyContent: 'center',
         marginTop: '50%',
        backgroundColor:'#fff',
        alignItems:'center'
     },
     show:{
       display:'flex',
     },
     hide:{
       display:"none",
     },
     formRow: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       flexDirection: 'row',
       margin: 15
     },
     formLabel: {
     },
     formItem: {
         flex: 1,
         justifyContent:'flex-end'
     },

});