import React from 'react';
import colorManager from './color';
import {  useLocation } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

const fomatTime = (time) => {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if(hours < 10){
    hours = '0'+hours;
  }
  if(minutes < 10){
    minutes = '0'+minutes;
  }
  return hours+':'+minutes;
}


export default function Stackbar() {
  const location = useLocation();
  // console.log(location);
  const graphdata = location.state.data;
  const startDate = new Date(location.state.startDate);
  const date = new Date(startDate.getTime()-19800000);
  // const newDate = date.toDateString()+'  '+date.getHours() +':'+date.getMinutes();
  const endDate = new Date(location.state.endDate);
  const date1 = new Date(endDate.getTime()-19800000);
  // const newEndDate = date1.toDateString()+'  '+date1.getHours()+':'+date1.getMinutes();
  const startingDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
  const endingDate = date1.getDate()+'/'+(date1.getMonth()+1)+'/'+date1.getFullYear();
  const startingTime = fomatTime(date);
  const endingTime = fomatTime(date1);


  console.log(graphdata);
  

const options = {
  plugins: {
    ChartDataLabels: {
      display: true,
    },
    title: {
      display: true,
      text: 'Total Web and Mobile Requests for Date Range '+startingDate+ ' on '+startingTime+' to '+endingDate+' on '+endingTime,
      font : {
        size: 20,
        weight: 'bold',
      }
    },
    legend: {
      position: 'right',
    },
  },
  elements: {
    bar: {
      borderWidth: 0.5,
    },
    column: {
      borderRadius: 10,
      width: 10,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      // barThickness: 80,
    },
    y: {
      stacked: true,
      width: 10
    },
  },
};

const labels = ['Web', 'Mobile'];

// for(var key in graphdata?.ResponseWeb){
//   console.log(graphdata?.ResponseWeb[key]);
// }
const dataset = [];
    
for(var key in graphdata?.ResponseWeb){
  dataset.push({
    label: key,
    data: [graphdata?.ResponseWeb[key], graphdata?.ResponseMobile[key]],
    // borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    borderColor : colorManager(true,key),
    backgroundColor : colorManager(false,key),
    ChartDataLabels : {
      color: 'white',
    },
    barThickness: 80,
  })
}

const data = {
  labels,
  datasets: dataset,
};

const options1 = {
    plugins: {
      title : {
        display: true,
        text:'Total Requests per min for Date range '+startingDate+ ' on '+startingTime+' to '+endingDate+' on '+endingTime,
        font : {
          size: 20,
          weight: 'bold',
        },
      },
      legend: {
        position: 'right',
      },
    },
    scales : {
      y : {
        beginAtZero : true,
      }
    }
};

const labels1 = [];
for(var key1 in graphdata?.reqPerMin){
  labels1.push(key1);
}
// console.log(labels1);

const dataset1 = [];
for(var key2 in graphdata?.reqPerMin){
  dataset1.push(graphdata?.reqPerMin[key2]);
}
// console.log(dataset1)
// for (var key2 in graphdata?.reqPerMin){
//   dataset1.push({
//     // label: 'Count of Requests',
//     data: [graphdata?.reqPerMin[key2]],
//     // borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
//     // backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
//     // borderColor : colorManager(true,key),
//     // backgroundColor : colorManager(false,key2),
//     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     borderColor: 'rgba(255, 99, 132, 1)',
//     borderWidth: 0.5,
//     // barThickness: 100,
//   })
// }

const data1 = {
  // labels: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 't13', 't14', 't15', 't16', 't17', 't18', 't19', 't20', 't21', 't22', 't23', 't24', 't25', 't26', 't27', 't28', 't29'],
  labels : labels1,
  datasets: [
    {
      label: 'Count of Requests',
      // data: [1, 1, 2, 3, 2, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 3],
      data: dataset1,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      // barThickness: 20,
    },
  ],
  // datasets: dataset1,
};

  return (

    <div className="App" style ={{justifyContent:'center', display:'flex'}}>
      <div style={{width: "700px"}}>
        <br/>
        <br/>
        
        <Bar options={options} 
         
        data={data} />

        <Bar data={data1} options={options1} />
      </div>
    </div>
  );
}