import React, {Component, useState} from 'react';
import { Text,TextInput, View, StyleSheet, TouchableHighlight, Button,Modal,Alert,Pressable, DatePickerAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddExpence from './AddExpence';
// import Prompt from 'react-native-prompt';

// import Expences Block
import ExpenceBlock from './ExpenceBlock';
// var monthFlag1 = [0,0,0,0,0,0,0,0,0,0,0,0];
// var s;

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
            // data:[],
             newIncome: '',
             tempEl:"",
             refresh:false,
            // promptVisible: false
            // monthlyTotal:0,
            // dailyTotal:0,
            // monthlyFilterArr:[],
            // dateFilterArr:[]
        }

        this.incsetModalVisible=this.incsetModalVisible.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
        this.addFunc=this.addFunc.bind(this);
        this.expenceFilter = this.expenceFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        // this.distinctDateExpences = this.distinctDateExpences.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        // this.monthDisp = this.monthDisp.bind(this);
        // this.monthYearDisp = this.monthYearDisp.bind(this);
        // this.something = this.something.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.monthlyTotal = this.monthlyTotal.bind(this);
        // this.listener = this.listener.bind(this);
        this.getMonthTotal = this.getMonthTotal.bind(this);
        this.getDayTotal= this.getDayTotal.bind(this);
        // this.showAlert = this.showAlert.bind(this)
        this.setIncome = this.setIncome.bind(this);
        this.delete = this.delete.bind(this);
        this.swipe = this.swipe.bind(this);
        this.update = this.update.bind(this);

       }

       componentDidMount(){
        console.log("did mount exp")
        // this.setState({refresh:!this.state.refresh}) 
       }

       componentDidUpdate(prevProps) {
        console.log("did update exp")

        // Typical usage (don't forget to compare props):
        if (this.props.expences.length !== prevProps.expences.length) {
          // this.fetchData(this.props.userID);
        // this.setState({refresh:!this.state.refresh}) 

        }
      }



      //  remove(expence){
      //   var arr = this.props.expences
      //   for( var i = 0; i < arr.length; i++)
      //   {
      //     if ( arr[i].date == expence.date && arr[i].desc == expence.desc)
      //      {
      //        arr.splice(i, 1);
      //      }
      //    }//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]

      //    this.props.expences = arr
      //   // this.setState({availableColors:arr});
      //   // this.storeData(this.state.availableColors);
    
    
      // }


      // swipe(expence){
      //   Alert.alert(
      //     'Expence already Paid',
      //               'This Expence has already been Paid.',
      //               [
      //                   {
      //                       text: 'Okay',
      //                       onPress: ()=>console.log('Cancel Pressed'),
      //                       style: 'cancel'
      //                   },
      //                   // {
      //                   //     text:'Update',
      //                   //     onPress:()=>{
      //                   //       // this.props.remove(expence)
      //                   //       // this.setState({refresh:!this.state.refresh});
    
      //                   //     }
      //                   // }
    
      //               ],
    
      //               )
    
    
      //   }



      
    update(expence){
      var arr = this.props.expences;

      for( var i = 0; i < arr.length; i++)
        {
          if ( arr[i].status==expence.status && arr[i].date == expence.date && arr[i].desc == expence.desc && arr[i].amount == expence.amount && arr[i].paidBy == expence.paidBy && arr[i].splitWith == expence.splitWith)
           {
            //  arr.splice(i, 1);
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
                            // this.props.remove(expence)
                            // this.setState({refresh:!this.state.refresh});
                            
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
    



       setIncome(){
        // this.setState({ promptVisible: true})
        var e =  this.state.tempEl;
        e.income=this.state.newIncome;
        
        let incIndx = this.props.income.findIndex((el)=>(e.month==el.month));
              // var incIndx = incomeArr.findIndex((x)=>(x.month=="05/2021"));
              if(incIndx!=-1){
                this.props.income[incIndx].income=this.state.newIncome;
                // var inc ="2"
              }
              else{

                var tempInc = {
                  month:e.month,
                  income:this.state.newIncome
                }

                this.props.income.push(tempInc);

                // var inc = "-";
                // var inc = incIndx
                // var inc = incomeArr[0].income;
                // var inc = el.date.slice(3,10)
              }
        this.setState({ incModalVisible: false})
              

       }

  //       showAlert = () =>
  //       //  Alert.prompt("Alert Title", "My Alert Msg", callbackOrButtons?, type?, defaultValue?, keyboardType?)
  // Alert.prompt(
  //   "Alert Title",
  //   "My Alert Msg",
  //   [
  //     {
  //       text: "Cancel",
  //       onPress: () => Alert.alert("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //   ],
  //   {
  //     cancelable: true,
  //     onDismiss: () =>
  //       Alert.alert(
  //         "This alert was dismissed by tapping outside of the alert dialog."
  //       ),
  //   }
  // );


      
      //  componentWillUnmount() {
      //   this.listener.remove();
      // }
      // getFlights = () => {
      //   // getData().then(flights => {
      //     this.setState({ modalVisible: true });
      //   // });
      // };
      //  componentDidMount(){
      // //   const data1 = this.props.expences;
      // // // const addExpence () => (this.props.addExpence);
      // // this.setState({data:data1});
      // // // this.forceUpdate();

      // // // return this.state.data;

      // this.listener = this.props.navigation.addListener("didFocus", this.getFlights);

  
      // }

      // componentDidUpdate(prevProps) {
      //   this.setState({modalVisible:true});
      //   // if(this.props.expences===prevProps.expences) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      //   // {
      //   //   this.setState({data:this.props.expences});

      //   // }
      // } 
  
      monthlyTotal(monthlyFilterArr){
        var totalObj= monthlyFilterArr.filter(el=>(el.month==today.slice(3,10)))[0]
        var total = totalObj.total;
        this.setState({monthlyTotal:total});

      }

       monthlyFilter(expence){
         var monthArr = []
         var monthlyFilterExpence = []
         var incomeArr = this.props.income;
         
        //  var total=0
         expence.forEach(el=>{


              // var incIndx= incomeArr.filter(e=>(e.month==el.date.slice(3,10)))[0]
              let incIndx = incomeArr.findIndex((e)=>(el.date.slice(3,10)==e.month));
              // var incIndx = incomeArr.findIndex((x)=>(x.month=="05/2021"));
              if(incIndx!=-1){
                var inc = incomeArr[incIndx].income;
                // var inc ="2"
              }
              else{
                var inc = "-";
                // var inc = incIndx
                // var inc = incomeArr[0].income;
                // var inc = el.date.slice(3,10)
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
            // monthlyFilterExpence[indx].total=Number(monthlyFilterExpence[indx].total)+Number(el.amount)
            let tempSum = Number(monthlyFilterExpence[indx].total)+Number(el.amount)
            monthlyFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
            
            let tempSav = Number(monthlyFilterExpence[indx].saving)-Number(el.amount)
            monthlyFilterExpence[indx].saving=Math.round((tempSav + Number.EPSILON) * 100) / 100
            
            monthlyFilterExpence[indx].expences.push(el)
          }    

         });
        // var total= parseInt(monthlyFilterExpence[0].total);
        //  this.setState({monthlyFilterArr:monthlyFilterExpence})

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
          //  dateFilterExpence[indx].total=Number(dateFilterExpence[indx].total)+Number(el.amount)
          let tempSum = Number(dateFilterExpence[indx].total)+Number(el.amount)
          dateFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
          
          dateFilterExpence[indx].expences.push(el)
         }    

        });

        return dateFilterExpence;
      }


      //  monthYearDisp(el){

      //   // var mmyyyy =[];
      //   var my = el.split("/")[1]+el.split("/")[2];
      //   // this.state.mmyyyy = this.state.mmyyyy.filter((v, i, a) => a.indexOf(v) === i);
      //   if(this.state.mmyyyy.indexOf(my)==-1){
      //   this.state.mmyyyy.push(my)
      //     return 1;
      //   }
      //   else{
      //     return 0;
      //     // return this.state.mmyyyy;
      //   }
      //   // this.state.mmyyyy.push(my)
      //   // var myArray = ['a', 1, 'a', 2, '1'];
        
      //  }

      //  monthDisp(el){
      // // var s=0;
      // var monthFlag1 = this.state.monthFlag;
      //   let mm = parseInt(el.split("/")[1]);
      //   if(monthFlag1[mm-1]==1){
      //     s=1;
      //     // monthFlag1[mm-1]=1;

      //     // this.setState({monthFlag:monthFlag1})
      //     return this.state.monthFlag;

      //   }
      //   else if(monthFlag1[mm-1]==0){
      //     s=2;
      //   monthFlag1[mm-1]=1;
      //     // this.setState({monthFlag:monthFlag1})

      //     return s;
          
      //   }
      //     // return s;
        
      //  }

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
        // this.props.expences.push(newExpence);


        this.props.add(newExpence);
        this.setState({refresh:!this.state.refresh})
        
        // this.state.data.push(newExpence);
        // this.setState({refresh:"refresh"})
        
        // this.setState({data:exp})  
      //   this.props.expences.sort(function(a, b) {
      //     var c = new Date(a.date);
      //     var d = new Date(b.date);
      //     return c-d;
      // }).reverse();
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

  //   sortByDate(a, b) {
  //     if (a.date < b.date) {
  //         return 1;
  //     }
  //     if (a.date > b.date) {
  //         return -1;
  //     }
  //     return 0;
  // }


    setModalVisible(){
        this.setState({modalVisible:!this.state.modalVisible});
    }

    incsetModalVisible(){
      this.setState({incModalVisible:!this.state.incModalVisible});
  }

    getMonthTotal(mArr,dt){

      // mArr.filter()
      // let indx = mArr.findIndex((el)=>(el.month==dt.slice(3,10)));
      // monthTotal=parseInt(mArr[indx].total)

      var mTotal = mArr.forEach(el=>{
        if(el.month==dt.slice(3,10)){
          // return el.total
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
      // var total = totalObj.total;

    }

    getDayTotal(dArr, dt){

      let indx = dArr.findIndex((el)=>(el.date==dt));
      dayTotal=parseInt(dArr[indx].total)
     
      return dayTotal;
    }

    

   
    render(){
      console.log("render exp")
    // const data = this.props.expences;
    // const addExpence () => (this.props.addExpence);
    var expences = this.expenceFilter(this.props.expences);
    expences.sort(this.sortByDate);
    
    var monthlyFilterArr = this.monthlyFilter(expences);
    var thismonthlyFilterArrIndx = monthlyFilterArr.findIndex((e)=>(e.month==today.slice(3,10)));
    var monthlyFilterArrDisp = [];
    monthlyFilterArrDisp.push(monthlyFilterArr[thismonthlyFilterArrIndx])
    // this.setState({monthlyFilterArr:monthlyFilterArr})
    // this.monthlyTotal(monthlyFilterArr);
    // var distinctDateMapData = this.distinctDateExpences(expences);



    // this.setState({DateWiseData:distinctDateMapData});
    // expences.sort(function(a, b) {
    //       var c = new Date(a.date);
    //       var d = new Date(b.date);
    //       return c-d;
    //   });

    // var MapKeys = [...distinctDateMapData.keys()]
    
    if(thismonthlyFilterArrIndx!=-1 && monthlyFilterArrDisp.length>0){


    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
      {/* <View>
        <View>
    <Text>This month total:  {this.getMonthTotal(monthlyFilterArr,today)}</Text>
    <Text>This date total:  {this.state.monthlyTotal}</Text>

        </View>
      </View> */}
    
        <View style={style.container}>

            
            {/* date display */}

            {/* <View style={style.date}>
    <Text style={style.dateText}><Text style={style.dateDigit}>{MapKeys.length}</Text>{MapKeys[0]}  </Text>
            </View> */}

            {/* date diaplay */}


            {/*
             demo date for refernce
             <View style={style.date}>
                <Text style={style.dateText}><Text style={style.dateDigit}>16</Text>  Feb 2021, Tue</Text>
            </View> */}
 
            {
              // display date array 
              // MapKeys.map((el)=>{return(<Text>{el}</Text>)})
            }

            {



                // display date wise exp
                // MapKeys.map(el=>{
                  
                //   return(
                //     <View>
                //       { this.monthYearDisp(el)!=0?
                //       // <View style={this.monthDisp(el)?{display:"flex"}:{display:"none"}}>
                //         <View style={style.month}>
                // <Text style={style.monthText}>{this.getMonthName(el)}, <Text style={style.digit}>{this.monthYearDisp(el)}</Text></Text>
                //         {/* </View> */}
                //         </View>:<View></View>
                //         }
                //        <View style={style.date}>
                //        {/* <Text style={style.dateText}>{el}  </Text> */}
                //        <View style={style.date}>
                //         <Text style={style.dateText}><Text style={style.dateDigit}>{el.slice(0,2)}</Text>  {this.getMonthName(el).slice(0,3)} {el.split('/')[2]}, {this.getDayName(el).slice(0,3)}</Text>
                //       </View>
                //       </View>
                //     {/* <Text style={style.digit} >{el}</Text> */}
                //    { distinctDateMapData.get(el).map(x=>(<ExpenceBlock expences={x}/>))}
                //  </View>
                // )})

                monthlyFilterArrDisp.map(el=>{
                  var dateFilterArr=this.dateFilter(el.expences)
                  return(
                    <View>



{/* montly insight chart start */}



    <TouchableHighlight style={style.month,{marginVertical:10,paddingHorizontal:35,paddingVertical:12,borderRadius:5,borderWidth:0.75,}}
    // accessibilityRole='button'
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
   
   
                 <View style={{flexDirection:'row',alignContent:'space-between'}}>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={{fontWeight:'bold',fontSize:16.5, color:'#ec3811'}}>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                // containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                                {el.total}   </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1, alignItems:'center',backgroundColor: "" }]}
                 >
                   <Text style={el.income>0?{fontWeight:'bold',fontSize:16.5,color:'#109a7d'}:{fontWeight:'bold',fontSize:16.5}}>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                // containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                                {el.income}    </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "" }]}
                 >
                   <Text style={el.saving<0?{fontWeight:'bold',fontSize:16, color:'#f40909'}:el.saving>0?{fontWeight:'bold',fontSize:16.5, color:'#109a7d'}:el.saving==0?{fontWeight:'bold',fontSize:16.5,color:'#109a7d'}:{fontWeight:'bold',fontSize:16.5}}>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                // containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                                {isNaN(el.saving)?"-":el.saving}    </Text>
                 </View>
   
                {/* <View style={{flex:1}}><Text style={{fontWeight:'bold'}}>Expence: </Text></View> */}
                {/* <View style={{flex:2}}><Text >Income: </Text></View> */}
                {/* <View style={{flex:1}}><Text >Savings: </Text> </View> */}
                
                 </View>
                 {/* <View style={{flex:1,flexDirection:'row'}}>
   
                 </View> */}
   
                   {/* <Text style={style.monthInsight}>February,
                     <Text style={style.digit}>2021</Text>    -    $5000 </Text>{"\n"} 
                   <View style={{flex:1,flexDirection:'row'}}>
                     <Text style={{flex:1,flexDirection:'row'}}><Text style={{fontWeight:'bold'}}>Expence: </Text><Text style={{flex:2}}>Income: </Text><Text style={{flex:3}}>Savings: </Text> </Text>{"\n"}
                     {/* <Text style={style.insightText}><Text>$500 </Text><Text>$1000 </Text><Text>$500 </Text></Text> */}
                     {/* </View> */} 
   
                   {/* <Text style={style.total,{flex:3,marginLeft:125,marginTop:5,fontWeight:'bold'}}>$500</Text> */}
                   </View>
               </TouchableHighlight>



{/* monthly insight chart end */}





                       {/* { this.monthYearDisp(el)!=0? */}
                        {/* // <View style={this.monthDisp(el)?{display:"flex"}:{display:"none"}}> */}
                         {/* <View style={style.month}>
                  <Text style={style.monthText}>{this.getMonthName(el.expences[0].date)},<Text style={style.digit}>{el.month.split("/")[1]}</Text>  -  ${el.total}</Text>
                         </View> */}
                         {/* </View>:<View></View> */}
                         {/* } */}
                         {dateFilterArr.map(d=>{
                           return(
                             <View>
                            <View style={style.date}>
                            {/* <Text style={style.dateText}>{el}  </Text> */}
                            <View style={style.date,{flexDirection:'row', justifyContent:'space-between'}}>
                           <Text style={style.dateText}><Text style={[style.dateDigit,{color:'#109a7d'}]}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, <Text style={{color:'#109a7d'}}>{this.getDayName(d.date).slice(0,3)}   </Text>            </Text>
                           {/* <Text style={{fontSize:16,fontWeight:'bold',marginTop:10}}>-</Text> */}
                           <Text style={{fontSize:18.5 ,fontWeight:'bold',color:'#109a7d',marginTop:10,marginRight:10}}>
                           <Icon name='currency-inr' size={16} solid={true} raised={true}
                                // containerStyle={{marginLeft:5}}
                                style={{
                                    // position:'relative',
                                    // top:19,
                                    // left:-25,
                                    // marginLeft:15
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                // onPress={()=>navigation.toggleDrawer()}
                                />
                             {d.total}</Text>
                           </View>
                           </View>
                            { d.expences.map(x=>(<ExpenceBlock editable={true} expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)} onSwipe={(x)=>this.swipe(x)} />))}

                          </View>
                           )
                         })}

                        {/* <View style={style.date}> */}
                        {/* <Text style={style.dateText}>{el}  </Text> */}
                        {/* <View style={style.date}>
                         <Text style={style.dateText}><Text style={style.dateDigit}>{el.expences[0].date.slice(0,2)}</Text>  {this.getMonthName(el.expences[0].date).slice(0,3)} {el.expences[0].date.split('/')[2]}, {this.getDayName(el.expences[0].date).slice(0,3)}</Text>
                       </View>
                       </View> */}

                     {/* <Text style={style.digit} >{el}</Text> */}
                     
                    {/* { el.expences.map(x=>(<ExpenceBlock expences={x}/>))} */}
                  </View>
                  )
                })
                
                
            }

            {/* {
              // expences blocks

            //  this.state.DateArr.forEach(e=>{
              //  for(i=0;i<expences.length;i++){
                //  if(expences.date==e){

                  expences.map(expence => (
                    <ExpenceBlock  expences={expence} />
        
                        ))
                //  }
              //  }
            //  }) 
              
            } */}
           

            {/* <View style={{alignItems:'center'}}>
            <TouchableHighlight elevation style={style.button} underlayColor='#9e9e9e94'>
            <Text style={style.mainText}>+</Text>
            </TouchableHighlight> */}

            {/* </View> */}
        </View>
        

        <Modal animationType = {"slide"} transparent = {true}
                    visible = {this.state.incModalVisible}
                    onDismiss = {() => this.incsetModalVisible() }
                    onRequestClose = {() => this.incsetModalVisible() }>
                    <View style = {style.modal}>
                      <View style={{justifyContent:'center',paddingVertical:25}}>
                      <View>
                    <Text>Add Income : </Text>
                    <TextInput  value={this.state.newIncome} onChangeText={(value)=>this.setState({newIncome:value})} placeholder='$ 0.00' keyboardType="decimal-pad" />
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
                            onPress = {() =>this.incsetModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
                            <Button 
                            onPress = {() =>this.setIncome()}
                            color="#137863"
                            title="Add" 
                            />
                      </View>
                    </View>
                    </View>
                </Modal>



        {/* <Prompt
            title="Add Income"
            placeholder="000"
            defaultValue="0"
            visible={this.state.promptVisible}
            onCancel={() => this.setState({ promptVisible: false})}
            onSubmit={(value)=>this.setState({promptVisible:false,newIncome:value})}/> */}

                
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
                    onDismiss = {() => this.setModalVisible() }
                    onRequestClose = {() => this.setModalVisible() }>
                    {/* <View style = {style.modal}> */}
                        <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/>
                        <Button 
                            onPress = {() =>this.setModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
                    {/* </View> */}
                </Modal>




</View>
   
)}
else{
  return(
    <View style={{flex:1,marginBottom:18,alignItems:'center',justifyContent:'center'}}>
      <Text>No Record Found!</Text>

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
                    onDismiss = {() => this.setModalVisible() }
                    onRequestClose = {() => this.setModalVisible() }>
                    {/* <View style = {style.modal}> */}
                        <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/>
                        <Button 
                            onPress = {() =>this.setModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
                    {/* </View> */}
                </Modal>
</View>
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
      // height:100,
      paddingHorizontal:35,
      paddingVertical:15,
      marginVertical:10,
      borderWidth:0.75,
      borderRadius:25,
      alignItems:'flex-start'
  
  },
  insightText:{
    // flex:3,
    flexDirection: "row",
    fontWeight:'bold',
    fontSize:15,
    textAlign:'justify',
    alignContent:'space-around',
    // alignSelf:'center'
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
      // justifyContent:'space-between',
      alignSelf:'flex-end'
    },
    month:{
      flex:1,
        justifyContent:'space-between',
        alignItems:"center",
        // borderWidth:0.75,
        // borderRadius:25,
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
        // justifyContent:"center",
        fontFamily:'monospace',
        fontWeight:"bold",
    },
    add:{
        fontSize: 32,
        color:'white',
        fontFamily:'monospace',
        fontWeight:'bold',
        // marginVertical: -16,
      },
      button:{
        // position:'absolute',
        // top:100,
        // left:10,
        height:60,
        width:60,
        borderWidth:1,
        borderColor:'white',
        borderRadius:50,
        // marginTop:75,
        padding:0,
        alignSelf:'flex-end',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1cc29f'
      },
      modal: {
        // flex:1,
        width:'55%',
        height:'25%',
        alignContent:'center',
        alignSelf:'center',
        justifyContent: 'center',
         marginTop: '75%',
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