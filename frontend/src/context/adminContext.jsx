import { createContext, useContext, useEffect, useState } from "react";
import {server} from '../main'
import { UserData } from "./userContext";
import Admin from "../pages/Admin";
import toast from "react-hot-toast";
import axios from "axios";

const AdminContext = createContext()


export const AdminProvider = ({children}) => {
    
    const [adminResponse,setAdminResponse] = useState([]);
    const [currentRoute,setCurrentRoute] = useState('')
    const {user} = UserData()
    async function fetchUsersConversations(navigate) {
        try{
        const {data} = await axios.get(`${server}/api/admin/${user._id}`)
        toast.error(data.message)
        console.log("before directing to admin page",data)
        navigate("/admin")
        setAdminResponse(data);
        console.log("Admin reposnse",adminResponse)   
        }catch(error)
        {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
            console.log("Admin reposnse 1",adminResponse)
         //   setCurrentRoute('/admin')
            
    },[adminResponse]) 

    
   return (<AdminContext.Provider value={{adminResponse,fetchUsersConversations,currentRoute}}>{children}</AdminContext.Provider>)
}

export const AdminData = () => useContext(AdminContext)