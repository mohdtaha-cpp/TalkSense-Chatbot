import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import { server } from "../main";
import toast from 'react-hot-toast'

const ChatContext = createContext()
export const ChatProvider = ({children}) => {
    const [prompt,setPrompt] = useState("")
    const [messages,setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [selectedChat,setSelectedChat] = useState(null)
    

    


    async function fetchResponse () {
        if(prompt === "") return alert("Write Prompt");
        setPrompt("")
        if(!selectedChat) return toast.error("First create New Chat then interact")
        try{
             
            console.log("gemini All",selectedChat)
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
                method: "post",
                data: {
                  contents: [{ parts: [{ text: prompt }] }],
                },
              })
            const message = {
                question: prompt,
                summary: response["data"]["candidates"][0]["content"]["parts"][0]["text"].trim().replace(/\\n/g, '\n'),
                result_text: response["data"]["candidates"][0]["content"]["parts"][0]["text"].trim().replace(/\\n/g, '\n')
            }
            const {data} = await axios.post(`${server}/api/chat/${selectedChat}`,{
            
                "question": prompt,
                "answer": response["data"]["candidates"][0]["content"]["parts"][0]["text"],
                "table": "",
                "chart": "",
                "error": ""
    },
    {
        headers:{
            id: localStorage.getItem("userId")
        }
    }

        )
    
            setMessages((prev) => [...prev,message])
    }catch(error)
    {
        console.log("createchatapi error",error);
    }
    }


    async function fetchChats(){
        try{
            console.log("from fetchChats",localStorage.getItem("userId"))
            const { data } = await axios.get(`${server}/api/chat/all`, {
                headers: {
                  id: localStorage.getItem("userId"),
                },
              });
              console.log(data)
              setChats(data)
              setSelectedChat(data[0]._id)
        }catch(error)
        {
            console.log(error.message)
        }
    }
    const [createLod, setCreateLod] = useState(false);
    async function createChat() {
        setCreateLod(true)
        try {
          const { data } = await axios.post(
            `${server}/api/chat/new`,
            {},
            {
              headers: {
                id: localStorage.getItem("userId"),
              },
            }
          );

    
          fetchChats();
          setCreateLod(false)
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    async function fetchMessage(){
        try{
            console.log(selectedChat)
            const {data} = await axios.get(`${server}/api/chat/${selectedChat}`,{
                headers:{
                    id: localStorage.getItem("userId")
                }
            })
            setMessages(data)

        }catch(error)
        {
            console.log(error.message)
          //  toast.error("Something Went Wrong")
        }
    }
    async function deleteChat(id) {
        try{
            const {data} = await axios.delete(`${server}/api/chat/${id}`,{
                headers:{
                    id: localStorage.getItem("userId")
                }
            })
            toast.success(data.message);
            fetchChats()
            window.location.reload()

        }catch(error)
        {
            toast.error("Something Went Wrong in deleting chat")
        }
    }
    useEffect(() => {
     fetchChats()
    }, [])
    useEffect(() => {
        console.log("Updated Chats:", chats);
      }, [chats]);
      useEffect(() => {
        if(selectedChat !== null)
        fetchMessage()
      },[selectedChat])
    
     return <ChatContext.Provider value={{fetchResponse,fetchChats,messages,setMessages,prompt,createLod,deleteChat,setPrompt,chats,setChats,createChat,selectedChat,setSelectedChat,fetchMessage}}>{children}</ChatContext.Provider>
}

export const ChatData = () => useContext(ChatContext) 