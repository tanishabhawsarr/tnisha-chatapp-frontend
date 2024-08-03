import React from 'react'
import {Line,Doughnut} from 'react-chartjs-2';
import {CategoryScale,
     Chart as ChartJS,
     Tooltip,
     Filler,
     LinearScale,
     PointElement,
     LineElement,
     ArcElement,
     Legend,
     plugins,
     scales,
} 
from 'chart.js';
import { orange, orangeLight, purple, purpleLight } from '../constants/color';
import { getLast7Days } from '../../library/features';


ChartJS.register(
    CategoryScale,
     Tooltip,
     Filler,
     LinearScale,
     PointElement,
     LineElement,
     ArcElement,
     Legend,
    );

    const labels=getLast7Days();
    
const linechartoption={ 
    responsive:"true",
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        },
    },
    scales:{
        x: {
            beginAtZero:true,
            grid: {
                display:false,
            },
        },
        y: {
            grid: {
                display:false,
            },
        },
    },
};

const LineChart = ({value=[]}) => {
    const data={
        labels,
        datasets:[
            {
                data:value,
                label:"Messages",
                fill: true,
                backgroundColor:purpleLight,
                borderColor:purple,
            },
        ],
    }
    return (
        <Line data={data} options={linechartoption}/>
      
    )
  };

const doughnutChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,        
        }, 
    },
    cutout:120,
};

const DoughnutChart = ({value=[],labels=[]}) => {

    const data={
        labels,
        datasets:[
            {
                data:value,
                backgroundColor:[purpleLight,orangeLight],
                borderColor:[purple,orange],
                hoverBackgroundColor:[purple,orange],
                offset:20,
            },
        ],
    };

    return (
        <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>
    )
  };


export {LineChart,DoughnutChart};