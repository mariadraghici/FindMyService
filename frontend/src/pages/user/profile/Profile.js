import React, {useState, useEffect} from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserSidebar from '../../../components/user/UserSidebar';
import './profile.css';

const Profile = () => {

    const [profile, setProfile] = useState("");
    const {name, email, createdAt, role} = profile;

    console.log(profile);

    useEffect(() => {
        fetch("/api/profile")
        .then(res => res.json())
        .then(result => {
            setProfile(result.user);
        })
        .catch(err => console.log(err));
    }, []);

  return (
    <div>
      <Header/>
      <div className="container container-padding">
        <div className="row">
          <div className="col-3">
            <UserSidebar/>
          </div>

          <div className="col-8">
            <div className='card card-dashboard'>
              <div className='card-header'>
                  <h4>My Profile</h4>
              </div>
              <div className='card-body'>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Joined at: {new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        {role === 1 ? <a href="/admin/dashboard"> Go to admin panel </a> : <div></div>}
        </div>
      <Footer/>
    </div>
  )
}

export default Profile
