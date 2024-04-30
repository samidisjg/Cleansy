import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { Button, TextInput } from 'flowbite-react';
import moment from 'moment'
import socketIO from "socket.io-client";
const ENDPOINT = 'http://localhost:4000/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const UserCoversation_02 = () => {
   const { currentUser } = useSelector((state) => state.user);
   const [conversations, setConversations] = useState([]);
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [currentChat, setCurrentChat] = useState();
   const [userData, setUserData] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState("");
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [activeStatus, setActiveStatus] = useState(false);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      socketId.on("getMessage", (data) => {
         setArrivalMessage({
            senderId: data.senderId,
            text: data.text,
            createdAt: Date.now(),
         });
      });
   }, [])

   useEffect(() => {
      arrivalMessage && 
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat])

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
   }, [currentUser, messages])

   useEffect(() => {
      if(currentUser) {
         const userId = currentUser?._id;
         socketId.emit("addUser", userId);
         socketId.on("getUsers", (users) => {
            setOnlineUsers(users);
         })
      }
   }, [currentUser])

   const onlineCheck = (chat) => {
      const chatMembers = chat.members.find((member) => member !== currentUser?._id);
      const online = onlineUsers.find((user) => user.userId === chatMembers);

      return online ? true : false;
   }

   // get Messages
   useEffect(() => {
      const fetchMessages = async () => {
         try {
            const res = await fetch(`/api/messages/getAllMessages/${currentChat?._id}`);
            const data = await res.json();
            setMessages(data);
         } catch (error) {
            console.log(error);
         }
      }
      fetchMessages();
   }, [currentChat])

   // create new message
   const sendMessageHandler = async (e) => {
      e.preventDefault();
      const message = {
         sender: currentUser._id,
         text: newMessage,
         conversationId: currentChat._id,
      }

      const receiverId = currentChat.members.find(
         (member) => member.id !== currentUser._id
      );

      socketId.emit("sendMessage", {
         senderId: currentUser._id,
         receiverId,
         text: newMessage,
      })

      try {
         if(newMessage !== '') {
            const res = await fetch('/api/messages/createNewMessage', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(message)
            });

            if(res.ok) {
               const data = await res.json();
               setMessages([...messages, data.message]);
               updateLastMessage();
            }
         }
      } catch (error) {
         console.log(error);
      }
   }

   const updateLastMessage = async () => {
      socketId.emit("updateLastMessage", {
         lastMessage: newMessage,
         lastMessageId: currentUser._id,
      })

      try {
         const res = await fetch(`/api/conversation/updateLastMessage/${currentChat._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               lastMessage: newMessage,
               lastMessageId: currentUser._id,
            })
         })
   
         if(res.ok) {
            const updatedConversation = await res.json();
            console.log(updatedConversation);
            setNewMessage("");
         }
      } catch (error) {
         console.log(error);
      }
   }

  return (
    <div className='w-full'>
      {
         !open && (
            <>
               <h1 className="text-center py-3 font-extrabold text-3xl underline">All Messages</h1>
               {/* All messages list */}
               {
                  conversations && conversations.map((conversation, index) => (
                     <MessageList data={conversation} key={index} index={index} setOpen={setOpen} setCurrentChat={setCurrentChat} me={currentUser._id} setUserData={setUserData} userData={userData} online={onlineCheck(conversation)} setActiveStatus={setActiveStatus} /> 
                  ))
               }
            </>
         ) 
      }
      {
         open && (
            <UserInbox setOpen={setOpen} newMessage={newMessage} setNewMessage={setNewMessage} sendMessageHandler={sendMessageHandler} messages={messages} adminId={currentUser._id} userData={userData} activeStatus={activeStatus} />
         )
      }
    </div>
  )
}

const MessageList = ({data, index, setOpen, setCurrentChat, me, setUserData, userData, online, setActiveStatus }) => {
   const [active, setActive] = useState(0);
   const [user, setUser] = useState([]);
   const navigate = useNavigate();
   const handleClick = (id) => {
      navigate(`?${id}`)
      setOpen(true);
   }
   useEffect(() => {
      setActiveStatus(online)
      const userId = data.members.find((user) => user != me);

      const getUser = async () => {
         try {
            const res = await fetch(`/api/user/${userId}`);
            const data = await res.json();
            setUser(data);
         } catch (error) {
            console.log(error);
         }
      }
      getUser();
   }, [me, data])
   return(
      <div className={`w-full flex p-3 px-3 cursor-pointer ${active === index ? 'bg-[#00000010]' : 'bg-transparent'}`} onClick={(e) => setActive(index) || handleClick(data._id) || setCurrentChat(data) || setUserData(user) || setActiveStatus(online)}>
         <div className="relative">
            <img src={userData?.profilePicture} alt="" className='w-[50px] h-[50px] rounded-full'/>
            {
               online ? (
                  <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
               ) : (
                  <div className="w-[12px] h-[12px] bg-gray-400 rounded-full absolute top-[2px] right-[2px]" />
               )
            }
         </div>
         <div className="pl-3">
            <h1 className="text-lg">{userData?.username}</h1>
            <p className="text-base text-[#000c]">{data.lastMessageId !== userData?._id ? "You:": userData?.username?.split(" ")[0] + ": "} {data?.lastMessage}</p>
         </div>
      </div>
   )
}

const UserInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, adminId, userData, activeStatus }) => {
   return (
      <div className='w-full min-h-full flex flex-col justify-between'>
         {/* message header */}
         <div className="w-full flex p-3 items-center justify-between bg-slate-200 dark:bg-slate-700">
            <div className="flex">
               <img src={userData?.profilePicture} alt="" className='w-[60px] h-[60px] rounded-full'/>
               <div className="pl-3">
                  <h1 className="text-lg font-semibold">{userData?.username}</h1>
                  <h1>{activeStatus ? "Active Now" : ""}</h1>
               </div>
            </div>
            <FaArrowRight size={15} onClick={() => setOpen(false)} className='cursor-pointer'/>
         </div>

         {/* messages */}
         <div className="px-3 h-[66vh] py-3 overflow-y-scroll">
         {
            messages && messages.map((message, index) => (
                  <div key={index} className={`flex w-full my-2 ${message?.sender === adminId ? 'justify-end': 'justify-start'}`}>
                     {
                        message?.sender !== adminId ? (
                           <img src="https://firebasestorage.googleapis.com/v0/b/cleansy-ea4f4.appspot.com/o/1709625107991Ramiyh.jpg?alt=media&token=e1aaeb7a-7379-4c3a-a9a3-944679424d15" alt="" className='w-[40px] h-[40px] rounded-full mr-3'/>
                        ) : null 
                     }
                     <div>
                        <div className="w-max bg-teal-400 text-white h-min p-2 rounded-md">
                           <p>{message?.text}</p>
                        </div>
                        <p className='text-gray-500 text-xs pt-1'>{moment(message?.createdAt).fromNow()}</p>
                     </div>
                  </div>
            ))
         }
         </div>

         {/* send message input */}
         <form aria-required={true} className='p-3 relative w-full' onSubmit={sendMessageHandler}>
            <TextInput type='text' placeholder='Enter Your Message...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} required />
            <Button type='submit' id='send' gradientDuoTone='purpleToBlue' className='hidden'>Send</Button>
            <label htmlFor="send">
               <AiOutlineSend size={25} className='cursor-pointer absolute right-4 top-5'/>
            </label>
         </form>
      </div>
   )
}

export default UserCoversation_02