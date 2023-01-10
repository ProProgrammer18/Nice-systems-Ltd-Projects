import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  import { Doughnut, Bar } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

const Graph = () => {
    const [Ritesh, setRitesh] = useState([]);
    const getGraphData = async () => {
        try {
            const res = await axios.post('http://localhost:5000/fetchData', { filename: "41d8c2798aRequest_TP.log" });
            console.log(res);
            if (res.status === 200) {
                setRitesh(res.data);
                console.log(res.data);

            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGraphData();
    }, [])
    const data = {
        labels: [
            'Web',
            'Mobile'
        ],
        datasets: [{
            data: [Ritesh?.webcnt, Ritesh?.mobilecnt],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
        }]
    }

    const Bardata = {
        labels: Ritesh?.ResponseWeb,
        datasets: [
            {
                data : Ritesh?.ResponseWeb,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
            }]
    }


    return (
        <>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    radius: 300,
                }}

            />
            {/* <Bar  data={Bardata} />; */}


        </>
    )
}

export default Graph
