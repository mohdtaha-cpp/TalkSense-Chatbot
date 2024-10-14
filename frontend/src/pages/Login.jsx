import React, { useState } from 'react';
import { UserData } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { ChatData } from '../context/chatContext';

function Login() {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const {loginUser} = UserData()
    const {fetchChats} = ChatData()
    const navigate = useNavigate()
    const submitHandler = (e) => {
          e.preventDefault()
         loginUser(userName,name,navigate,fetchChats)
    }
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }} // Corrected style
    >
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome to TalkSense</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="text"
              >
                Name
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="text"
              >
                UserName
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                placeholder="Enter your UserName"
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
