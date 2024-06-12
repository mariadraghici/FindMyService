import React from 'react';
import PostCard from './PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import myAxios from '../axios/axios';

const Feed = () => {
    const [auctions, setAuctions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const res = await myAxios.get('/api/auction/all', {
                params: { page, limit: 10 },
            });

            console.log(res.data);

            setAuctions(prevAuctions => [...prevAuctions, ...res.data.auctions]);
            setPage(page + 1);

            if (page >= res.data.totalPages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    return (
        <InfiniteScroll
            dataLength={auctions.length}
            next={fetchAuctions}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more posts to load</p>}
        >
            {auctions.map(auction => (
                <div key={auction._id}>
                    <PostCard auction={auction} />
                </div>
            ))}
        </InfiniteScroll>
    );
}

export default Feed;