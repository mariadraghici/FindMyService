import { Button, Container, setRef } from '@mui/material'
import './posts.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import ProfileContext from '../context/ProfileContext';
import AddPostCard from '../components/auctions/AddPostCard';
import Stack from '@mui/material/Stack';
import Feed from '../components/auctions/Feed';
import OffersNotificationsCounter from '../context/OffersNotificationsCounter';
import NewOffers from '../context/NewOffers';

const Posts = () => {
    const {user} = useContext(ProfileContext);
    const [addButtonActive, setAddButtonActive] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const {offersNotificationsCounter} = useContext(OffersNotificationsCounter);
    const {setNewOffers} = useContext(NewOffers);

    const resetNewOffers = async () => {
        try {
            const res = await myAxios.put('/api/service/resetOffers', {userId: user._id});

            if (res.status === 200) {
                setNewOffers([]);
            }
        } catch (error) {
            console.error('Failed to reset new offers', error);
        }
    }

    useEffect(() => {
        if (!user) {
            return;
        }
    
        if (OffersNotificationsCounter === 0) {
            resetNewOffers();
        }
    }, [offersNotificationsCounter]);

    return (
        <Container>
            <Stack direction='column' spacing={2} sx={{ display: 'flex', justifyContent:'center', alignItems:'flex-start', marginTop: '5%'}}>
            {!addButtonActive && user && user.role !== 2 && <Button variant="contained" onClick={() => setAddButtonActive(true)} color="primary">Licitație nouă</Button>}
            {addButtonActive && <AddPostCard setRefresh={setRefresh} setAddButtonActive={setAddButtonActive}/>}
            <Feed refresh={refresh} setRefresh={setRefresh}/>
            </Stack>
        </Container>
    )
}

export default Posts