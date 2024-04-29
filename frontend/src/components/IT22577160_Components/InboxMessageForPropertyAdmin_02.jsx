import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { Button, TextInput } from 'flowbite-react';

const InboxMessageForPropertyAdmin_02 = () => {
   const { currentUser } = useSelector((state) => state.user);
   const [conversations, setConversations] = useState([]);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      const getAdminConversation = async () => {
         try {
            const res = await fetch(`/api/conversation/getAdminConversation/${currentUser._id}`);
            const data = await res.json();
            setConversations(data);
         } catch (error) {
            console.log(error);   
         }
      }
      getAdminConversation();
   }, [currentUser])

  return (
    <div className="w-[90%] bg-white dark:border-gray-700 dark:bg-gray-800 m-5 h-[85vh] overflow-y-scroll rounded scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 shadow-md ">
      {
         !open && (
            <>
               <h1 className="text-center py-3 font-extrabold text-3xl underline">All Messages</h1>
               {/* All messages list */}
               {
                  conversations && conversations.map((conversation, index) => (
                     <MessageList data={conversation} key={index} index={index} setOpen={setOpen} /> 
                  ))
               }
            </>
         ) 
      }
      {
         open && (
            <AdminInbox setOpen={setOpen} />
         )
      }
    </div>
  )
}

const MessageList = ({data, index, setOpen}) => {
   const [active, setActive] = useState(0);
   const navigate = useNavigate();
   const handleClick = (id) => {
      navigate(`?${id}`)
      setOpen(true);
   }
   return (
      <div className={`w-full flex p-3 px-3 cursor-pointer ${active === index ? 'bg-[#00000010]' : 'bg-transparent'}`} onClick={(e) => setActive(index) || handleClick(data._id)}>
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

const AdminInbox = ({setOpen}) => {
   return (
      <div className='w-full min-h-full flex flex-col justify-between'>
         {/* message header */}
         <div className="w-full flex p-3 items-center justify-between bg-slate-200 dark:bg-slate-700">
            <div className="flex">
               <img src="https://firebasestorage.googleapis.com/v0/b/cleansy-ea4f4.appspot.com/o/1709625107991Ramiyh.jpg?alt=media&token=e1aaeb7a-7379-4c3a-a9a3-944679424d15" alt="" className='w-[60px] h-[60px] rounded-full'/>
               <div className="pl-3">
                  <h1 className="text-lg font-semibold">Ramindu Nimesh</h1>
                  <h1>Active now</h1>
               </div>
            </div>
            <FaArrowRight size={15} onClick={() => setOpen(false)} className='cursor-pointer'/>
         </div>

         {/* messages */}
         <div className="px-3 h-[66vh] py-3 overflow-y-scroll">
            <div className="flex w-full my-2">
               <img src="https://firebasestorage.googleapis.com/v0/b/cleansy-ea4f4.appspot.com/o/1709625107991Ramiyh.jpg?alt=media&token=e1aaeb7a-7379-4c3a-a9a3-944679424d15" alt="" className='w-[40px] h-[40px] rounded-full mr-3'/>
               <div className="w-max bg-teal-400 text-white h-min p-2 rounded-md">
                  <p>Hello There</p>
               </div>
            </div>
            <div className="flex w-full my-2 justify-end">
               <div className="w-max bg-teal-400 text-white h-min p-2 rounded-md">
                  <p>Hello!</p>
               </div>
            </div>
         </div>

         {/* send message input */}
         <form aria-required={true} className='p-3 relative w-full'>
            <TextInput type='text' placeholder='Enter Your Message...' required />
            <Button type='submit' id='send' gradientDuoTone='purpleToBlue' className='hidden'>Send</Button>
            <label htmlFor="send">
               <AiOutlineSend size={25} className='cursor-pointer absolute right-4 top-5'/>
            </label>
         </form>
      </div>
   )
}

export default InboxMessageForPropertyAdmin_02