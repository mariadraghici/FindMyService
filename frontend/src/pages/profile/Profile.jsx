import React, {useContext} from 'react'
import './profile.css';
import UserProfile from '../user/UserProfile';
import ProfileContext from '../../components/context/ProfileContext';
import ServiceProfile from '../service/ServiceProfile';

const Profile = () => {
  const {user} = useContext(ProfileContext);

  return (
    <>
      {user && (user.role === 1 || user.role === 0) && <UserProfile/>}
      {user && (user.role === 2) && <ServiceProfile/>}
    </>
  )
}

export default Profile
