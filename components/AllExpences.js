import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, TouchableHighlight,Alert, Button,Modal,Pressable, DatePickerAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddExpence from './AddExpence';

// import Expences Block
import ExpenceBlock from './ExpenceBlock';
// import { DATA } from './data';

// var monthFlag1 = [0,0,0,0,0,0,0,0,0,0,0,0];
var s;
class AllExpences extends Component{
    
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            data:[],
            refresh:false,
            
            // monthFlag : [0,0,0,0,0,0,0,0,0,0,0,0],
            // mmyyyy:[]
            // DateWiseData:new Map(),
            // dateArr:["09/03/2021"],
            // temp:"07/03/2021"
        }

        this.setModalVisible=this.setModalVisible.bind(this);
        this.addFunc=this.addFunc.bind(this);
        this.expenceFilter = this.expenceFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        // this.distinctDateExpences = this.distinctDateExpences.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        this.monthDisp = this.monthDisp.bind(this);
        this.monthYearDisp = this.monthYearDisp.bind(this);
        // this.something = this.something.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.storeData = this.storeData.bind(this);
        this.delete = this.delete.bind(this);
        this.swipe = this.swipe.bind(this);
        this.update = this.update.bind(this);


       }
       update(expence){
        var arr = this.props.expences;
  
        for( var i = 0; i < arr.length; i++)
          {
            if ( arr[i].status==expence.status&& arr[i].date == expence.date && arr[i].desc == expence.desc)
             {
              //  arr.splice(i, 1);
              var exp = arr[i]
             }
           }
  
        if(exp.status==expence.status && exp.date==expence.date && exp.amount==expence.amount && exp.desc==expence.desc && exp.paidBy==expence.paidBy){
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

       storeData(data1){
        
        this.setState({data:data1});
        return this.state.data;
       }

      //  componentDidUpdate(prevProps) {
      //   if(this.props.expences===prevProps.expences) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      //   {
      //     this.storeData(this.props.expences);

      //   }
      // } 


       monthlyFilter(expence){
         var monthArr = []
         var monthlyFilterExpence = []
         var total=0
         expence.forEach(el=>{
          if(!monthArr.includes(el.date.slice(4,10))){
            let newFormat={
              month:el.date.slice(4,10),
              total:el.amount,
              expences:[el]
            }
            monthlyFilterExpence.push(newFormat)
            monthArr.push(el.date.slice(4,10))
          }
          else{
            let indx = monthlyFilterExpence.findIndex((e)=>(el.date.slice(4,10)==e.month));
            // Math.round((( (monthlyFilterExpence[indx].total) + Number.EPSILON) * 100) / 100
            // monthlyFilterExpence[indx].total=parseInt(monthlyFilterExpence[indx].total)+parseInt(el.amount)
            let tempSum = Number(monthlyFilterExpence[indx].total)+Number(el.amount)
            monthlyFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
 
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
          //  dateFilterExpence[indx].total=Number(dateFilterExpence[indx].total)+Number(el.amount)
          let tempSum = Number(dateFilterExpence[indx].total)+Number(el.amount)
          dateFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
         
          dateFilterExpence[indx].expences.push(el)
         }    

        });

        return dateFilterExpence;
      }


       monthYearDisp(el){

        // var mmyyyy =[];
        var my = el.split("/")[1]+el.split("/")[2];
        // this.state.mmyyyy = this.state.mmyyyy.filter((v, i, a) => a.indexOf(v) === i);
        if(this.state.mmyyyy.indexOf(my)==-1){
        this.state.mmyyyy.push(my)
          return 1;
        }
        else{
          return 0;
          // return this.state.mmyyyy;
        }
        // this.state.mmyyyy.push(my)
        // var myArray = ['a', 1, 'a', 2, '1'];
        
       }

       monthDisp(el){
      // var s=0;
      var monthFlag1 = this.state.monthFlag;
        let mm = parseInt(el.split("/")[1]);
        if(monthFlag1[mm-1]==1){
          s=1;
          // monthFlag1[mm-1]=1;

          // this.setState({monthFlag:monthFlag1})
          return this.state.monthFlag;

        }
        else if(monthFlag1[mm-1]==0){
          s=2;
        monthFlag1[mm-1]=1;
          // this.setState({monthFlag:monthFlag1})

          return s;
          
        }
          // return s;
        
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
        // this.props.expences.push(newExpence);

        // this.state.data.push(newExpence);
       
       
       
        // this.props.expences.push(newExpence);
       
        // this.setState({modalVisible:true});
        this.props.add(newExpence);
        this.setState({refresh:!this.state.refresh})
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

   
    // componentDidMount(){
    //   const data1 = this.props.expences;
    // // const addExpence () => (this.props.addExpence);
    // this.storeData(data1);
    // // this.forceUpdate();


    // }

    // componentWillReceiveProps(){
    //   var exp = this.props.expences;
    //   this.setState({data:exp});
    // }


    render(){
        // const data = Data;
    
    var expences = this.expenceFilter(this.props.expences);
    // var expences = this.expenceFilter(data);

    expences.sort(this.sortByDate);
    
    var monthlyFilterArr = this.monthlyFilter(expences);

    // var distinctDateMapData = this.distinctDateExpences(expences);



    // this.setState({DateWiseData:distinctDateMapData});
    // expences.sort(function(a, b) {
    //       var c = new Date(a.date);
    //       var d = new Date(b.date);
    //       return c-d;
    //   });

    // var MapKeys = [...distinctDateMapData.keys()]


    if(monthlyFilterArr.length>0){

    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
    
        <View style={style.container}>

            {/* <View style={style.month}> */}
                {/* <Text style={style.monthText}>February, <Text style={style.digit}>2021</Text>    -    $5000</Text> */}
                {/* <Text style={style.total,{flex:3,marginLeft:125,marginTop:5,fontWeight:'bold'}}>$500</Text> */}
            {/* </View> */}
            
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

                monthlyFilterArr.map(el=>{
                  var dateFilterArr=this.dateFilter(el.expences)
                  return(
                    <View>
                       {/* { this.monthYearDisp(el)!=0? */}
                        {/* // <View style={this.monthDisp(el)?{display:"flex"}:{display:"none"}}> */}
                         <View style={style.month}>
                  <Text style={style.monthText}>{this.getMonthName(el.expences[0].date)},<Text style={style.digit}>{el.month.split("/")[1]}</Text>  -  ${el.total}</Text>
                         </View>
                         {/* </View>:<View></View> */}
                         {/* } */}
                         {dateFilterArr.map(d=>{
                           return(
                             <View>
                            <View style={style.date}>
                            {/* <Text style={style.dateText}>{el}  </Text> */}
                            <View style={style.date}>
                           <Text style={style.dateText}><Text style={style.dateDigit}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, {this.getDayName(d.date).slice(0,3)}   -   ${d.total}</Text>
                           </View>
                           </View>
                            { d.expences.map(x=>(<ExpenceBlock editable={true} expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)}/>))}

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
   
)

}
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

export default AllExpences;

const style = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:20,
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
      // flex:1,
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
        justifyContent: 'center',
        margin: 20,
        backgroundColor:'#fff'
     },
     show:{
       display:'flex',
     },
     hide:{
       display:"none",
     }

});