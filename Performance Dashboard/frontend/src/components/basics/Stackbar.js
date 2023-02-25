import React from 'react';
import colorManager from './color';
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


export default function Stackbar({startDate, endDate, graphdata, companyName}) {
  const date = new Date(new Date(startDate).getTime()-19800000);
  const date1 = new Date(new Date(endDate).getTime()-19800000);
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
    },
    y: {
      stacked: true,
      width: 10
    },
  },
};

const labels = ['Web', 'Mobile'];
const dataset = [];
    
for(var key in graphdata?.ResponseWeb){
  dataset.push({
    label: key,
    data: [graphdata?.ResponseWeb[key], graphdata?.ResponseMobile[key]],
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

const dataset1 = [];
for(var key2 in graphdata?.reqPerMin){
  dataset1.push(graphdata?.reqPerMin[key2]);
}

const data1 = {
  labels : labels1,
  datasets: [
    {
      label: 'Count of Requests',
      data: dataset1,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
  return (
    <div className="App" style ={{ display:'flex',margin:'5px'}}>
      <div style={{width: "700px"}}>
        <br/>
        <br/>
        <Bar options={options} 
        data={data} />
      </div>
      <div style ={{display:'flex', paddingLeft:'60px'}}>
      <div style={{width: "700px"}}>
        <br/>
        <br/>
        <Bar data={data1} options={options1} />
        </div>
        </div>
    </div>
  );
}