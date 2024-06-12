import CardLayout from '../utils/CardLayout';
import React from 'react';
import {CardActions, CardContent, Typography, Button, Stack, Divider} from '@mui/material';
import './postCard.css';
import myAxios from '../axios/axios';
import { useEffect } from 'react';
import MyTextField from '../utils/MyTextField';
import ProfileContext from '../context/ProfileContext';
import toast from 'react-hot-toast';

const PostCard = ({auction}) => {
    const [bidButtonActive, setBidButtonActive] = React.useState(false);
    const {user} = React.useContext(ProfileContext);
    const [bid, setBid] = React.useState(0);
    const [content, setContent] = React.useState('');
    const [seeCommentsButtonActive, setSeeCommentsButtonActive] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0);

    if (!auction) {
        return null;
    }

    const fetchComments = async () => {
        try {
            const res = await myAxios.get(`api/auction/${auction._id}/comments`);
            console.log(res);

            if (res.status === 200) {
                setComments(res.data.comments);
                return;
            }
            console.log(res.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (seeCommentsButtonActive) {
            fetchComments();
        }
    }, [seeCommentsButtonActive, refresh]);

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

    return (
        <CardLayout additionalClasses='post-card'>
            <Stack className='post-stack'>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {auction.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {auction.description}
                </Typography>
        
                {seeCommentsButtonActive && comments.map((comment, index) => {
                    return (
                        <Stack key={index} direction='column' spacing={1} mt={2}>
                            <Typography variant='h6' color='primary'>{comment.user.name}</Typography>
                            <Typography variant='body1'>{comment.content}</Typography>
                            <Typography variant='body1'>Pret: {comment.price}</Typography>
                            <Divider sx={{opacity: 1, backgroundColor: '#e60049'}}/>
                        </Stack>
                    )
                })}
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
                {bidButtonActive && <Button onClick={handleAdd}>Send</Button>}
                {bidButtonActive && <Button onClick={handleCancel}>Cancel</Button>}
                </Stack>
            </CardContent>
            <CardActions>
                <Stack direction='row' spacing={2}>
                {!seeCommentsButtonActive &&  <Button size="small" onClick={handleCommentClick}>See comments</Button>}
                {seeCommentsButtonActive && <Button size="small" onClick={handleCommentClick}>Hide comments</Button>}
                <Button size="small" onClick={handleBidClick}>Bid</Button>
                </Stack>
            </CardActions>
            </Stack>
        </CardLayout>
    )
}

export default PostCard