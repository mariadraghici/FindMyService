import { Navigate } from 'react-router-dom';
import ProfileContext from '../context/ProfileContext';
import { useContext, useState, useEffect } from 'react';
import { getProfile } from '../api/profileApi';
import { Container, Typography } from '@mui/material';
import React from 'react';

const PrivateRoute = ({ children, role }) => {
    const { user, setUser } = useContext(ProfileContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                if (profile) {
                    setUser(profile);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setUser]);

    if (loading) {
        return <Typography variant='h4'>Loading...</Typography>
    }

    if (!user) {
        return <Navigate to='/signin' />;
    }

    if (role && !role.includes(user.role)) {
        return <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Typography variant='h4' color='primary'>
                Page not found! (error code 404)
                </Typography>
            </Container>
    }

    return children;
};

export default PrivateRoute;
