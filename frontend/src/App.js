import {React, useState, useEffect} from 'react'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddComponents from './pages/admin/AddComponents'
import AdminDashboard from './pages/admin/AdminDashboard'
import UpdateComponents from './pages/admin/UpdateComponent'
import MyCars from './pages/user/myCars/MyCars'
import AddCar from './pages/user/addCar/AddCar'
import SignUpUser from './pages/signup/SignUpUser'
import SignUpService from './pages/signup/SignUpService'
import Layout from './components/Layout'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin navigate={navigate}/>}/>
            <Route path="/signup" element={<Signup navigate={navigate}/>}/>
            <Route path="/signup/user" element={<SignUpUser navigate={navigate}/>}/>
            <Route path="/signup/service" element={<SignUpService navigate={navigate}/>}/>

                <Route path="/dashboard" element={<Profile/>}/>
                <Route path="/mycars" element={<MyCars/>}/>
                <Route path="/addcar" element={<AddCar/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/admin/component/add" element={<AddComponents/>}/>
                <Route path="/admin/component/update" element={<UpdateComponents/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App

