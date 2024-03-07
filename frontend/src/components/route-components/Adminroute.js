import React, {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const auth = localStorage.getItem('jwt');
    
    const [profile, setProfile] = useState("");
    const {name, email, createdAt, role} = profile;

    useEffect(() => {
        fetch("/api/profile")
        .then(res => res.json())
        .then(result => {
            setProfile(result.user);
        })
        .catch(err => console.log(err));
    }, []);

    while (profile === "") {
        return <div>Loading...</div>
    }

    if (role === 0 || !auth) {
        return <Navigate to="/signin" />;
    }

    return children;

}

export default AdminRoute;