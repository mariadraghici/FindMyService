import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import myAxios from '../axios/axios';
import { toast } from 'react-hot-toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Pagination from '@mui/material/Pagination';
import styled from '@mui/material/styles/styled';   


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const AboutCard = ({service, user, onOwnPage, textModified, allFacilities}) => {
    const {name, address, phone, email, description} = service;
    const [editButton, setEditButton] = useState(false);
    const [editFacility, setEditFacility] = useState(false);
    const [textFieldDescription, setTextFieldDescription] = useState(description);
    const [selectedFacilityToAdd, setSelectedFacilityToAdd] = useState('');
    const [priceLow, setPriceLow] = useState(0);
    const [priceHigh, setPriceHigh] = useState(0);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState(['uploads/img1.jpg', '/uploads/img2.jpg', '/uploads/img3.jpg', '/uploads/img4.jpg', '/uploads/img5.jpg']);
    const [imageUrl, setImageUrl] = useState(images[0]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (file) {
            const uploadFile = async () => {
                try {
                    const formData = new FormData();

                    for (let i = 0; i < file.length; i++) {
                        formData.append('file', file[i]);
                    }
                    
                    // Add the username to the formData object
                    formData.append('name', user.name);
                    const res = await myAxios.post('/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.data.status === 'success') {
                        toast.success("Fisierul a fost incarcat cu succes!");
                        setFile(null);
                    } else {
                        toast.error("Fisierul nu a putut fi incarcat!");
                    }
                }   catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message);
                }
            }
            uploadFile();
        }

    }, [file, user.name]);

    const handleAddFacility = async () => {
        if (!selectedFacilityToAdd) {
            toast.error('Selectează un serviciu!');
            return;
        }

        try {
            const res = await myAxios.post('/api/serviceFacility/create',
            {
                serviceId: user._id,
                name: selectedFacilityToAdd,
                priceLow: priceLow,
                priceHigh: priceHigh,
                facilityId: allFacilities.filter(facility => facility.name === selectedFacilityToAdd)[0]._id
            }
        );
            if (res.data.success) {
                toast.success('Serviciul a fost adaugat cu succes!');
                setSelectedFacilityToAdd('');
                setPriceLow(0);
                setPriceHigh(0);
                setTextModified(textModified + 1);
            }
        } catch (error) {
            console.log(error);
            toast.error('Serviciul nu a putut fi adaugat!');
        }
    }

    const handleDoneEditing = async () => {
        setEditButton(false);
        try {
            const res = await myAxios.put(`/api/service/edit/${service._id}`, {description: textFieldDescription});
            if (res.data.success) {
                toast.success('Modificările au fost salvate!');
            }
        } catch (error) {
            console.log(error);
        }

        // refresh the page
        setTextModified(textModified + 1);
    }

    const handleFileUpload = async (e) => {
        if (images.length === 5) {
            toast.error('Nu poti incarca mai mult de 5 imagini!');
            return;
        }
        if (e.target.files.length === 0) {
            return;
        }

        setFile(e.target.files);
        console.log(e.target.files);
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        setImageUrl(images[value - 1]);
        console.log(value);
    };

    const handleDeleteFacility = async (id) => {
        try {
            const res = await myAxios.delete(`/api/serviceFacility/delete/${id}`);
            if (res.data.success) {
                toast.success('Serviciul a fost sters cu succes!');
                setTextModified(textModified + 1);
            }
        } catch (error) {
            console.log(error);
            toast.error('Serviciul nu a putut fi sters!');
        }
    }

    useEffect(() => {
        if (file) {
            const uploadFile = async () => {
                try {
                    const formData = new FormData();

                    for (let i = 0; i < file.length; i++) {
                        formData.append('file', file[i]);
                    }
                    
                    // Add the username to the formData object
                    formData.append('name', user.name);
                    const res = await myAxios.post('/api/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (res.data.status === 'success') {
                        toast.success("Fisierul a fost incarcat cu succes!");
                        setFile(null);
                    } else {
                        toast.error("Fisierul nu a putut fi incarcat!");
                    }
                }   catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message);
                }
            }
            uploadFile();
        }

    }, [file, user.name]);

    return (
        <>
            <Stack spacing={2} direction="row" justifyContent="space-between">
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                    {editButton === false && onOwnPage && <Button onClick={() => setEditButton(true)}>Editează</Button>}
            </Stack>
            <Typography gutterBottom variant="h8" component="div">
                {address}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
                {phone}
            </Typography>
            <Typography gutterBottom variant="h8" component="div">
                {email}
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="center">
            {/* {images.length > 0 && images.map(image => {
                return (
                        <img key={image._id} src={image.url} alt="service" style={{width: '100%', height: 'auto'}}/>
                        )
                })} */}
                {/* <img src={imageUrl} alt=""/> */}
                <Pagination count={images.length} page={page} onChange={handleChangePage} sx={{padding: '5%'}}/>
            </Stack>
            <Typography variant="h6">
                Despre {name}
            </Typography>
            {editButton === false && 
            <Typography gutterBottom variant="h8" component="div">
                {description}
            </Typography>}
            {editButton === true && onOwnPage &&
            <TextField size='medium' variant="filled" onChange={(e) => {console.log("here", textFieldDescription); setTextFieldDescription(e.target.value)}} type="text" name="name"
                value={textFieldDescription} fullWidth label='Descriere' multiline
            />}
            {editButton === true && onOwnPage &&
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{padding: '5%'}}>
                    <Stack spacing={2} direction="row" justifyContent="flex-start">
                        <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                            Încarcă poză
                            <VisuallyHiddenInput type="file" onChange={handleFileUpload}  multiple="multiple"/>
                        </Button>
                        <Button>Șterge</Button>
                    </Stack>
                    <Button onClick={handleDoneEditing} >Gata</Button>
                </Stack>}
                <Divider sx={{opacity: 1, padding: '2%'}} />
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: '2%'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Servicii
                    </Typography>
                    {editFacility === false && onOwnPage && <Button onClick={() => setEditFacility(true)}>Editează</Button>}
                </Stack>
                {editFacility === true &&
                <Stack spacing={2} direction="column" >
                    <Typography gutterBottom variant="h8" component="div">
                        Adaugă serviciu nou *
                    </Typography>
                    <Autocomplete 
                        size='small'
                        options={allFacilities.map(facility => facility.name)}
                        renderInput={(params) => <TextField {...params} label="Selectează serviciul"/>}
                        value={selectedFacilityToAdd}
                        onChange={(event, newValue) => {
                            setSelectedFacilityToAdd(newValue);
                        }}
                        getOptionLabel={(option) => option || ''}
                        isOptionEqualToValue={(option, value) => option === value || value === ""}
                    />
                    <Typography gutterBottom variant="h8" component="div">
                        Preț pornire (RON)
                    </Typography>
                    <TextField size='small' type="number" name="priceLow" fullWidth
                        value={priceLow}
                        onChange={(event) => {
                            setPriceLow(event.target.value);
                        }}/>
                    <Typography gutterBottom variant="h8" component="div">
                        Preț maxim (RON)
                    </Typography>
                    <TextField size='small' type="number" name="priceHigh" fullWidth
                        value={priceHigh}
                        onChange={(event) => {
                            setPriceHigh(event.target.value);
                    }}/>
                    <Button onClick={handleAddFacility}>Adaugă</Button>
                </Stack>}
                {service.facilities && service.facilities.map(facility => {
                    return (
                        <div key={facility._id}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: '2%'}}>
                                <Typography gutterBottom variant="h8" component="div">
                                    {facility.name}
                                </Typography>
                                <Typography gutterBottom variant="h8" component="div">
                                    {facility.priceLow === 0 ? 'Necomunicat' : facility.priceLow} - {facility.priceHigh === 0 ? 'Necomunicat' : facility.priceHigh} RON
                                </Typography>
                                {onOwnPage && editFacility && <Button onClick={() => 
                                    {handleDeleteFacility(facility._id);}
                                }>Șterge</Button>}               
                            </Stack>
                        </div>
                        )
                    })}
                {editFacility === true && onOwnPage === true && <Button onClick={() => setEditFacility(false)}>Gata</Button>}
    </>
    )
};

export default AboutCard;
