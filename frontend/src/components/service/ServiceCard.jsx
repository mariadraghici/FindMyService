import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getImageOfService } from '../../api/imageApi';
import './serviceCard.css'
import GradeIcon from '@mui/icons-material/Grade';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

const ServiceCard = ({service}) => {
    const [image, setImage] = React.useState(null);
    console.log(service);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    React.useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await getImageOfService(service.name);
                setImage(res);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        if (service) {
            fetchImage();
        }
    }, [service]);

    if (!service) return (<div>No services to show</div>);

    return (
            <Card sx={{ maxWidth: '100%',  backgroundColor: 'white' }} variant='outlined'>
            <CardContent>
            <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent="space-between" spacing={3} alignItems={isSmallScreen ? 'flex-start' : 'center'}>
                <Stack direction="column" alignItems="start" spacing={1}>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                            {service.name}
                        </Typography>      
                        <GradeIcon sx={{ color: 'primary.main' }} />
                        <Typography gutterBottom variant="h8" component="div">
                            {service.rating} / 5.0
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <RoomRoundedIcon sx={{ color: 'primary.main' }} />
                        <Typography gutterBottom variant="h8" component="div">
                            {service.address.address}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <EmailRoundedIcon sx={{ color: 'primary.main' }} />
                        <Typography gutterBottom variant="h8" component="div">
                            {service.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <LocalPhoneRoundedIcon sx={{ color: 'primary.main' }} />
                        <Typography gutterBottom variant="h8" component="div">
                            {service.phone}
                        </Typography>
                    </Stack>
                </Stack>
                <Box className='box-img-search'>
                    {image && <img src={image.url} alt="service" className="service-image"/>}
                </Box>
            </Stack>
            </CardContent>
            </Card>
    )
};

export default ServiceCard;