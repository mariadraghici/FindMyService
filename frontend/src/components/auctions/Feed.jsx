import React from 'react';
import LazyLoadingPaginationComponent from '../utils/LazyLoadingPaginationComponent';
import { getAllAuctions } from '../../api/auctionsApi';

const Feed = ({refresh, setRefresh}) => {
    return (
            <LazyLoadingPaginationComponent
                dataType='auctions'
                title='Auctions'
                records="licitatii"
                apiFunction={getAllAuctions}
                refresh={refresh}
                limit={5}
                setRefresh={setRefresh}
            />
    );
}

export default Feed;