import React, {Component} from 'react';
import { Text, View, StyleSheet,TouchableHighlight,Modal,Button,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Swipeout from 'react-native-swipeout';

import * as Animatable from 'react-native-animatable';


//importing addexpence comp
import AddExpence from './AddExpence';

// import Expences Block
import ExpenceBlock from './ExpenceBlock';


// const Payables=({expences})=>(
//     <ScrollView>
//         <View style={style.container}>

//             <View style={style.month}>
//                 <Text style={style.monthText}>February, <Text style={style.digit}>2021</Text></Text>
//             </View>

//             <View style={style.date}>
//                 <Text style={style.dateText}><Text style={style.dateDigit}>16</Text>  Feb 21, Tue</Text>
//             </View>

//             <ExpenceBlock expences={expences}/>

//         </View>
//     </ScrollView>
// );

// const Action = () =>{
//   <View>
//     <Text>Swipeable</Text>
//   </View>
// }


class Payables extends Component{
    
    constructor(props){
        super(props);
        // const [modalVisible, setModalVisible] = useState(false);
        this.state={
            modalVisible:false,
            refresh:false,

        }

        this.setModalVisible=this.setModalVisible.bind(this);
        this.addFunc=this.addFunc.bind(this);
        this.payableFilter = this.payableFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        // this.distinctDateExpences = this.distinctDateExpences.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.delete = this.delete.bind(this);
        this.swipe = this.swipe.bind(this);
        this.update = this.update.bind(this);

    }

    update(expence){
      var arr = this.props.payables;

      for( var i = 0; i < arr.length; i++)
        {
          if (arr[i].status==expence.status && arr[i].date == expence.date && arr[i].desc == expence.desc)
           {
            //  arr.splice(i, 1);
            var exp = arr[i]
           }
         }

      if(expence.status=="Unpaid" && exp.status==expence.status && exp.date==expence.date && exp.amount==expence.amount && exp.desc==expence.desc && exp.paidBy==expence.paidBy){
        exp.status="Paid";
        let temp = exp.paidBy
        exp.paidBy="You to "+temp;

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
                            
                            // this.props.remove(expence)
                            // this.setState({refresh:!this.state.refresh});
  
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
           monthlyFilterExpence[indx].total=parseInt(monthlyFilterExpence[indx].total)+parseInt(el.amount)
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
          dateFilterExpence[indx].total=parseInt(dateFilterExpence[indx].total)+parseInt(el.amount)
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

    payableFilter(data){
    var payables=[];
    data.forEach(element => {
        if(element.paidBy.slice(0,3)!="You" && element.status=="Unpaid"){
          payables.push(element);
        }
      });
      return payables;
    }
    paidPayableFilter(data){
      var paidPayables=[];
      data.forEach(element => {
          if(element.paidBy.slice(0,6)=="You to" && element.status=="Paid"){
            paidPayables.push(element);
              
          }
          
        });

        return paidPayables;


  }

    addFunc(newExpence){
        this.props.payables.push(newExpence);
    }

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


    // sortByDate(a, b) {
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
    render(){
    const data = this.props.payables;
    var payables=this.payableFilter(data);
    var paidPayables = this.paidPayableFilter(data);
    
    payables.sort(this.sortByDate);
    paidPayables.sort(this.sortByDate);

    var monthlyFilterArr = this.monthlyFilter(payables);
    var paidPayablesArr = this.monthlyFilter(paidPayables)



   
    // var distinctDateMapData = this.distinctDateExpences(payables);
    // var MapKeys = [...distinctDateMapData.keys()]
    if(monthlyFilterArr.length>0 || paidPayablesArr.length>0){
    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
    
        <View style={style.container}>

            {/* <View style={style.month}>
                <Text style={style.monthText}>February, <Text style={style.digit}>2021</Text></Text>
            </View>

            <View style={style.date}>
                <Text style={style.dateText}><Text style={style.dateDigit}>16</Text>  Feb 21, Tue</Text>
            </View> */}

            {

            // display date wise exp
            // MapKeys.map(el=>(
            //     <View>
            //     <View style={style.date}>
            //     <Text style={style.dateText}>{el}  </Text>
            //     </View>
            //     {/* <Text style={style.digit} >{el}</Text> */}
            // { distinctDateMapData.get(el).map(x=>(<ExpenceBlock expences={x}/>))}
            // </View>
            // ))


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
                        { d.expences.map(x=>(

                          
                        <ExpenceBlock expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)} onSwipe={(x)=>this.swipe(x)}/>
                        
                        ))}

                      </View>
                       )
                     })}

                     </View>
                     )
                   })


            }



            {/* {
                payables.map(expence => (
            <ExpenceBlock expences={expence} />
            

                ))
            } */}
{

paidPayablesArr.length>0?
<View style={style.month}>
<Text style={style.monthText}>Settled Expences<Text style={style.digit}></Text></Text>
</View>
:
<View></View>
    }

    
            {
              

// if(paidReceivablesArr.length>0){
  paidPayablesArr.map(el=>{
var paidDateFilterArr=this.dateFilter(el.expences)
return(
    <View>
        <View>
        <View style={style.month}>
<Text style={style.monthText}>{this.getMonthName(el.expences[0].date)},<Text style={style.digit}>{el.month.split("/")[1]}</Text>  -  ${el.total}</Text>
        </View>


        {paidDateFilterArr.map(d=>{
        return(
            <View>
            <View style={style.date}>
            {/* <View style={style.date}> */}
        <Text style={style.dateText}><Text style={style.dateDigit}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, {this.getDayName(d.date).slice(0,3)}   -   ${d.total}</Text>
        {/* </View> */}
        </View>
            { d.expences.map(x=>(<ExpenceBlock expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)} onSwipe={(x)=>this.swipe(x)} />))}

        </View>
        )
        })}

</View>


</View>
)
})
}
            
            <View>

            {/* <View style={style.month}>
            <Text style={style.monthText}>Received<Text style={style.digit}></Text></Text>
            </View> */}
             {paidPayablesArr.map(d=>{
             d.expences.map(x => (<ExpenceBlock expences={x} onSelect={(x)=>this.change(x)} onDelete={(x)=>this.delete(x)} onSwipe={(x)=>this.swipe(x)} />))
             
             })
            }
          </View>
           
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
                         <AddExpence addFunc={(newExpence)=>this.addFunc(newExpence)} modalFlag={()=>this.setModalVisible()}/>
                        <Button 
                            onPress = {() =>this.setModalVisible()}
                            color="#137863"
                            title="Close" 
                            />
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


export default Payables;

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
    month:{
        justifyContent:"center",
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
});