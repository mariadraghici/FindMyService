import React from "react";
import ProfileLayout from "../../../components/user/profile/ProfileLayout";
import {getAuctionsForUser} from "../../../api/auctionsApi";
import LazyLoadingPaginationComponent from "../../../components/utils/LazyLoadingPaginationComponent";

const UserAuctions = () => {
    const [refresh, setRefresh] = React.useState(0);

    return (
        <ProfileLayout withCard={false}>
            <LazyLoadingPaginationComponent
                title="Auctions"
                apiFunction={getAuctionsForUser}
                dataType="auctions"
                limit={1}
                refresh={refresh}
                setRefresh={setRefresh}
            />                
        </ProfileLayout>
    )
}

export default UserAuctions;