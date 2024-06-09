import React, {useContext, useEffect} from 'react'
import './profile.css';
import UserProfile from '../user/UserProfile';
import ProfileContext from '../../components/context/ProfileContext';
import ServiceProfile from '../service/ServiceProfile';
import { getProfile } from '../../api/profileApi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user, setUser} = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    }

    fetchProfile();
    if (!user) {
      navigate('/signin', {replace: true});
    }
  }, []);

  return (
    <>
      {user && (user.role === 1 || user.role === 0) && <UserProfile/>}
      {user && (user.role === 2) && <ServiceProfile/>}
    </>
  )
}

export default Profile
