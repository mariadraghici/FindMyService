import React from "react";
import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { Typography } from "@mui/material";
import ProfileLayout from "../../components/user/profile/ProfileLayout";

const UserProfile = () => {
    const {user} = useContext(ProfileContext);
    const {name, email, createdAt, role} = user;

    return (
       <ProfileLayout withCard={true}>
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
        <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            {new Date(createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="light">
            Rol
        </Typography>
        {role !== 1 &&
        <Typography variant="h6" color="primary" fontWeight="bold">
            {role === 0 ? 'User' : 'Service'}
        </Typography>}
        {role === 1 && <Typography variant="h6" color="primary" fontWeight="bold">
            Admin
        </Typography>}
        </ProfileLayout>
    )
}

export default UserProfile;