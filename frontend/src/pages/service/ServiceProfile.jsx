import React from "react";
import { useContext } from "react";
import ProfileContext from "../../components/context/ProfileContext";
import { getProfile } from "../../api/profileApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

const ServiceProfile = () => {
    const {user, setUser} = useContext(ProfileContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = await getProfile();
            if (user) {
                setUser(user);
            }
        }

        fetchProfile();
        if (!user) {
            navigate('/signin', {replace: true});
        }

    }, []);


    const {name, email, createdAt, address, city, phone, description} = user;
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
        <Card sx={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <CardContent>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h9'>Name: {name}</Typography>
                    <Typography variant='h9'>Email: {email}</Typography>
                    <Typography variant='h9'>Joined at: {new Date(createdAt).toLocaleDateString()}</Typography>
                    <Typography variant='h9'>Address: {address.address}</Typography>
                    <Typography variant='h9'>City: {city.name}</Typography>
                    <Typography variant='h9'>Phone: {phone}</Typography>
                    <Typography variant='h9'>Description: {description}</Typography>
                </Stack>
            </CardContent>
        </Card>
        </Box>
    )
}

export default ServiceProfile;