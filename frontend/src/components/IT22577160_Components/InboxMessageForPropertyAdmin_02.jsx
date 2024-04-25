import React from 'react'

const InboxMessageForPropertyAdmin_02 = () => {
  return (
    <div className="w-[90%] bg-white dark:border-gray-700 dark:bg-gray-800 m-5 h-[85vh] overflow-y-scroll rounded scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 shadow-md ">
      <h1 className="text-center py-3 font-extrabold text-3xl underline">All Messages</h1>
      {/* All messages list */}
      <MessageList /> 
    </div>
  )
}

const MessageList = () => {
   return (
      <div className="w-full flex p-3 px-3 bg-[#00000010] cursor-pointer">
         <div className="relative">
            <img src="https://firebasestorage.googleapis.com/v0/b/cleansy-ea4f4.appspot.com/o/1709625107991Ramiyh.jpg?alt=media&token=e1aaeb7a-7379-4c3a-a9a3-944679424d15" alt="" className='w-[50px] h-[50px] rounded-full'/>
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
         </div>
         <div className="pl-3">
            <h1 className="text-lg">Ramindu Nimesh</h1>
            <p className="text-base text-[#000c]">You: Yeh, I am Good</p>
         </div>
      </div>
   )
}

export default InboxMessageForPropertyAdmin_02