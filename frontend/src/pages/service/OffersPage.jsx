import React from "react";
import { useContext, useState } from "react";
import ProfileContext from "../../components/context/ProfileContext";
import { getProfile } from "../../api/profileApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Stack, Typography, Box, Container, Button } from "@mui/material";
import myAxios from "../../components/axios/axios";
import { toast } from "react-hot-toast";
import NotificationsCounter from "../../components/context/NotificationsCounter";

const OffersPage = () => {
    const {user, setUser} = useContext(ProfileContext);
    const [offers, setOffers] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const {notifications, setNotifications} = useContext(NotificationsCounter);

    const resetNewOffers = async () => {
        try {
            const res = await myAxios.put('/api/service/resetOffers', {userId: user._id});
            console.log(res.data);
            setNotifications(res.data.user.newOffers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setNotifications(0);
        resetNewOffers();
    }, []);

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

        const getOffers = async () => {
            try {
                const res = await myAxios.get('/api/offers/display');
                console.log(res.data.offers);
                setOffers(res.data.offers);
            } catch (error) {
                console.log(error);
            }
        }

        getOffers();
    }, []);

    const handleDeleteOffer = async () => {
        try {
            const res = await myAxios.delete(`/api/offers/delete/${currentId}`);
            if (res.status === 200) {
                toast.success(res.data.message);
                const newOffers = offers.filter(offer => offer._id !== currentId);
                setOffers(newOffers);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (currentId) {
            handleDeleteOffer();
        }
    }, [currentId]);

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', marginTop: '2%'}}>
        <Typography variant="h4" component="div">
            {notifications} Oferte noi
        </Typography>
       
        {offers?.map(offer => (
            <Card key={offer._id} sx={{ width: '100%', marginTop: '2%' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Email: {offer.userFrom.email}
                    </Typography>
                    <Typography variant="body">
                        Mesaj: {offer.text}
                    </Typography>
                </CardContent>
                <Stack direction='row' spacing={2} sx={{display: 'flex-end', justifyContent:'flex-end', marginBottom: '2%', paddingRight: '5%'}} >
                <Button variant="contained" color="primary" onClick={() => 
                {
                    setCurrentId(offer._id);
                }
                }>Sterge</Button>
                </Stack>
            </Card>
        ))}
        </Container>
    )

}

export default OffersPage;