import React from "react";
import { useContext } from "react";
import ProfileContext from "../../components/context/ProfileContext";

const ServiceProfile = () => {
    const {user} = useContext(ProfileContext);
    const {name, email, createdAt, address, location, phone, description} = user;
    return (
        <div className="container container-padding">
                <div className='card card-dashboard'>
                <div className='card-header'>
                    <h4>My Profile</h4>
                </div>
                <div className='card-body'>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Joined at: {new Date(createdAt).toLocaleDateString()}</p>
                    <p>Address: {address}</p>
                    <p>Location: {location.name}</p>
                    <p>Phone: {phone}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceProfile;