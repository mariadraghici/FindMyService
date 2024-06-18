import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Typography, Container } from "@mui/material";
import NewOffers from "../../context/NewOffers";
import OffersNotificationsCounter from "../../context/OffersNotificationsCounter";
import { getAllOffers } from "../../api/offersApi";
import OfferCard from "../../components/service/OfferCard";

const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const {newOffers} = useContext(NewOffers);
    const [newOffersdata, setNewOffersdata] = useState([]);
    const {offersNotificationsCounter, setOffersNotificationsCounter} = useContext(OffersNotificationsCounter);
    const [oldOffers, setOldOffers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getOffers = async () => {
            try {
                const res = await getAllOffers();
                setOffers(res);
            } catch (error) {
                console.error(error);
            }
        }

        getOffers();
    }, [refresh, offersNotificationsCounter]);

    useEffect(() => {
        setOffersNotificationsCounter(0);
    }, [offersNotificationsCounter]);


    useEffect(() => {
        if (offers.length === 0) {
            return;
        }

        setOffersNotificationsCounter(0);
        const newOffersIds = newOffers.map(String);
        setNewOffersdata(offers.filter(offer => newOffersIds.includes(String(offer._id))));
        setOldOffers(offers.filter(offer => !newOffersIds.includes(String(offer._id))));
    }, [offers]);


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
            <OfferCard key={offer._id} offer={offer}
            setNewOffersdata={setNewOffersdata}
            setOldOffers={setOldOffers}
            newOffersdata={newOffersdata}
            oldOffers={oldOffers}
            refresh={refresh}
            setRefresh={setRefresh}
            />
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
            <OfferCard key={offer._id} offer={offer}
            setNewOffersdata={setNewOffersdata}
            setOldOffers={setOldOffers}
            newOffersdata={newOffersdata}
            oldOffers={oldOffers}
            refresh={refresh}
            setRefresh={setRefresh}
            />
        ))}
        </Container>
    )

}

export default OffersPage;