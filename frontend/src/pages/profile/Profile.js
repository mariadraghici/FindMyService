import React, {useState, useEffect} from 'react'
import './profile.css';
import UserProfile from '../user/UserProfile';
import myAxios from '../../components/axios';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const {name, email, role, createdAt} = profile;

    useEffect(() => {
        myAxios.get('api/profile')
        .then(res => {
            console.log(res.data);
            setProfile(res.data.user);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

  return (
    <>
      {(role === 1 || role === 0) && <UserProfile name={name} email={email} createdAt={createdAt} role={role}/>}
    </>
  )
}

export default Profile
