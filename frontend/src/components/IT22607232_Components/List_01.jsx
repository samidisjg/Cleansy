import React from 'react'
import boxicons from 'boxicons'

const obj = [
    {
      name:"Pending Tasks",
      color: 'rgb(255, 99, 132)',
    },
    {
      name:"Completed Tasks",
      color: 'rgb(54, 162, 235)',
    },
    {
      name:"Inprogess Tasks",
      color: 'rgb(255, 205, 86)',
    }
  ]
  
export default function List_01() {
  return (
    <div className='flex flex-col py-6 gap-3'>
        <h1 className='py-4 text-md font-bold text-xl'>History</h1>
        {obj.map((v,i) => <Analysis key = {i} category={v}></Analysis>)}
    </div>
  )
}


function Analysis({category}){
    if(!category) return null;
    return (
        <div className='item flex justify-center bg-gray-50 py-2 rounded r' style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`}}>
          <button className='px-3'><box-icon color={category.color ?? "#e5e5e5"} size="15px" name="trash"></box-icon></button>
        <span className='block w-full'>{category.name??''}</span>
        </div>
    )
}