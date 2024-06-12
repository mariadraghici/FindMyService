import { Button, Container } from '@mui/material'
import './posts.css'
import { useEffect, useState } from 'react'
import myAxios from '../components/axios/axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ProfileContext from '../components/context/ProfileContext';
import AddPostCard from '../components/posts/AddPostCard';
import Stack from '@mui/material/Stack';
import PostCard from '../components/posts/PostCard';
import Feed from '../components/posts/Feed';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const {user, setUser} = useContext(ProfileContext);
    const [addButtonActive, setAddButtonActive] = useState(false);
    const [refresh, setRefresh] = useState(0);

    return (
        <Container>
            <Stack direction='column' spacing={2} sx={{ display: 'flex', justifyContent:'center', alignItems:'center', marginTop: '5%'}}>
            {!addButtonActive && <Button variant="contained" onClick={() => setAddButtonActive(true)} color="primary">New Post</Button>}
            {addButtonActive && <AddPostCard setRefresh={setRefresh} setAddButtonActive={setAddButtonActive}/>}
            <Feed posts={posts} setRefresh={setRefresh}/>
            </Stack>
        </Container>
    )
}

export default Posts