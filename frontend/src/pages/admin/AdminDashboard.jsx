import React from 'react'
import AddComponents from './AddComponents'
import {getRecommendations} from '../../api/recommendationApi'
import LazyLoadingPaginationComponent from '../../components/utils/LazyLoadingPaginationComponent'
import { Container } from '@mui/material'

const AdminDashboard = () => {
    const [refresh, setRefresh] = React.useState(0);
    return (
        <Container>
        <AddComponents />
        <LazyLoadingPaginationComponent
            dataType='recommendations'
            title='Recommendations'
            apiFunction={getRecommendations}
            limit={5}
            refresh={refresh}
            records={'recomandari'}
            setRefresh={setRefresh}
        />
        </Container>
  )
}

export default AdminDashboard
