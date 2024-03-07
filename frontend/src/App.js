import React from 'react'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/user/profile/Profile'
import {Route, Routes, useNavigate} from 'react-router-dom'
import PrivateRoute from './components/route-components/Privateroute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddComponents from './pages/admin/AddComponents'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/route-components/Adminroute'
import UpdateComponents from './pages/admin/UpdateComponent'


function App() {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin navigate={navigate}/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
          <Route path="/admin/component/add" element={<AdminRoute><AddComponents/></AdminRoute>}/>
          <Route path="/admin/component/update" element={<AdminRoute><UpdateComponents/></AdminRoute>}/>
        </Routes>
    </>
  )
}

export default App

