import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import '../../components/admin/admin-sidebar/admin-sidebar.css';
import { Autocomplete, CardContent, Typography } from '@mui/material';
import { Button, TextField, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import CardLayout from '../../components/utils/CardLayout';
import MyTextField from '../../components/utils/MyTextField';
import myAxios from '../../axios/axios';

const AddComponents = () => {

      const [modelValues, setModelValues] = useState({
        brand: '',
        name: '',
        engines: []
      });

      const [brandName, setBrandName] = useState('');

      const {name, engines, brand} = modelValues;
      const [brands, setBrands] = useState({});

      useEffect(() => {
        const fetchBrands = async () => {
          try {
            const res = await myAxios.get('/api/brand/all');
            setBrands(res.data.brands.reduce((acc, brand) => {
              acc[brand.name] = brand;
              return acc;
            }, {}));
          } catch (error) {
            toast.error(error.response.data.error);
          }
        }
        fetchBrands();
      }, [brandName]);

      const handleModelChange = val => event => {
        setModelValues({...modelValues, [val]: event.target.value});
      }

      const handleBrandChange = event => {
        setBrandName(event.target.value);
      }


      const handleBrandSubmit = async (e) => {
        e.preventDefault();
        try {
          const added = await myAxios.post('/api/brand/create', {
            name: brandName,
          });

          if (added.data.success === true) {
            setBrandName('');
            toast.success("Brand adăugat cu succes!"); 
          } 
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      const handleModelSubmit = async (e) => {
        // e.preventDefault();
        try {
          const added = await myAxios.post('/api/model/create', {
            name: name,
            brand: brands[brand]._id,
            engines: engines.split(',').map((engine) => engine.trim()),
          });

          if (added.data.success === true) {
            setModelValues({name: '', engines: []});
            toast.success("Model adăugat cu succes!"); 
          }

          // const updatedBrand = await myAxios.put('/api/brand/update/' + brands[brand]._id, {
          //   modelId: added.data.model._id,
          // });

          // if (added.data.success === true && updatedBrand.data.success === true) {
          //   setModelValues({name: '', engines: []});
          //   toast.success("Model added successfully!"); 
          // } 
        } catch (error) {
          // toast.error(error.response.data.error);
          console.log(error);
        }
      }


  return (
    <Container sx={{marginTop: '5%'}}>
          <CardLayout >
            <CardContent>
              <Stack direction='column' justifyContent='center' spacing={2}>
              <Typography variant="h5">
                Add Components
              </Typography>
              <MyTextField size="small" label="Brand Name" variant="outlined" value={brandName}  changeFunction={handleBrandChange}/>
              <Button variant="contained" onClick={handleBrandSubmit}>Add Brand</Button>
              <Autocomplete size='small' options={Object.keys(brands)} onChange={(event, value) => 
                setModelValues({...modelValues, brand: value})
              } renderInput={(params) => <TextField {...params} label="Select Brand" variant="outlined"
                InputLabelProps={{style: {color: 'grey'}}} color='secondary'
               />} />
              <MyTextField size="small" label="Model Name" variant="outlined" value={name} changeFunction={handleModelChange('name')}/>
              <MyTextField size="small" label="Engines" variant="outlined" value={engines} changeFunction={handleModelChange('engines')}/>
              <Button variant="contained" onClick={handleModelSubmit}>Add Model</Button>
              </Stack>
            </CardContent>
          </CardLayout>
    </Container>
  )
}

export default AddComponents;

