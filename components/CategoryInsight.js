import React, {Component} from 'react';
import { Text,TextInput, View, StyleSheet, TouchableHighlight, Button,Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddExpence from './AddExpence';

// import Expences Block
import ExpenceBlock from './ExpenceBlock';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

class CategoryInsights extends Component{
    
    constructor(props){
        super(props);
        this.state={
            data:[],
            
        }

        this.expenceFilter = this.expenceFilter.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.getMonthName =  this.getMonthName.bind(this);
        this.getDayName =  this.getDayName.bind(this);
        this.monthlyFilter = this.monthlyFilter.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        
       }




      categoryFilter(expence){
        var categoryArr = []
        var categoryFilterExpence = []
        expence.forEach(el=>{

         if(!categoryArr.includes(el.category)){
      
           let newFormat={
              category:el.category,
             total:el.amount,
             expences:[el]
           }
           categoryFilterExpence.push(newFormat)
           categoryArr.push(el.category)
         }
         else{
           let indx = categoryFilterExpence.findIndex((e)=>(el.category==e.category));
           
          let tempSum = Number(categoryFilterExpence[indx].total)+Number(el.amount)
          categoryFilterExpence[indx].total=Math.round((tempSum + Number.EPSILON) * 100) / 100
           
          categoryFilterExpence[indx].expences.push(el)
         }    

        });
      
        return categoryFilterExpence;
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
        if(element.paidBy=="You" && element.splitWith=="None" && element.status=="Paid"){
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
    

   
    render(){
      var categoryFilterData = this.props.route.params.CategoryFilterData;
    

    return(
    <View>
    <ScrollView style={{minHeight:'97.5%'}}>
      
    
        <View style={style.container}>


            {


                    <View>

{/* montly insight chart start */}


<TouchableHighlight style={style.month,{marginVertical:10,paddingHorizontal:35,paddingVertical:12,borderRadius:5,borderWidth:0.75,}}
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={()=>{}}

    >
  <View>
                 
                 <View style={{flex:1, alignSelf:'center'}}>
       <Text style={{flex:1,alignItems:'center',fontSize:21,fontWeight:'bold',marginBottom:9.5}}>{this.getMonthName(categoryFilterData[0].expences[0].date)}, {categoryFilterData[0].month.split("/")[1]}</Text>
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
                   style={[style.box, { flex:1,alignItems:'center', backgroundColor: "",marginLeft:-15 }]}
                 >
                   <Text style={
                     String(this.props.route.params.expence).length>7?

                     {fontWeight:'bold',fontSize:16, color:'#ec3811',marginLeft:-5}
                    :
                    {fontWeight:'bold',fontSize:16.5, color:'#ec3811'}

                    }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />

                    {
                      String(this.props.route.params.expence).replace(/[,]/g,"").length>6?
                    this.props.route.params.expence.toString().split(".").length==2?this.addCommas(this.props.route.params.expence.toString().split(".")[0]):this.addCommas(this.props.route.params.expence.toString())
                      :
                    this.props.route.params.expence.toString().split(".").length==2?this.addCommas(this.props.route.params.expence.toString().split(".")[0])+"."+this.props.route.params.expence.toString().split(".")[1]:this.addCommas(this.props.route.params.expence.toString())
                    }

                   </Text>
                 </View>
                 <View
                   style={[style.box, { flex:1, alignItems:'center',backgroundColor: "" }]}
                 >
                   <Text style={
                     String(this.props.route.params.income).length>7?
                     this.props.route.params.income>0?{fontWeight:'bold',fontSize:16.5,color:'#109a7d',marginLeft:-5}:{fontWeight:'bold',fontSize:16,marginLeft:-5}
                    :
                    this.props.route.params.income>0?{fontWeight:'bold',fontSize:16.5,color:'#109a7d'}:{fontWeight:'bold',fontSize:16.5}

                    }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                                
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                                />
                     {isNaN(this.props.route.params.income)?"-":
                    
                    this.props.route.params.income.toString().split(".").length==2?this.addCommas(this.props.route.params.income.toString().split(".")[0])+"."+this.props.route.params.income.toString().split(".")[1]:this.addCommas(this.props.route.params.income.toString())

                     }
                   
                      </Text>
                 </View>

                 <View
                   style={style.box, {flex:1,alignItems:'center'}}
                 >
                   <Text style={
                   String(this.props.route.params.saving).replace(/[-,]/g,"").length>6?

                     this.props.route.params.saving<0?
                    {fontWeight:'bold',fontSize:16, color:'#ec3811',marginLeft:-5}:this.props.route.params.saving>0?{fontWeight:'bold',fontSize:16, color:'#109a7d',marginLeft:-5}:this.props.route.params.saving==0?{fontWeight:'bold',fontSize:16,color:'#109a7d',marginLeft:-5}
                    :{fontWeight:'bold',fontSize:16,marginLeft:-5}
                    :
                    this.props.route.params.saving<0?
                    {fontWeight:'bold',fontSize:16.5, color:'#ec3811'}:this.props.route.params.saving>0?{fontWeight:'bold',fontSize:16.5, color:'#109a7d'}:this.props.route.params.saving==0?{fontWeight:'bold',fontSize:16.5,color:'#109a7d'}
                    :{fontWeight:'bold',fontSize:16.5}
                    
                    }>
                   <Icon name='currency-inr' size={16} solid={true} raised={true}
                               
                                style={{
                                    fontStyle:'normal',
                                    fontWeight:'bold',
                                    flexDirection:'column'
                                }}
                               
                                />
                       {isNaN(this.props.route.params.saving)?"-":
                       String(this.props.route.params.saving).length>6?
                      this.props.route.params.saving>=0? 
                    this.props.route.params.saving.toString().split(".").length==2?this.addCommas(this.props.route.params.saving.toString().split(".")[0].replace(/[,-]/g,"")):this.addCommas(this.props.route.params.saving.toString().replace(/[,-]/g,""))
                   :
                    this.props.route.params.saving.toString().split(".").length==2?"-"+this.addCommas(this.props.route.params.saving.toString().split(".")[0].replace(/[,-]/g,"")):"-"+this.addCommas(this.props.route.params.saving.toString().replace(/[,-]/g,""))
                       :
                       this.props.route.params.saving>=0? 
                       this.props.route.params.saving.toString().split(".").length==2?this.addCommas(this.props.route.params.saving.toString().split(".")[0].replace(/[,]/g,""))+"."+this.props.route.params.saving.toString().split(".")[1]:this.addCommas(this.props.route.params.saving.toString().replace(/[,]/g,""))
                      :
                  this.props.route.params.saving.toString().split(".").length==2?"-"+this.addCommas(this.props.route.params.saving.toString().split(".")[0].replace(/[,-]/g,""))+"."+this.props.route.params.saving.toString().split(".")[1]:"-"+this.addCommas(this.props.route.params.saving.toString().replace(/[,-]/g,""))
                   

                       } </Text>
    
                 </View>
                  
                 </View>
                </View>
               </TouchableHighlight>






                 <View>
               
               {/* spending insights */}




               
                 <View style={{flex:1, alignSelf:'center'}}>
       <Text style={{flex:1,alignItems:'center',fontSize:21,fontWeight:'bold',marginBottom:9.5}}>Spendings: </Text>
                 </View>
   





                {categoryFilterData.map((el)=>{

            var dateFilterArr=this.dateFilter(el.expences)

                  return(
                    <View>
                    
                

                <View style={style.month}>
                  <Text style={[style.monthText,{color:'#109a7d'}]}>
                  {el.category} 
                  {"  "} -  {""}  
              <Icon name='currency-inr' size={13.5}
                                style={{
                                  color:'#ec3811',
                                    flexDirection:'column'
                                }}
                                />  
                  
                  <Text style={{color:'#ec3811'}}>
                
                  {el.total.toString().split(".").length==2?this.addCommas(el.total.toString().split(".")[0])+"."+el.total.toString().split(".")[1]:this.addCommas(el.total.toString())}

                  </Text></Text>
                </View>

                {dateFilterArr.map(d=>{
                           return(
                             <View>
                            <View  style={style.date}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                           <Text style={style.dateText}><Text style={[style.dateDigit,{color:'#109a7d'}]}>{d.date.slice(0,2)} </Text>{this.getMonthName(d.date).slice(0,3)} {d.date.split('/')[2]}, <Text style={{color:'#109a7d'}}>{this.getDayName(d.date).slice(0,3)} </Text>  
                           </Text>
                           <Text style={style.date,{fontSize:18.5 ,fontWeight:'bold',color:'#109a7d',marginTop:10,marginRight:10}}>
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
                            { d.expences.map(x=>(<ExpenceBlock  expences={x} editable={false} />))}

                          </View>
                           )
                         })}
            </View>




                  );
                })}


               </View>


                  </View>                
                
            }

           
        </View>
        
                
    </ScrollView>
    




  
</View>
   
)}
};

export default CategoryInsights;

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
     },
     formRow: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       flexDirection: 'row',
       margin: 15
     },
     formLabel: {
         fontSize: 18,
         flex: 2
     },
     formItem: {
         flex: 1,
         justifyContent:'flex-end'
     },

});