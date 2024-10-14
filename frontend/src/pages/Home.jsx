import React, { useState, useRef, useEffect} from 'react'
import Sidebar from '../components/sidebar'
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from '../components/Header';
import { ChatData } from '../context/chatContext';
import { GiRamProfile } from "react-icons/gi";
import { GiMonoWheelRobot } from "react-icons/gi";
import { MdSend } from "react-icons/md";
import { UserData } from '../context/userContext';
function Home() {
  const [isOpen,setIsOpen] = useState(true)
  const {user} =UserData()
  console.log("on navigation page ",user)
  const toggleSideBar = ( ) => {
    setIsOpen(!isOpen)
  }
  const {chats,fetchResponse,messages,prompt,setPrompt} = ChatData()
  const submitHandler = (e) => {
    e.preventDefault()
    fetchResponse()
  }
  const messagecontainerRef = useRef();

  console.log("home page",messages)

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className='flex h-screen bg-gray-500 text-white'>
      <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar}/>
      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSideBar}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>
        <div className="flex-1 p-6 mb-20 md:mb-0">
        <Header/>
        <div className='flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0' ref={messagecontainerRef}>
          {
            messages &&  messages.length>0? messages.map((e,i)=>(
              <div key={i}>
                    <div className="mb-4 p-4 rounded bg-blue-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                      <GiRamProfile />
                      </div>
                      {e.question}
                    </div>
                    <div className="mb-4 p-4 rounded bg-gray-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                      <GiMonoWheelRobot />
                      </div>
                      {e.summary}
                    </div>

              </div>
            )):<p>No chat yet</p>
          }
        </div>
        </div>
        </div>
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
          <form
            className="flex justify-center items-center"
            onSubmit={submitHandler}
          >
            <input
              className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
              type="text"
              placeholder={`Hey ${user.name}, Let's Interact!`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              //disabled={chats.length === 0 ? "true":"false"}
            />
            <button className="p-4 bg-gray-700 rounded-r text-2xl text-white">
              <MdSend/>
            </button>
          </form>
        </div>
    </div>
  )
}

export default Home