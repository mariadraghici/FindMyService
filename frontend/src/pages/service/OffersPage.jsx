import React from "react";
import { useContext, useState } from "react";
import ProfileContext from "../../components/context/ProfileContext";
import { getProfile } from "../../api/profileApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Stack, Typography, Box, Container, Button, Divider } from "@mui/material";
import myAxios from "../../components/axios/axios";
import { toast } from "react-hot-toast";
import NewOffers from "../../components/context/NewOffers";
import OffersNotificationsCounter from "../../components/context/OffersNotificationsCounter";

const OffersPage = () => {
    const {user, setUser} = useContext(ProfileContext);
    const [offers, setOffers] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const {newOffers, setNewOffers} = useContext(NewOffers);
    const [newOffersdata, setNewOffersdata] = useState([]);
    const {setOffersNotificationsCounter} = useContext(OffersNotificationsCounter);
    const [oldOffers, setOldOffers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = await getProfile();
            if (user) {
                setUser(user);
            }
        };

        fetchProfile();
        if (!user) {
            navigate('/signin', { replace: true });
        }

        const getOffers = async () => {
            try {
                const res = await myAxios.get('/api/offers/display');
                setOffers(res.data.offers);
            } catch (error) {
                console.log(error);
            }
        };

        getOffers();
    }, []);


    useEffect(() => {
        if (offers.length === 0) {
            return;
        }

        setOffersNotificationsCounter(0);
        const newOffersIds = newOffers.map(String);
        setNewOffersdata(offers.filter(offer => newOffersIds.includes(String(offer._id))));
        setOldOffers(offers.filter(offer => !newOffersIds.includes(String(offer._id))));
    }, [offers]);


    const handleDeleteOffer = async () => {
        try {
            const res = await myAxios.delete(`/api/offers/delete/${currentId}`);
            if (res.status === 200) {
                toast.success(res.data.message);
                let remainingOffers = newOffersdata.filter(offer => offer._id !== currentId);
                setNewOffersdata(remainingOffers);
                remainingOffers = oldOffers.filter(offer => offer._id !== currentId);
                setOldOffers(remainingOffers);
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

        {newOffersdata.length === 0 && <Typography variant="h4" component="div" color='primary'>
            Nu ai oferte noi
            </Typography>
        }

        {newOffersdata.length > 0 && <Typography variant="h4" component="div" color='primary' sx={{alignSelf: 'flex-start'}}>
            Ai {newOffersdata.length} oferte noi
            </Typography>
        }
    
        {newOffersdata.length > 0 && newOffersdata?.map(offer => (
            <Card key={offer._id} sx={{ width: '100%', marginTop: '2%' }} >
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

        {oldOffers.length === 0 && <Typography variant="h5" component="div" color='primary'>
            Nu ai oferte vechi
            </Typography>
        }

        {oldOffers.length > 0 && <Typography variant="h5" component="div" color='primary' sx={{alignSelf: 'flex-start'}}>
            Oferte deja vizualizate
            </Typography>
        }

        {oldOffers.length > 0 && oldOffers?.map(offer => (
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