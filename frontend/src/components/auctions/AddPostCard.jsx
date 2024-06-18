import React, {useContext} from 'react';
import CardLayout from '../utils/CardLayout';
import MyTextField from '../utils/MyTextField';
import { CardContent } from '@mui/material';
import myAxios from '../../axios/axios';
import { Button, Stack, Typography } from '@mui/material';
import './addPostCard.css';
import MyAutocomplete from '../utils/MyAutocomplete';
import {toast} from 'react-hot-toast';

const AddPostCard = ({setAddButtonActive, setRefresh}) => {
    const [userCars, setUserCars] = React.useState([]);
    const [selectedCarName, setSelectedCarName] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [selectedCar, setSelectedCar] = React.useState(null);

    const getUserCars = async() => {
        try {
            const res = await myAxios.get('/api/getUserCars');
            setUserCars(res.data.cars);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddPost = async () => {
        try {
            if (!selectedCar) {
                toast.error('Selectati masina!');
                return;
            }

            if (!title) {
                toast.error('Introduceti un titlu!');
                return;
            }

            if (!description) {
                toast.error('Introduceti o descriere!');
                return;
            }

            const res = await myAxios.post('/api/auction/create', {
                title, 
                description, 
                car: selectedCar._id,
                brand: selectedCar.brand,
                model: selectedCar.model,
                engine: selectedCar.engine,
                brandName: selectedCar.brandName,
                modelName: selectedCar.modelName,
                user: selectedCar.user,
                images: []
            });

            if (res.status === 201) {
                toast.success('Licitația a fost adaugată cu succes!');
                setRefresh(prev => prev + 1);
                setAddButtonActive(false);
            } else {
                toast.error('Licitația nu a putut fi adaugată! Încercați din nou!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getUserCars();
    }, []);

    const handleSelectCar = (e, value) => {
        if (!value) {
            setSelectedCarName(null);
            setSelectedCar(null);
            return;
        }
        const currentCar = userCars.find(car => car.name === value);
        setSelectedCarName(currentCar.name);
        setSelectedCar(currentCar);
    }

    return (
        <CardLayout additionalClasses="add-post-card">
            <CardContent>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h5'>New Post</Typography>
                    <MyTextField label="Title" value={title} functionType={'setter'} changeFunction={setTitle} variant='standard'/>
                    <MyAutocomplete
                        value={selectedCarName}
                        label={'Selectati masina'}
                        id="combo-box-transmission"
                        options={userCars.map(car => car.name)}
                        onChange={handleSelectCar}
                    />
                    <MyTextField label="Description" value={description} functionType={'setter'} changeFunction={setDescription} variant='standard'/>
                    <Stack direction='row' spacing={5} justifyContent='center'>
                    <Button variant='contained' color='secondary' onClick={() => setAddButtonActive(false)}>Cancel</Button>
                        <Button variant='contained' color='primary' onClick={handleAddPost}>Add Post</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </CardLayout>
    )
}


export default AddPostCard;