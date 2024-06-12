import React from "react";
import { useContext } from "react";
import ProfileContext from "../../components/context/ProfileContext";
import { Typography } from "@mui/material";
import ProfileLayout from "../../components/user/profile/ProfileLayout";

const UserProfile = () => {
    const {user} = useContext(ProfileContext);
    const {name, email, createdAt, role} = user;
    console.log('am in user profile');

    return (
       <ProfileLayout>
        <Typography variant="body1" color="text.primary" fontWeight="light">
            Nume
        </Typography>
        <Typography variant='h6' color="primary" fontWeight="bold" gutterBottom>
            {name}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="light">
            Email
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            {email}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="light">
            Inregistrat la
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
            {new Date(createdAt).toLocaleDateString()}
        </Typography>
        {role === 1 ? <a href="/admin/dashboard"> Mergi la panoul de administrare </a> : <div></div>}
        </ProfileLayout>
    )
}

export default UserProfile;