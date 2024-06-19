import CardLayout from '../utils/CardLayout';
import React from 'react';
import {CardActions, CardContent, Typography, Button, Stack, Divider} from '@mui/material';
import './auctionCard.css';
import myAxios from '../../axios/axios';
import { useEffect } from 'react';
import MyTextField from '../utils/MyTextField';
import ProfileContext from '../../context/ProfileContext';
import toast from 'react-hot-toast';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

const AuctionCard = ({auction, setRefresh, refresh}) => {
    const [bidButtonActive, setBidButtonActive] = React.useState(false);
    const {user} = React.useContext(ProfileContext);
    const [bid, setBid] = React.useState(0);
    const [content, setContent] = React.useState('');
    const [seeCommentsButtonActive, setSeeCommentsButtonActive] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const isSmallScreen = useMediaQuery('(max-width:899px)');

    const textStyle = {
        wordWrap: 'break-word',
        wordBreak: 'break-all',
    };

    useEffect(() => {
        if (seeCommentsButtonActive) {
            fetchComments();
        }
    }, [seeCommentsButtonActive, refresh]);

    if (!auction) {
        return null;
    }

    const fetchComments = async () => {
        try {
            const res = await myAxios.get(`api/auction/${auction._id}/comments`);

            if (res.status === 200) {
                setComments(res.data.comments);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCommentClick = () => {
        setSeeCommentsButtonActive(!seeCommentsButtonActive);
    }

    const handleBidClick = () => {
        setBidButtonActive(!bidButtonActive);
        setBid(0);
        setContent('');
    }

    const handleCancel = () => {
        setBidButtonActive(false);
    }

    const handleAdd = async () => {
        try {

            if (!bid) {
                toast.error("Introduceti un pret!");
                return;
            }
    
            const res = await myAxios.post(`api/comment/create`,{
                user: user._id,
                content: content,
                price: bid,
                auction: auction._id
            });

            if (res.status === 201) {
                toast.success("Comment added successfully!");
                setBidButtonActive(false);
                setRefresh(refresh + 1);
            } else {
                toast.error("Error adding comment!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding comment!");
        }
    }

    const handleDeleteAuctionClick = async () => {
        try {
            const res = await myAxios.delete(`api/auction/${auction._id}/delete`);

            if (res.status === 200) {
                toast.success("Auction deleted successfully!");
                setRefresh(refresh + 1);
            } else {
                toast.error("Error deleting auction!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error deleting auction!");
        }
    }

    return (
        <CardLayout additionalClasses='post-card'>
            <Stack className='post-stack'>
            <CardContent>
                <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent='space-between'>
                    <Stack direction='column'>
                        <Typography variant="h5" gutterBottom component="p" style={textStyle}>
                            {auction.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom component="p" style={textStyle}>
                            {auction.description}
                        </Typography>
                        <Typography variant="body2" component="p" style={textStyle}>
                            Utilizator: {auction.user.name}
                        </Typography>
                        <Typography variant="body2" component="p" style={textStyle}>
                            Email utilizator: {auction.user.email}
                        </Typography>
                        <Typography variant="body2" component="p" style={textStyle}>
                            Brand: {auction.brandName}
                        </Typography>
                        <Typography variant="body2" component="p" style={textStyle}>
                            Model: {auction.modelName}
                        </Typography>
                        <Typography variant="body2" component="p" style={textStyle}>
                            Motorizare: {auction.engine}
                        </Typography>
                    </Stack>
                    <Stack direction='column'>
                        <Typography variant="h6" component="p" style={textStyle} color='primary'>
                            Cea mai bună ofertă:
                        </Typography>
                        {auction.bestBidder &&
                        <Link to={`/service/page/${auction.bestBidder?.name}`} style={{ textDecoration: 'underline', color: 'black', fontWeight: 'bold' }}>                    
                            Service: {auction.bestBidder?.name}
                        </Link>
                        }
                        {auction.bestBidder && <Typography variant="body1" component="p" style={textStyle}>
                            Valoare: {auction.bestBid} RON
                        </Typography>
                        }

                        {!auction.bestBidder && <Typography variant="body1" component="p" style={textStyle}>
                            Nici o ofertă până acum.
                        </Typography>
                        }

                    </Stack>
                </Stack>
                
                {seeCommentsButtonActive && (
                        <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '2%' }}>
                            {comments.map((comment, index) => (
                                <Stack key={index} direction='column' spacing={1} mt={2}>
                                    <Divider sx={{ opacity: 1, backgroundColor: '#e60049' }} />
                                    <Typography variant='h7' color='primary'>{comment.user.name}</Typography>
                                    <Typography variant='body2'>Mesaj: {comment.content}</Typography>
                                    <Typography variant='body2'>Pret: {comment.price}</Typography>
                                </Stack>
                            ))}
                            <Divider sx={{ opacity: 1, backgroundColor: '#e60049', marginTop: '2%' }}/>
                        </div>
                    )}
                <Stack direction='column' spacing={2} mt={5}>
                {bidButtonActive && <MyTextField
                    label='Bid'
                    value={bid}
                    functionType="setter"
                    changeFunction={setBid}
                    type='number'
                />}
                {bidButtonActive && <MyTextField
                    label='Content'
                    value={content}
                    functionType="setter"
                    changeFunction={setContent}
                    type='text'
                />}
                {bidButtonActive && <Button onClick={handleAdd}>Postează</Button>}
                {bidButtonActive && <Button onClick={handleCancel}>Anulează</Button>}
                </Stack>
            </CardContent>
            <CardActions>
                <Stack direction='row' spacing={2}>
                {!seeCommentsButtonActive &&  <Button size="small" onClick={handleCommentClick}>Vezi oferte</Button>}
                {seeCommentsButtonActive && <Button size="small" onClick={handleCommentClick}>Ascunde oferte</Button>}
                {user.role === 2 && <Button size="small" onClick={handleBidClick}>Licitează</Button>}
                {user._id === auction.user._id && <Button size="small" onClick={handleDeleteAuctionClick}>Șterge</Button>}
                </Stack>
            </CardActions>
            </Stack>
        </CardLayout>
    )
}

export default AuctionCard