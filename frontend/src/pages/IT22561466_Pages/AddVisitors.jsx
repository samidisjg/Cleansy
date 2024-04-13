import React from 'react'

export default function AddVisitors() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Add Visitors</h1>
        <form className='flex flex-col gap-4'>
            <input type='text' placeholder='Owner Name' className='border p-3 rounded-lg' id='ownerName'/>
            <input type='text' placeholder='Guest Name' className='border p-3 rounded-lg' id='guestName'/>
            <input type='text' placeholder='Tel No' className='border p-3 rounded-lg' id='telNo'/>
            <input type='text' placeholder='Date of visit' className='border p-3 rounded-lg' id='date'/>
            <input type='text' placeholder='Time of visit(around)' className='border p-3 rounded-lg' id='time'/>
            <input type='text' placeholder='Purpose of visit' className='border p-3 rounded-lg' id='purpose'/>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Submit</button>
            <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Visitor List</button>
        </form>
    </div>
  )
}
