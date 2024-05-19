import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const CarCard = ({car, deleteCar}) => {

    if (!car) return (<div>No cars to show</div>);

    return (
        <>
            <Card sx={{ maxWidth: '100%', borderRadius: '7px' }} variant='outlined'>
            <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h4>{car.name}</h4>
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
                <Stack direction="row" justifyContent="flex-end" alignItems="baseline" sx={{padding: '2%'}}>
                <Button size="small" onClick={deleteCar}>ȘTERGE</Button>
                </Stack>
            </Card>
        </>
    )
};

export default CarCard;