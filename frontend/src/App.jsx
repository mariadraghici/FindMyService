import React, {useState, Suspense, lazy} from 'react'
import './App.css'
import {useEffect} from 'react'
import myAxios from './components/axios/axios'
import Home from './pages/Home'
// const Home = lazy(() => import('./pages/Home'))
// const Signin = lazy(() => import('./pages/signin/Signin'))
// const Signup = lazy(() => import('./pages/signup/Signup'))
// const Profile = lazy(() => import('./pages/profile/Profile'))
// const AddComponents = lazy(() => import('./pages/admin/AddComponents'))
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
// const UpdateComponents = lazy(() => import('./pages/admin/UpdateComponent'))
// const UserCars = lazy(() => import('./pages/user/userCars/UserCars'))
// const AddCar = lazy(() => import('./pages/user/addCar/AddCar'))
// const SignUpUser = lazy(() => import('./pages/signup/SignUpUser'))
// const SignUpService = lazy(() => import('./pages/signup/SignUpService'))
// const SearchService = lazy(() => import('./pages/user/SearchService'))
// const PresentationPage = lazy(() => import('./pages/service/presentationPage/PresentationPage'))
// const OffersPage = lazy(() => import('./pages/service/OffersPage'))
// const Posts = lazy(() => import('./pages/Posts'))
// const ValidationSucces = lazy(() => import('./pages/user/ValidationSucces'))
// const UserAuctions = lazy(() => import('./pages/user/userAuctions/UserAuctions'))
// const RecommendService = lazy(() => import('./pages/user/RecommendService'))
// const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
// const ResetPassword = lazy(() => import('./pages/ResetPassword'))

import Signin from './pages/signin/Signin'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import AddComponents from './pages/admin/AddComponents'
import AdminDashboard from './pages/admin/AdminDashboard'
import UpdateComponents from './pages/admin/UpdateComponent'
import UserCars from './pages/user/userCars/UserCars'
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
import Posts from './pages/Posts'
import ValidationSucces from './pages/user/ValidationSucces'
import UserAuctions from './pages/user/userAuctions/UserAuctions'
import PrivateRoute from './components/PrivateRoute'
import RecommendService from './pages/user/RecommendService'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState(null);
  const [newOffers, setNewOffers] = useState([]);
  const [offersNotificationsCounter, setOffersNotificationsCounter] = useState(0);

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
          const res = await myAxios.put('/api/service/updateAndGetNewOffers', { userId: user._id, offer: data});
          setOffersNotificationsCounter(res.data.user.newOffers.length);
          setNewOffers(res.data.user.newOffers);
        } catch (error) {
          // console.log(error);
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
                <Layout>
                  <Routes>
                    {/* <Route path="/" element={<Layout/>}> */}
                      <Route path="/" element={<Home/>}/>
                      <Route path="/signin" element={<Signin />}/>
                      <Route path="/signup" element={<Signup/>}/>
                      <Route path="/signup/user" element={<SignUpUser/>}/>
                      <Route path="/signup/service" element={<SignUpService/>}/>
                      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                      <Route path="/account-verified" element={<ValidationSucces/>}/>
                      <Route path="/updatepassword" element={<ResetPassword/>}/>

                      <Route path="/serviceRecommendation" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                        <RecommendService/>
                        </PrivateRoute>
                      }/>

                      {/* <PrivateRoute user={user} role={[0, 1, 2]}> */}
                      <Route path="/profile" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                          <Profile/>
                        </PrivateRoute>
                        }/>
                      <Route path="/mycars" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                          <UserCars/>
                        </PrivateRoute>
                        }/>
                      <Route path="/addcar" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                          <AddCar/>
                        </PrivateRoute>
                        }/>
                      <Route path="/myauctions" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                          <UserAuctions/>
                        </PrivateRoute>
                        }/>
                      <Route path="/search" element={
                        <PrivateRoute user={user} role={[0, 1]}>
                          <SearchService/>
                        </PrivateRoute>
                        }/>
                      <Route path="/service/page/:name" element={
                        <PrivateRoute user={user} role={[0, 1, 2]}>
                        <PresentationPage/>
                        </PrivateRoute>
                        }/>
                      <Route path="/admin/dashboard" element={
                        <PrivateRoute user={user} role={[1]}>
                          <AdminDashboard/>
                        </PrivateRoute>
                        }/>
                      <Route path="/admin/component/add" element={
                        <PrivateRoute user={user} role={[1]}>
                        <AddComponents/>
                        </PrivateRoute>
                        }/>
                      <Route path="/admin/component/update" element={
                        <PrivateRoute user={user} role={[1]}>
                        <UpdateComponents/>
                        </PrivateRoute>
                        }/>
                      <Route path="/service/offers" element={
                        <PrivateRoute user={user} role={[1, 2]}>
                          <OffersPage/>
                        </PrivateRoute>
                        }/>
                      <Route path="/auctions" element={
                        <PrivateRoute user={user} role={[0, 1, 2]}>
                        <Posts/>
                        </PrivateRoute>
                        }/>
                  </Routes>
                </Layout>
              </ProfileContext.Provider>
            </OffersNotificationsCounter.Provider>
          </NewOffers.Provider>
        </SocketContext.Provider>
      </Theme>
    </BrowserRouter>
  )
}

export default App

