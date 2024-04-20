import React from "react";
import {default as api} from '../../../redux/IT22607232_redux/apiSlice';

const obj = [
  {
    type:"Pending Tasks",
    color: 'rgb(255, 99, 132)',
    percent: 45
  },
  {
    type:"Completed Tasks",
    color: 'rgb(54, 162, 235)',
    percent: 20
  },
  {
    type:"Inprogess Tasks",
    color: 'rgb(255, 205, 86)',
    percent: 10
  }
]
export default function Labels() {

 console.log(api.useGetCategoriesQuery()) ;

  return <>
  {obj.map((v,i) => <LabelComponent key={i} data={v}></LabelComponent>)}
  </>;
}

function LabelComponent({data}) {
  if(!data) return <></>
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-py-3" style={{background:data.color ??'#f9c74f'}}></div>
        <h3 className="text-md">{data.type??''}</h3>
      </div>
      <h3 className="font-bold">{data.percent??0}%</h3>
    </div>
  );
}
