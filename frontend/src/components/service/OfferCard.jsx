import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import myAxios from '../axios/axios';
import { toast } from 'react-hot-toast';
import {deleteOffer} from '../../api/offersApi';

const OfferCard = ({ offer, setNewOffersdata, setOldOffers, newOffersdata, oldOffers, setRefresh }) => {

    const handleDeleteOffer = async () => {
        try {
            const res = await deleteOffer(offer._id);

            if (res.status === 200) {
                toast.success(res.data.message);

                let remainingOffers = newOffersdata.filter(elem => elem._id !== offer._id);
                setNewOffersdata(remainingOffers);
                remainingOffers = oldOffers.filter(elem => elem._id !== offer._id);
                setOldOffers(remainingOffers);
                setRefresh(prev => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }


    if (!offer) {
        return null;
    }

    return (
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
            <Button variant="contained" color="primary" onClick={handleDeleteOffer}>Sterge</Button>
            </Stack>
        </Card>
    )
}

export default OfferCard;