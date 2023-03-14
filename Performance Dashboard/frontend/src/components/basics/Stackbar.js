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
// import DataTable from 'react-data-table-component';
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
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}


export default function Stackbar({ startDate, endDate, graphdata, companyName }) {
  const date = new Date(new Date(startDate).getTime() - 19800000);
  const date1 = new Date(new Date(endDate).getTime() - 19800000);
  const startingDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  const endingDate = date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear();
  const startingTime = fomatTime(date);
  const endingTime = fomatTime(date1);

  const tableData = [];
  for (var key3 in graphdata?.allTableData) {
    tableData.push({
      API_Name: key3,
      Request_Count: graphdata?.allTableData[key3][0],
      Average_Response_Time: graphdata?.allTableData[key3][1],
      P95: graphdata?.allTableData[key3][2],
      Two_Hundred: graphdata?.allTableData[key3][3],
      Three_Hundred: graphdata?.allTableData[key3][4],
      Four_Hundred: graphdata?.allTableData[key3][5],
      Five_Hundred: graphdata?.allTableData[key3][6],
    })
  }

  console.log(graphdata);

  const options = {
    plugins: {
      ChartDataLabels: {
        display: true,
      },
      title: {
        display: true,
        text: 'Total Web and Mobile Requests for Date Range ' + startingDate + ' on ' + startingTime + ' to ' + endingDate + ' on ' + endingTime,
        font: {
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

  for (var key in graphdata?.ResponseWeb) {
    dataset.push({
      label: key,
      data: [graphdata?.ResponseWeb[key], graphdata?.ResponseMobile[key]],
      borderColor: colorManager(true, key),
      backgroundColor: colorManager(false, key),
      ChartDataLabels: {
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
      title: {
        display: true,
        text: 'Total Requests per min for Date range ' + startingDate + ' on ' + startingTime + ' to ' + endingDate + ' on ' + endingTime,
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      legend: {
        position: 'right',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const labels1 = [];
  for (var key1 in graphdata?.reqPerMin) {
    labels1.push(key1);
  }

  const dataset1 = [];
  for (var key2 in graphdata?.reqPerMin) {
    dataset1.push(graphdata?.reqPerMin[key2]);
  }

  const data1 = {
    labels: labels1,
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
    <div>
      <div className="App" style={{ display: 'flex', margin: '5px' }}>
        <div style={{ width: "700px" }}>
          <br />
          <br />
          <Bar options={options}
            data={data} />
        </div>
        <div className='vl'></div>
        <br />
        <br />

        <div style={{ display: 'flex', paddingLeft: '200px' }}>
          <div style={{ width: "700px" }}>
            <br />
            <br />
            <Bar data={data1} options={options1} />
          </div>
        </div>
        {/* <hr style={{ width: '100%'}}/> */}
        <br />
        <br />
      </div>
      <hr />
      <div >
        <br />
        {/* <h2>Responsive Table</h2> */}
        <div className="table-wrapper">
          <table className="fl-table">
            <thead>
              <tr>
                <th>Sr no</th>
                <th>Endpoint</th>
                <th>Request_Count</th>
                <th>Avg Response Time</th>
                <th>p95</th>
                <th>2xx</th>
                <th>3xx</th>
                <th>4xx</th>
                <th>5xx</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((item, index) => {
                  return (
                    <tr key = {index}>
                      <td>{index + 1}</td>
                      <td>{item.API_Name}</td>
                      <td>{item.Request_Count}</td>
                      <td>{item.Average_Response_Time}</td>
                      <td>{item.P95}</td>
                      <td>{item.Two_Hundred}</td>
                      <td>{item.Three_Hundred}</td>
                      <td>{item.Four_Hundred}</td>
                      <td>{item.Five_Hundred}</td>
                    </tr>
                  )
                }
                )
              }       
              </tbody>
              </table>
            </div>
        </div>
        <br />
        <br />
      </div>
      );
}