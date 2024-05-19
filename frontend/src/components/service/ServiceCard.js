import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const ServiceCard = ({service}) => {

    if (!service) return (<div>No services to show</div>);

    return (
        <>
            <Card sx={{ maxWidth: '100%' }} variant='outlined'>
            <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="column" justifyContent="space-between" alignItems="start" paddingRight={5} >
                    <Typography gutterBottom variant="h5" component="div">
                        {service.name}
                    </Typography>
                    <Typography gutterBottom variant="h8" component="div">
                        {service.address}
                    </Typography>
                    <Typography gutterBottom variant="h8" component="div">
                        {service.location.name}
                    </Typography>
                    <Typography gutterBottom variant="h8" component="div">
                        {service.phone}
                    </Typography>   
                </Stack>
                <Typography gutterBottom variant="h5" component="div">
                    imagine
                </Typography>
            </Stack>
            </CardContent>
            </Card>
        </>
    )
};

export default ServiceCard;