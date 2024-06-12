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
import PresentationPage from './pages/service/presentationPage/PresentationPage'
import OffersPage from './pages/service/OffersPage'
import Theme from './Theme';
import SocketContext from './components/context/SocketContext'
import io from "socket.io-client";
import OffersNotificationsCounter from './components/context/OffersNotificationsCounter'
import { getProfile } from './api/profileApi'
import NewOffers from './components/context/NewOffers'

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState(null);
  const [newOffers, setNewOffers] = useState([]);
  const [offersNotificationsCounter, setOffersNotificationsCounter] = useState(0);

  console.log('am in app');

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
          console.log('received message');
          const res = await myAxios.put('/api/service/updateAndGetNewOffers', { userId: user._id, offer: data});
          setOffersNotificationsCounter(res.data.user.newOffers.length);
          setNewOffers(res.data.user.newOffers);
        } catch (error) {
          console.log(error);
        }
      });

      return () => {
        socket.off('receive-message');
      };
    }
  }, [user, socket]);


  return (
    <BrowserRouter>
      <Theme>
        <SocketContext.Provider value={socket}>
          <NewOffers.Provider value={{newOffers, setNewOffers}}>
            <OffersNotificationsCounter.Provider value={{offersNotificationsCounter, setOffersNotificationsCounter}}>
              <ProfileContext.Provider value={{user, setUser}}>
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
              </ProfileContext.Provider>
            </OffersNotificationsCounter.Provider>
          </NewOffers.Provider>
        </SocketContext.Provider>
      </Theme>
    </BrowserRouter>
  )
}

export default App

