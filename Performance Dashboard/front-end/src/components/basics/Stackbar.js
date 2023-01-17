import React from 'react';
// import colorManager from './color';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function Stackbar() {
  const location = useLocation();
  // console.log(location);
  const graphdata = location.state.data;
  console.log(graphdata);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Web and Mobile requests Bar Graph ',
    },
  },
  // elements: {
  //   bar: {
  //     borderWidth: 2,
  //   },
  // },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['Web', 'Mobile'];

// for(var key in graphdata?.ResponseWeb){
//   console.log(key);
// }
const dataset = [];
    
for(var key in graphdata?.ResponseWeb){
  dataset.push({
    label: key,
    data: [graphdata?.ResponseWeb[key], graphdata?.ResponseMobile[key]],
    // borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    
  })
}

const data = {
  labels,
  datasets: dataset,
};

  return (

    <div className="App" style ={{justifyContent:'center', display:'flex'}}>
      <div style={{width: "1000px"}}>
        
        <Bar options={options} data={data} />

      </div>
    </div>
  );
}