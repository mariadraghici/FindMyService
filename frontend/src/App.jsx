import {React, useState} from 'react'
import './App.css'
import {useEffect} from 'react'
import myAxios from './components/axios/axios'
import Home from './pages/Home'
import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import AddComponents from './pages/admin/AddComponents'
import AdminDashboard from './pages/admin/AdminDashboard'
import UpdateComponents from './pages/admin/UpdateComponent'
import MyCars from './pages/user/myCars/MyCars'
import AddCar from './pages/user/addCar/AddCar'
import SignUpUser from './pages/signup/SignUpUser'
import SignUpService from './pages/signup/SignUpService'
import Layout from './components/Layout'
import ProfileContext from './components/context/ProfileContext'
import SearchService from './pages/user/SearchService'
import ServiceContext from './components/context/ServiceContext'
import PresentationPage from './pages/service/PresentationPage'
import OffersPage from './pages/service/OffersPage'
import Theme from './Theme';
import HeaderPositionContext from './components/context/HeaderPosition'

function App() {
  const [user, setUser] = useState(false);
  const [service, setService] = useState(false);
  const [headerPosition, setHeaderPosition] = useState('static');

  return (
    <>
    <BrowserRouter>
    <Theme>
    <ProfileContext.Provider value={{user, setUser}}>
      <HeaderPositionContext.Provider value={{headerPosition, setHeaderPosition}}>
      <ServiceContext.Provider value={{service, setService}}>
      <Toaster />
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signup/user" element={<SignUpUser/>}/>
            <Route path="/signup/service" element={<SignUpService/>}/>

            <Route path="/profile" element={<Profile/>}/>
            <Route path="/mycars" element={<MyCars/>}/>
            <Route path="/addcar" element={<AddCar/>}/>
            <Route path="/search" element={<SearchService/>}/>
            <Route path="/service/page/:name" element={<PresentationPage/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/component/add" element={<AddComponents/>}/>
            <Route path="/admin/component/update" element={<UpdateComponents/>}/>
            <Route path="/service/offers" element={<OffersPage/>}/>
          </Route>
        </Routes>
      </ServiceContext.Provider>
      </HeaderPositionContext.Provider>
    </ProfileContext.Provider>
    </Theme>
    </BrowserRouter>
    </>
  )
}

export default App

