import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { toast } from 'react-toastify';

const CarCard = ({car, deleteCar}) => {

    if (!car) return (<div>Loading...</div>);

    return (
        <>
            <Card sx={{ maxWidth: '100%' }} variant='outlined'>
            <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography gutterBottom variant="h5" component="div">
                    {car.name}
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                    {car.brandName} {car.modelName}
                </Typography>
            </Stack>
            <Divider sx={{opacity: 1}}/>
            <Stack direction="column" justifyContent="space-between" alignItems="start" spacing={1} sx={{paddingTop: '2%'}}>
                <Typography variant="body2" color="text.secondary">
                    Motorizare:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.engine}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    An fabricație:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Kilometraj:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.km}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Transmisie:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.transmission}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Combustibil:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.fuel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tracțiune:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.traction}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Descriere:
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {car.description}
                </Typography>
            </Stack>
            </CardContent>
            {/* <CardActions > */}
                <Stack direction="row" justifyContent="flex-end" alignItems="baseline" sx={{padding: '2%'}}>
                <Button size="small" onClick={deleteCar}>ȘTERGE</Button>
                {/* <Button size="small">Learn More</Button> */}
                </Stack>
            {/* </CardActions> */}
            </Card>
        </>
    )
};

export default CarCard;