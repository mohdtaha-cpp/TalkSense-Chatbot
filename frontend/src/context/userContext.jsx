import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import {server} from '../main'
import { ChatData } from "./chatContext";


const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user,setUser] = useState([])
   // const {fetchChats} = ChatData()
   // const {setChats,setSelectedChat} = ChatData()
    const [isAuth,setAuth] = useState(false)
    async function loginUser(userName,name,navigate,fetchChats) {
        try{
           const {data} = await axios.post(`${server}/api/user/loginUser`, {userName,name})
           toast.success(data.message)
           console.log("before anvigation",user)
           navigate("/")
           console.log(data.user)
           localStorage.setItem("userId", data.user._id);
           fetchUser()
           fetchChats()
           setUser(data.user)
           setAuth(true)
        }catch(error){
             toast.error(error.response.data.message)
        }
    }
    async function fetchUser() {
        try{
           const {data} = await axios.get(`${server}/api/user/myProfile`, {
            headers: {
                id: localStorage.getItem("userId")
            }
           })
           setUser(data)
           setAuth(true)
        }catch(error){
            console.log(error)
            setAuth(false)
        }
    }
    useEffect(() => {
      fetchUser()
    }, [])

    const logoutHandler = (navigate) => {
        localStorage.clear()
        setAuth(false)
        toast.success(`Bye Bye ${user.name}, will meet soon!`)
        //setSelectedChat(null)
        setUser([])
        window.location.reload()
        navigate("/login")
    }
    
    return (
        <UserContext.Provider value={{loginUser,logoutHandler,user,isAuth}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext)