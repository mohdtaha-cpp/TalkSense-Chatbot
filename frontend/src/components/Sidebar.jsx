import React, { useEffect } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from '../context/chatContext';
import { MdDelete } from "react-icons/md";
import Spinning from './Spinning';
import { UserData } from '../context/userContext';
import {AdminData} from '../context/adminContext'
import { useNavigate } from 'react-router-dom';


function Sidebar({isOpen,toggleSideBar}) {
    const {chats,createChat,selectedChat,setSelectedChat,deleteChat,createLod,setChats,setMessages} = ChatData()
    const {fetchUsersConversations,currentRoute} =AdminData()
    const navigate = useNavigate()
    const deleteHandling = (id) => {
        deleteChat(id)
        setSelectedChat(null)
    }
    const {logoutHandler} = UserData()
    const logoutHandling = (navigate) => {
        logoutHandler(navigate)
       // setSelectedChat(null)
        //setChats([])

    }
    const adminRedirection = () =>{
        fetchUsersConversations(navigate)
    }
    const clickEvent = (id) => {
        setSelectedChat(id)
        toggleSideBar()
    }
   // console.log("I am from sidebar",chats)
   console.log(selectedChat)
   console.log(chats.length)
  return (
    <div
      className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
        <button onClick={toggleSideBar} className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl'>  
        <IoIosCloseCircle/>
        </button>
        <div className="text-2xl font-semibold mb-6">TalkSense</div>
        <div className="mb-4">
        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded" onClick={createChat}>
        {createLod ? <Spinning/> : "New Chat +"}
        </button> 
      </div>
      
      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>
        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0">
              {
                chats && chats.length > 0 ? (
                    chats.map((e) => (
                     <button key={e._id}
                    className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center"
                    onClick={() => clickEvent(e._id)}>
                      <span>{e.latestMessage.slice(0,40)}....</span>
                      <button
                          className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
                          onClick={() => deleteHandling(e._id)}>
                          <MdDelete/>
                         </button>
                        </button>
                    ))
                ) : (<p>No chats yet</p>)
                
              }
        </div>
        </div>
        <div className="absolute bottom-0 mb-6 w-full flex justify-center gap-5">
       <button type="button" onClick={logoutHandling} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
       <button type="button" onClick={adminRedirection} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Admin</button>
</div>

    </div>
  )
}

export default Sidebar