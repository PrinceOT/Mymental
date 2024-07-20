import React, { useEffect, useRef,useState } from 'react';
import { useAuth  } from '../../Auth/AuthProvider';
import { Chart, registerables } from 'chart.js';
import Register from '../SetupUser/signup';
import { LineChart as LC } from '@mui/x-charts/LineChart';

import { getUserData } from '../../Dbqueries/qtracker';
import {format} from "timeago.js"
import "./Assessment.scss"
Chart.register(...registerables);


let chart;
let last30Days;


const LineChart = () => {
  const { user} = useAuth();
  const [length, setlength] = useState(7);
  const [total,setTotal] = useState([])
  const [d,setd] = useState([])
  const [a,seta] = useState([])
  const [s,sets] = useState([])
  const [p,setp] = useState([])
  const [t,sett] = useState([])
  

 // const { response,isLoading}=useQuery('fetchData',()=>
 
 

//  const getUserData = async () => {
     
//    const idToken = await user.getIdToken();
 
//    try {
//      const response = await axios.get('http://localhost:3001/mymental/progress/get', {
//        headers: {
//          Authorization: idToken,
//        },
//      });
 
//      console.log('User Data:', response.data);
//     // console.log(response.data[0]);
    
     
     
//      return response.data;
//    } catch (error) {
//      console.error('Error fetching user data:', error);
//    }
//  };


//console.log(data[0]);
  //console.log(JSON.stringify(response));
/*  const getprogress = async () =>{
   try {
    const response = await fetch('http://localhost:3000/mymental/progress/get');
    const jsonData =  await response.json();
    setSelectedjson(jsonData);
   } catch (error) {
    
   }

  } */
  //getprogress(id);
  var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};
let today = new Date();
  var daylist = getDaysArray(new Date().setDate(today.getDate()-80),new Date().setDate(today.getDate()));
daylist = daylist.map((v)=>v.toLocaleDateString('en-GB'));
//const [data, setData] = useState(null);
 /* const arrayofdays = (backlog) => {
    const today = new Date();
    const date = new Date();
    const dates = [];
    for (let index = 0; index < backlog; index++) {
      dates[backlog-index-1]=date.setDate(today.getDate()-index);
    }
    return dates;}*/
    /*
    fetch('http://localhost:3000/mymental/progress/get').then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        console.log('hello');
      }
      // Parse the JSON in the response
      return response.json();
    }).then(rd=>{
      setData(rd);
      console.log(rd);

    })
    */
    


         /*  method: 'GET',
           headers: {
               'Content-Type': 'application/json',
                 },
          body: JSON.stringify(dataToSend),
         }) */

  
   // const today = new Date();
    //const last30Days = Array.from({ length: 30 }, (_, index) => {
    //  const date = new Date();
    //  date.setDate(today.getDate() - index);
    //  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
   // });
    //return last30Days.reverse(); // Reverse the array to have the dates in ascending order
    //last30Days = new Date();
    //getprogress();
   // console.log(selectedjson);
  //getprogress(id);
  //console.log('love');
   //last30Days = getLast30Days();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const take = (arr, n = 1) => arr.slice(0, n);
    
    if (user){
      
      const userData = await getUserData(user);
      //console.log(userData.length);
      var total;
      var depression;
      var anxiety;
      var ptsd;
      var stress;
      var dates;

        //console.log(userData); // This will log the updated data
        if(userData.length > length){
         total = take(userData.map(data=>data.total),length);
         depression = take(userData.map(data=>data.depression),length);
         anxiety = take(userData.map(data=>data.anxiety),length);
        //setLog({...log,a:anxiety})
         ptsd = take(userData.map(data=>data.ptsd),length);
        //setLog({...log,p:ptsd})
         stress = take(userData.map(data=>data.stress),length);
        //setLog({...log,s:stress})
         dates = take(userData.map(data=> format(data.created_at)),length);
        }else{
           total = userData.map(data=>data.total);
         depression = userData.map(data=>data.depression);
         anxiety = userData.map(data=>data.anxiety);
        //setLog({...log,a:anxiety})
         ptsd = userData.map(data=>data.ptsd);
        //setLog({...log,p:ptsd})
         stress = userData.map(data=>data.stress);
        //setLog({...log,s:stress})
         dates = userData.map(data=> format(data.created_at));
        }
        
          
       
        //setLog({...log,timestamp:dates})
       // const total = userData.map(total=>total.total);
   
      
      //dat = getUserData();
     //console.log(dat.total);
     //console.log(log.t);
    
    const ctx = chartRef.current.getContext('2d');
    
    var config = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{label: 'Depression',
        data: depression,
        borderColor: 'orange',
        borderWidth: 2,
          
      },{label: 'Anxiety',
      data: anxiety,
      borderColor: 'blue',
      borderWidth: 2,
        
    },{label: 'Ptsd',
    data: ptsd,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2,
      
  },{label: 'Stress',
  data: stress,
  borderColor: 'green',
  borderWidth: 2,
    
}],
     options: {
      grid:{
        showgrid:false,},
        scales: {
          x: [{
            type: 'linear',
            position: 'bottom',
            gridLines: {
              display:false
          }   
            
          }],
          y: [{
            gridLines: {
              display:false
          } ,  
            
            beginAtZero: true,
          }]
        }
      }
    }
  }
   if (chart) {
      chart.destroy();
      chart = new Chart(ctx, config);
      
    } else {
      chart = new Chart(ctx, config);
      
    }
    } 
};
fetchData();
  }, [user]);

  return (
<>
{ true ? (
  <>
  {/* <h2 style={{marginLeft:"200px"}}>Track your daily well-being</h2> */}
<h2 style={{position:"absolute",left:"50%",top:"0"}}>Tracker</h2>
    <section class="tracker">
  
      <canvas style={{height:"100px",width:"100px",marginTop:"50px"}} ref={chartRef}></canvas>
    
    </section> </>):(<section class="tracker">
       <LC
       xAxis={[{ data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]}]}
       series={[
         {
          label:"Depression",
           data: d,
         },
         {
          label:"Anxiety",
           data: a,
         },
         {
          label:"Stress",
           data: s
         },
       ]}
       width={800}
       height={700}
     />
     
</section>
    )}
    </>
  );
};

export default LineChart;
