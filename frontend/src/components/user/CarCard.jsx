import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import MyTextField from '../utils/MyTextField';
import toast from 'react-hot-toast';
import myAxios from '../axios/axios';

const CarCard = ({car}) => {
    const isSmallScreen = useMediaQuery('(max-width:899px)');
    const [editButtonActive, setEditButtonActive] = React.useState(false);
    const [description, setDescription] = React.useState(car.description);
    const [editKmButtonActive, setEditKmButtonActive] = React.useState(false);
    const [km, setKm] = React.useState(car.km);

    useEffect(() => {
        setDescription(car.description);
        setKm(car.km);
    }, [car]);

    const editKm = async () => {
        setEditKmButtonActive(!editKmButtonActive);

        try {
            const res = await myAxios.put(`/api/mycars/editKm`, {id: car._id, km: km});

            if (!res.data.success) {
                toast.error("Error editing km!");
                return;
            }

            setKm(res.data.km);
            console.log(res.data.km);
            toast.success("Km edited successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error editing km!");
        }
    };

    const editDescription = async () => {
        setEditButtonActive(!editButtonActive);

        try {
            const res = await myAxios.put(`/api/mycars/editDescription`, {id: car._id, description: description});

            if (!res.data.success) {
                toast.error("Error editing description!");
                return;
            }
                
            setDescription(res.data.description);
            toast.success("Description edited successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error editing description!");
        }
    };

    if (!car) return (<div>No cars to show</div>);

    return (
        <>         
            <Stack direction={isSmallScreen ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight='bold' color="primary">
                    {car.name}
                </Typography>
                <Typography gutterBottom variant="h8" component="div" fontWeight="bold">
                    {car.brandName} {car.modelName}
                </Typography>
            </Stack>
            <Divider sx={{opacity: 1}}/>
            <Stack direction="column" justifyContent="space-between" alignItems="start" spacing={1} sx={{paddingTop: '2%'}}>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Motorizare:
                </Typography>
                <Typography variant="body1" fontWeight='regular' color="primary">
                    {car.engine}
                </Typography>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    An fabricație:
                </Typography>
                <Typography variant="body1" fontWeight='regular' color="primary">
                    {car.year}
                </Typography>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Kilometraj:
                </Typography>
                <Stack direction={isSmallScreen ? 'column' : 'row'} width={'100%'} justifyContent="space-between" alignItems="center">
                {!editKmButtonActive && <Typography variant="body1" fontWeight='regular' color="primary">
                    {km}
                </Typography>}
                {!editKmButtonActive && <Button size="small" onClick={() => setEditKmButtonActive(!editKmButtonActive)}>Editează Kilometraj</Button>}
                {editKmButtonActive && <MyTextField label="Kilometraj" functionType="setter" type='number' value={km} changeFunction={setKm} variant="outlined"/>}
                {editKmButtonActive && <Button size="small" onClick={editKm}>Salvează</Button>}
                </Stack>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Transmisie:
                </Typography>
                <Typography variant="body1" fontWeight='regular' color="primary">
                    {car.transmission}
                </Typography>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Combustibil:
                </Typography>
                <Typography variant="body1" fontWeight='regular' color="primary">
                    {car.fuel}
                </Typography>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Tracțiune:
                </Typography>
                <Typography variant="body1" fontWeight='regular' color="primary">
                    {car.traction}
                </Typography>
                <Typography variant="body2" fontWeight='light' color="text.primary">
                    Descriere:
                </Typography>
                <Stack direction={isSmallScreen ? 'column' : 'row'} width={'100%'} justifyContent="space-between" alignItems="center">
                {!editButtonActive && <Typography variant="body1" fontWeight='regular' color="primary">
                    {description}
                </Typography>}
                {!editButtonActive && <Button size="small" onClick={editDescription}>Editează Descriere</Button>}
                {editButtonActive && <MyTextField label="Descriere" functionType="setter" value={description} changeFunction={setDescription} variant="outlined"/>}
                {editButtonActive && <Button size="small" onClick={editDescription}>Salvează</Button>}
                </Stack>
            </Stack>          
        </>
    )
};

export default CarCard;