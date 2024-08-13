import React, { useEffect, useRef,useState } from 'react';
import { useAuth  } from '../../Auth/AuthProvider';
import { Chart, registerables } from 'chart.js';


import { getUserData } from '../../Dbqueries/qtracker';
import {format} from "timeago.js"
import "./Assessment.scss"
Chart.register(...registerables);


let chart;
let chart2;
let chart3;
let chart4;
let chart5;
let last30Days;


const LineChart = () => {
  const { user} = useAuth();
  const [lengths, setlengths] = useState(7);
  const [lengthd, setlengthd] = useState(7);
  const [lengtha, setlengtha] = useState(3);
  const [lengthp, setlengthp] = useState(3);
  const [loading,setLoading] = useState(0);
 
  // const [total,setTotal] = useState([])
  // const [d,setd] = useState([])
  // const [a,seta] = useState([])
  // const [s,sets] = useState([])
  // const [p,setp] = useState([])
  // const [t,sett] = useState([])
  

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
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const chartRef5 = useRef(null);

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
      var datess;
      var datesa;
      var datesd;
      var datesp;

        //console.log(userData); // This will log the updated data
        // if(userData.length > length){
         //total = take(userData.map(data=>data.total),length);
         depression = take(userData.map(data=>data.depression),lengthd);
         anxiety = take(userData.map(data=>data.anxiety),lengtha);
        //setLog({...log,a:anxiety})
         ptsd = take(userData.map(data=>data.ptsd),lengthp);
        //setLog({...log,p:ptsd})
         stress = take(userData.map(data=>data.stress),lengths);
        //setLog({...log,s:stress})
         datesa = take(userData.map(data=> format(data.created_at)),lengtha);
         datess = take(userData.map(data=> format(data.created_at)),lengths);
         datesd = take(userData.map(data=> format(data.created_at)),lengthd);
         datesp = take(userData.map(data=> format(data.created_at)),lengthp);
        // }else{
        //    total = userData.map(data=>data.total);
        //  depression = userData.map(data=>data.depression);
        //  anxiety = userData.map(data=>data.anxiety);
        // //setLog({...log,a:anxiety})
        //  ptsd = userData.map(data=>data.ptsd);
        // //setLog({...log,p:ptsd})
        //  stress = userData.map(data=>data.stress);
        // //setLog({...log,s:stress})
        //  dates = userData.map(data=> format(data.created_at));
        // }
        
          
       
        //setLog({...log,timestamp:dates})
       // const total = userData.map(total=>total.total);
   
      
      //dat = getUserData();
     //console.log(dat.total);
     //console.log(log.t);
    
    // const ctx = chartRef.current.getContext('2d');
    const ctx2 = chartRef2.current.getContext('2d');
    const ctx3 = chartRef3.current.getContext('2d');
    const ctx4 = chartRef4.current.getContext('2d');
    const ctx5 = chartRef5.current.getContext('2d');
    
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
    var config2 = {
      type: 'line',
      data: {
        labels: datesd,
        datasets: [{label: 'Depression',
        data: depression,
        borderColor: 'orange',
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
    var config3 = {
      type: 'line',
      data: {
        labels: datesa,
        datasets: [{label: 'Anxiety',
      data: anxiety,
      borderColor: 'blue',
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
    var config4 = {
      type: 'line',
      data: {
        labels: datesp,
        datasets: [{label: 'Ptsd',
    data: ptsd,
    borderColor: 'rgba(75, 192, 192, 1)',
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
    var config5 = {
      type: 'line',
      data: {
        labels: datess,
        datasets: [{label: 'Stress',
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



   if (chart4) {
      
      chart2.destroy();
      chart3.destroy();
      chart4.destroy();
      chart5.destroy();
      // chart = new Chart(ctx, config);
      chart2 = new Chart(ctx2, config2);
      chart3 = new Chart(ctx3, config3);
      chart4 = new Chart(ctx4, config4);
      chart5 = new Chart(ctx5, config5);
      
    } else {
      // chart = new Chart(ctx, config);
      chart2 = new Chart(ctx2, config2);
      chart3 = new Chart(ctx3, config3);
      chart4 = new Chart(ctx4, config4);
      chart5 = new Chart(ctx5, config5);
      
    }
    } 
};
fetchData();
  }, [  loading  ]);

  
  

  async function reviewsHandler (topic,number)  {

    try {
     
    switch(topic){
      case 'Depression':
        setlengthd(number);
        setLoading(loading + 1);
          break;
      case 'Anxiety':
        
      setlengtha(number);
      setLoading(loading + 1);
            break;
      case 'Ptsd':
        setlengthp(number);
        setLoading(loading + 1);
            break;

      case 'Stress':
        setlengths(number);
        setLoading(loading + 1);
            break;

      default:
        console.log('Error in topics');
        break;
    }
    
    
   
}
catch(error) {
  console.error(error);
}};

  return (
<>


<div class="container12">
<p class="seven" style={{paddingTop:"10px",paddingLeft:"30px"}}> <h1>Track your mental</h1></p>

<div class="gradient-cards">
  <div class="card12">
    <div class="container-card bg-green-box">
    
      <p class="card-title">Depression</p>
    
      
    <canvas  ref={chartRef2}></canvas>  <button className='button-30' onClick={() => reviewsHandler('Depression',7)}>Past Week</button>  <button className='button-30' onClick={() => reviewsHandler('Depression',30)}>Past Month</button></div>
  </div>

  <div class="card12">
    <div class="container-card bg-white-box">
   
      <p class="card-title">Anxiety</p>
      
    <canvas  ref={chartRef3}></canvas><button className='button-30' onClick={() => reviewsHandler('Anxiety',7)} style={{backgroundColor:"blue"}}>Past Week</button>  <button className='button-30' onClick={() => reviewsHandler('Anxiety',30)}  style={{backgroundColor:"blue"}}>Past Month</button> </div>
  </div>

  <div class="card12">
    <div class="container-card bg-yellow-box">
    
      <p class="card-title">Ptsd</p>
     
   <canvas  ref={chartRef4}></canvas> <button className='button-30' onClick={() => reviewsHandler('Ptsd',7)} style={{backgroundColor:"turquoise"}}>Past Week</button>  <button className='button-30' onClick={() => reviewsHandler('Ptsd',30)} style={{backgroundColor:"turquoise"}}>Past Month</button></div>
  </div>

  <div class="card12">
    <div class="container-card bg-blue-box">
   
      <p class="card-title">Stress</p>
     
<canvas  ref={chartRef5}></canvas> <button className='button-30' onClick={() => reviewsHandler('Stress',7)} style={{backgroundColor:"green"}}>Past Week</button>  <button className='button-30' onClick={() => reviewsHandler('Stress',30)} style={{backgroundColor:"green"}}> Past Month</button>
    </div> 
  </div>
</div>
</div>

    </>
  );
};

export default LineChart;
