import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { UserData } from './context/userContext'



function App() {
  const {user,isAuth} = UserData()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {isAuth? <Home/> : <Login/>} />
          <Route path='/login' element = {isAuth? <Home/>:<Login/>} />
          <Route path='/admin' element = <Admin/> />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App