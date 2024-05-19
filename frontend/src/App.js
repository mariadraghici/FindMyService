import {React, useState} from 'react'
import './App.css'
import {useEffect} from 'react'
import {toast} from 'react-toastify'
import myAxios from './components/axios/axios'
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
import ProfileContext from './components/context/ProfileContext'
import SearchService from './pages/user/SearchService'
import ServiceContext from './components/context/ServiceContext'
import PresentationPage from './pages/service/PresentationPage'
// import MyFeedback from './pages/user/feedback/MyFeedback'

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [service, setService] = useState(false);

  const getProfile = async() => {
    try {
      const res = await myAxios.get('/api/profile');
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      //toast.error("Please sign in to access the page!");
    }
  }

  useEffect(() => {
    getProfile();
  } , []);

  return (
    <>
    <ProfileContext.Provider value={{user, setUser}}>
      <ServiceContext.Provider value={{service, setService}}>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin navigate={navigate}/>}/>
            <Route path="/signup" element={<Signup navigate={navigate}/>}/>
            <Route path="/signup/user" element={<SignUpUser navigate={navigate}/>}/>
            <Route path="/signup/service" element={<SignUpService navigate={navigate}/>}/>

            <Route path="/profile" element={<Profile/>}/>
            {/* <Route path="/feedback" element={<MyFeedback/>}/> */}
            <Route path="/mycars" element={<MyCars/>}/>
            <Route path="/addcar" element={<AddCar/>}/>
            <Route path="/search" element={<SearchService/>}/>
            <Route path="/service/page/:name" element={<PresentationPage/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/component/add" element={<AddComponents/>}/>
            <Route path="/admin/component/update" element={<UpdateComponents/>}/>
          </Route>
        </Routes>
      </ServiceContext.Provider>
    </ProfileContext.Provider>
    </>
  )
}

export default App

