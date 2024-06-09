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
import PresentationPage from './pages/service/presentationPage/PresentationPage'
import OffersPage from './pages/service/OffersPage'
import Theme from './Theme';
import HeaderPositionContext from './components/context/HeaderPosition'
import SocketContext from './components/context/SocketContext'
import io from "socket.io-client";
import NotificationsCounter from './components/context/NotificationsCounter'
import { getProfile } from './api/profileApi'

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState(null);
  const [service, setService] = useState(false);
  const [headerPosition, setHeaderPosition] = useState('static');
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {

    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setUser(profile);
      } else {
        setUser(null);
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    if (user && user.role === 2) {
      socket.emit("join-room", user.socketNumber);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 2) {
      socket.on('receive-message', async (data) => {
        try {
          const res = await myAxios.put('/api/service/offers', { userId: user._id });
          setNotifications(res.data.user.newOffers);
        } catch (error) {
          console.log(error);
        }
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off('receive-message');
      };
    }
  }, [user, socket]);


  return (
    <>
    <BrowserRouter>
    <Theme>
    <SocketContext.Provider value={socket}>
      <NotificationsCounter.Provider value={{notifications, setNotifications}}>
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
      </NotificationsCounter.Provider>
    </SocketContext.Provider>
    </Theme>
    </BrowserRouter>
    </>
  )
}

export default App

