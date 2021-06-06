import React, {Component} from 'react';
import { Text,TextInput, View, StyleSheet, TouchableHighlight,TouchableOpacity, Button,Modal,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddExpence from './AddExpence';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Expences Block
import ExpenceBlock from './ExpenceBlock';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

class Expences extends Component{
    
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            incModalVisible:false,
             newIncome: '',
             tempEl:"",
             refresh:false,
        }

        this.incsetModalVisible=this.incsetModalVisible.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
        this.addFunc=this.addFunc.bind(this);
        this.expenceFilter = this.expenceFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.monthlyTotal = this.monthlyTotal.bind(this);
        this.getMonthTotal = this.getMonthTotal.bind(this);
        this.getDayTotal= this.getDayTotal.bind(this);
        this.setIncome = this.setIncome.bind(this);
        this.delete = this.delete.bind(this);
        this.swipe = this.swipe.bind(this);
        this.update = this.update.bind(this);

       }

       componentDidMount(){
        console.log("did mount exp" + Date.now())
       }




      
    update(expence){
      var arr = this.props.expences;

      for( var i = 0; i < arr.length; i++)
        {
          if ( arr[i].status==expence.status && arr[i].date == expence.date && arr[i].desc == expence.desc && arr[i].amount == expence.amount && arr[i].paidBy == expence.paidBy && arr[i].splitWith == expence.splitWith)
           {
            var exp = arr[i]
           }
         }

      if(exp.status==expence.status && exp.date==expence.date && exp.amount==expence.amount && exp.desc==expence.desc && exp.paidBy==expence.paidBy && exp.splitWith==expence.splitWith){
        if(expence.status=="Unpaid" ){
        exp.status="Paid";
        let temp = exp.paidBy.slice(0,3)
        exp.paidBy=temp;


        Alert.alert(
          'Expence Paid',
                    'This Expence has been Paid successfully.',
                    [
                        {
                            text: 'Okay',
                            onPress: ()=>console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        
    
                    ],
    
                    )
                    this.props.reRender();

      }

      else{

        Alert.alert(
          'Expence already Paid',
                    'This Expence has already been Paid.',
                    [
                        {
                            text: 'Okay',
                            onPress: ()=>console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        
    
                    ],
    
                    )

      }

    }
  }


  swipe(expence){
      Alert.alert(
        'Update Status',
                  'Are you sure you wish to change status of this Expence ?',
                  [
                      {
                          text: 'Cancel',
                          onPress: ()=>console.log('Cancel Pressed'),
                          style: 'cancel'
                      },
                      {
                          text:'Update',
                          onPress:()=>{
                            
                            this.update(expence)
                            this.setState({refresh:!this.state.refresh});
                         
                          }
                      }
  
                  ],
  
                  )
  
  
      }


      delete(expence){
        Alert.alert(
          'Delete Expence',
                    'Are you sure you wish to delete this Expence ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: ()=>console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        {
                            text:'Delete',
                            onPress:()=>{
                              this.props.remove(expence)
                              this.setState({refresh:!this.state.refresh});
    
                            }
                        }
    
                    ],
    
                    )
    
    
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


       setIncome(){
        var e =  this.state.tempEl;
        e.income=this.state.newIncome;
        
        let incIndx = this.props.income.findIndex((el)=>(e.month==el.month));
              if(incIndx!=-1){
                if(this.state.newIncome!=""){
                  console.log("if: newInc" + this.state.newIncome)

                this.props.income[incIndx].income=this.state.newIncome.replace(/,/g,"");
                }
              }
              else{
                if(this.state.newIncome!=""){
                  console.log("else: newInc" + this.state.newIncome)

                var tempInc = {
                  month:e.month,
                  income:this.state.newIncome.replace(/,/g,"")
                }

                this.props.income.push(tempInc);
              }

              }
        this.setState({ incModalVisible: false,newIncome:''})
              

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


      
       getDayName(date){

        var WeekArr=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var dateArr = date.split('/');
         var dd = dateArr[0];
         var mm = dateArr[1];
         var yyyy = dateArr[2];
         var d = new Date(mm+'/'+dd+'/'+yyyy);
        
         var week = d.getDay();
      return WeekArr[week];

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


    addFunc(newExpence){


        this.props.add(newExpence);
        this.setState({refresh:!this.state.refresh})
        
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



    setModalVisible(value){
      this.setState({modalVisible:value});
    }

    incsetModalVisible(value){
      this.setState({incModalVisible:value});
  }

    getMonthTotal(mArr,dt){


      var mTotal = mArr.forEach(el=>{
        if(el.month==dt.slice(3,10)){
          mTotal=el.total;
          this.setState({monthlyTotal:mTotal})
        }
      })
     
      return this.state.monthlyTotal;
    }

    monthlyTotal(monthlyFilterArr){
      var totalObjArr= monthlyFilterArr.filter(el=>(el.month==today.slice(3,10)))
      if(totalObjArr.length!=0){
        total=totalObjArr[0].total
      this.setState({monthlyTotal:total});

      }

    }

    getDayTotal(dArr, dt){

      let indx = dArr.findIndex((el)=>(el.date==dt));
      dayTotal=parseInt(dArr[indx].total)
     
      return dayTotal;
    }

addCommas(num) {
   num = String(num).replace(/,/g,"")
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
    

   
    render(){
      console.log("render exp")
      console.log(this.props.expences)
    var expences = this.expenceFilter(this.props.expences);
    expences.sort(this.sortByDate);
    
    var monthlyFilterArr = this.monthlyFilter(expences);
    var thismonthlyFilterArrIndx = monthlyFilterArr.findIndex((e)=>(e.month==today.slice(3,10)));
    var monthlyFilterArrDisp = [];
    monthlyFilterArrDisp.push(monthlyFilterArr[thismonthlyFilterArrIndx])
    
    if(thismonthlyFilterArrIndx!=-1 && monthlyFilterArrDisp.length>0){


    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
      
    
        <View style={style.container}>

            
            {/* date display */}

            {



                monthlyFilterArrDisp.map(el=>{
                  var dateFilterArr=this.dateFilter(el.expences)
                  return(
                    <View>



{/* montly insight chart start */}



    <TouchableHighlight style={style.month,{marginVertical:10,paddingHorizontal:35,paddingVertical:12,borderRadius:5,borderWidth:0.75,}}
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onLongPress={()=>this.setState({incModalVisible:true,tempEl:el})}

    >
  <View>
                 
                 <View style={{flex:1, alignSelf:'center'}}>
       <Text style={{flex:1,alignItems:'center',fontSize:21,fontWeight:'bold',marginBottom:9.5}}>{this.getMonthName(today)}, {today.split("/")[2]}</Text>
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
   
   
                 <View style={{flexDirection:'row',alignContent:'space-between',marginLeft:-15}}>
                 <View
                 style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}

                 >
                 
                   <Text style={
                     String(el.total).length>7?
                     {fontWeight:'bold',fontSize:16, color:'#ec3811',marginLeft:-5}:
                     {fontWeight:'bold',fontSize:16.5, color:'#ec3811'}
                     
                     }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                                {el.total.toString().split(".").length==2?this.addCommas(el.total.toString().split(".")[0])+"."+el.total.toString().split(".")[1]:this.addCommas(el.total.toString())}
                                  </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1, alignItems:'center',backgroundColor: "" }]}
                 >
                   <Text style={
                     
                   el.income>=0?
                   String(el.income).length>7?
                   {fontWeight:'bold',fontSize:16,color:'#109a7d',marginLeft:-5}:{fontWeight:'bold',fontSize:16.5,color:'#109a7d'}:{fontWeight:'bold',fontSize:16.5}
                   
                    
                     }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                                {el.income.toString().split(".").length==2?this.addCommas(el.income.toString().split(".")[0])+"."+el.income.toString().split(".")[1]:this.addCommas(el.income.toString())}
                              
                                 </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={
                     String(el.saving).replace(/[-,]/g,"").length>6?
                     el.saving<0?
                    {fontWeight:'bold',fontSize:16, color:'#ec3811',marginLeft:-5}:el.saving>=0?{fontWeight:'bold',fontSize:16, color:'#109a7d',marginLeft:-5}
                   :{fontWeight:'bold',fontSize:16,marginLeft:-5}
                    
                    :
                     el.saving<0?
                    {fontWeight:'bold',fontSize:16.5, color:'#ec3811'}:el.saving>=0?{fontWeight:'bold',fontSize:16.5, color:'#109a7d'}
                    :{fontWeight:'bold',fontSize:16.5}
                    
                     }
                     >
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                                {isNaN(el.saving)?"-":
                                el.saving>=0?
                                el.saving.toString().split(".").length==2?this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,""))+"."+el.saving.toString().split(".")[1]:this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                                :
                                el.saving.toString().split(".").length==2?"-"+this.addCommas(el.saving.toString().split(".")[0].replace(/[,-]/g,""))+"."+el.saving.toString().split(".")[1]:"-"+this.addCommas(el.saving.toString().replace(/[,-]/g,""))
                                
                                }    </Text>
                 </View>
   
                
                 </View>
                   </View>
               </TouchableHighlight>



{/* monthly insight chart end */}





                         {dateFilterArr.map(d=>{
                           return(
                             <View>
                            <View style={style.date}>
                            <View style={style.date,{flexDirection:'row', justifyContent:'space-between'}}>
                           <Text style={style.dateText}><Text style={[style.dateDigit,{color:'#109a7d'}]}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, <Text style={{color:'#109a7d'}}>{this.getDayName(d.date).slice(0,3)}   </Text>            </Text>
                           <Text style={{fontSize:18.5 ,fontWeight:'bold',color:'#109a7d',marginTop:10,marginRight:10}}>
                           <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                             {d.total.toString().split(".").length==2?this.addCommas(d.total.toString().split(".")[0])+"."+d.total.toString().split(".")[1]:this.addCommas(d.total.toString())}
                             </Text>
                           </View>
                           </View>
                            { d.expences.map(x=>(<ExpenceBlock reRender={()=>this.props.reRender()} editable={true}  expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)} onSwipe={(x)=>this.swipe(x)} />))}

                          </View>
                           )
                         })}


                  </View>
                  )
                })
                
                
            }

           
        </View>
        

        <Modal animationType = {"slide"} transparent = {true}
                    visible = {this.state.incModalVisible}
                    onDismiss = {() => this.incsetModalVisible(false) }
                    onRequestClose = {() => this.incsetModalVisible(false) }>
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
                            onPress = {() =>{this.incsetModalVisible(false);this.setState({newIncome:""})}}
                             
                             >
                              <Text style={{color:'#109a7d', fontWeight:'bold'}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            activeOpacity={0.75}
                            disabled={this.state.newIncome==""?true:false}
                             style={{borderWidth:1,borderRadius:50,backgroundColor:'#109a7d',borderColor:'#109a7d',paddingHorizontal:40,paddingVertical:7.5,marginLeft:15}}
                            onPress = {() =>
                              {
                                
                              this.props.setIncome(this.state.tempEl, this.state.newIncome);
                              this.setState({incModalVisible:false,newIncome:''})
                              }

                            }
                             
                             >
                              <Text style={{color:'#fff', fontWeight:'bold'}}>Save</Text>
                            </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                </Modal>



                
    </ScrollView>
    
    <View style={{flex:1,position:'absolute',bottom:5,right:15,alignSelf:'flex-end'}}>
    <View style={{position:'absolute',bottom:5,right:15,alignSelf:'flex-end'}}>
        <View style={{alignItems:'center'}}>
                <TouchableHighlight elevation style={style.button} underlayColor='#137863' onPress={() => this.setModalVisible(true)}>
                <Text style={style.add}>+</Text>
                </TouchableHighlight>

        </View>

    </View>
  </View>

  <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.modalVisible}
                    onDismiss = {() => this.setModalVisible(false) }
                    onRequestClose = {() => this.setModalVisible(false) }>
                        <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={(value)=>this.setModalVisible(value)}/>
                        <Button 
                            onPress = {() =>this.setModalVisible(false)}
                            color="#137863"
                            title="Close" 
                            />
                </Modal>




</View>
   
)}
else{
  return(
    <ScrollView style={{flex:1}}>
    <View style={[style.container]}>
         
         
    <TouchableHighlight style={style.month,{marginVertical:10,paddingHorizontal:35,paddingVertical:12,borderRadius:5,borderWidth:0.75,marginBottom:75}}
activeOpacity={0.6}
underlayColor="#DDDDDD"

>
<View>
           
           <View style={{flex:1, alignSelf:'center'}}>
 <Text style={{flex:1,alignItems:'center',fontSize:21,fontWeight:'bold',marginBottom:9.5}}>{this.getMonthName(today)}, {today.split("/")[2]}</Text>
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


           <View style={{flexDirection:'row',alignContent:'space-between',marginLeft:-15}}>
           <View
           style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}

           >
           
             <Text style={
               {fontWeight:'bold',fontSize:16.5}
               
               }>
             <Icon name='currency-inr' size={16} solid={true} raised={true}
                          style={{
                              fontStyle:'normal',
                              fontWeight:'bold',
                              flexDirection:'column'
                          }}
                          />
                            {" -"}
                            </Text>
           </View>
           <View
             style={[style.box, { flex:1, alignItems:'center',backgroundColor: "" }]}
           >
             <Text style={
             {fontWeight:'bold',fontSize:16.5}
             
               }>
             <Icon name='currency-inr' size={16} solid={true} raised={true}
                          style={{
                              fontStyle:'normal',
                              fontWeight:'bold',
                              flexDirection:'column'
                          }}
                          />
                         {" -"}
                           </Text>
           </View>
           <View
             style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
           >
             <Text style={
              {fontWeight:'bold',fontSize:16.5}
              
               }
               >
             <Icon name='currency-inr' size={16} solid={true} raised={true}
                          style={{
                              fontStyle:'normal',
                              fontWeight:'bold',
                              flexDirection:'column'
                          }}
                          />
                          {
                          
                          " -"
                          }    </Text>
           </View>

           </View>
       </View>
         </TouchableHighlight>

</View>
    <View style={{flex:1,marginTop:175,marginBottom:18,alignItems:'center',justifyContent:'center'}}>
         
       

{/* monthly insight chart end */}

                        <Text style={{marginBottom:245}}>No Record Found for this month! {"\n\n"}     Tap  {" "}
                        
                        <Ionicons name='add-circle' size={22} solid={true} raised={true}
                          style={{
                              marginLeft:5,
                              color:'#109a7d',
                              fontStyle:'normal',
                              fontWeight:'bold',
                              flexDirection:'column'
                          }}
                          />
                        
                        {"  "}
                           to add expence.</Text>

      <View style={{flex:1,marginTop:5,position:'absolute',top:55,bottom:5,right:15,alignSelf:'flex-end'}}>
    <View style={{position:'absolute',bottom:5,right:15,alignSelf:'flex-end'}}>
        <View style={{alignItems:'center'}}>
                <TouchableHighlight elevation style={style.button} underlayColor='#137863' onPress={() => this.setModalVisible(true)}>
                <Text style={style.add}>+</Text>
                </TouchableHighlight>

        </View>

    </View>
  </View>

  <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.modalVisible}
                    onDismiss = {() => this.setModalVisible(false) }
                    onRequestClose = {() => this.setModalVisible(false) }>
                        <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={(value)=>this.setModalVisible(value)}/>
                        <Button 
                            onPress = {() =>this.setModalVisible(false)}
                            color="#19443c"
                            title="Close" 
                            />
                           
                </Modal>
</View>
</ScrollView>
  )
}
}
};

export default Expences;

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
     }

});