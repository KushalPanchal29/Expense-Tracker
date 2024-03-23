import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import Labels from './Labels';
import { chart_Data,getTotal } from '../helper/helper';
import { default as api } from "../store/apiSlice"

Chart.register(ArcElement); 

const config = {
    data : {
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    },
    options : {
        cutout: 100
    }
}
export default function Graph() {
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let graphData;

    if(isFetching){
        graphData = <div>Fetching</div>
    }
    else if(isSuccess){
        graphData = <Doughnut {...chart_Data(data)}></Doughnut>
    }
    else if(isError){
        graphData = <div></div>
    } 

  return (
    <div className='flex flex-col justify-content max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                {graphData }
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>₹{getTotal(data)}</span>
                </h3>
            </div>
        </div>
    
        <div className='flex flex-col py-10 gap-4'>
            <Labels></Labels>
        </div>
    </div>
  )
}
