import React from 'react'
import Graph from './Graph'
import Form_01 from './Form_01'

function TaskTracker_01() {
  return (
    <div className='container mx-auto max-w-8xl text-center-drop-shadow-lg'>
        <h1 className='text-4xl py-5 mb-15 bg-slate-800 text-white rounded  font-bold text-center'>Task Tracker</h1>


        {/*grid columns*/}
        <div className='grid md:grid-cols-2 gap-4'>
            {/*chart*/}
            <Graph></Graph>
            {/*Form*/}
            <Form_01></Form_01>
        </div>
    </div>
  )
}

export default TaskTracker_01