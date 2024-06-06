import React, {useState, useEffect} from 'react'
import AdminSidebar from '../../components/admin/admin-sidebar/AdminSidebar'
import toast from 'react-hot-toast';
import axios from 'axios';
// import 'react-dropdown/style.css';
import '../../components/admin/admin-sidebar/admin-sidebar.css';
import { Autocomplete, Grid, Typography } from '@mui/material';
import { Button, TextField, Stack } from '@mui/material';

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
        axios.get('/api/brand/all')
        .then(res => {
          setBrands(res.data.brands.reduce((acc, brand) => {
            acc[brand.name] = brand;
            return acc;
          }, {}));
        })
        .catch(err => {
          toast.error(err.response.data.error);
        });
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
          const added = await axios.post('/api/brand/create', {
            name: brandName,
          });

          if (added.data.success === true) {
            setBrandName('');
            toast.success("Brand added successfully!"); 
          } 
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      const handleModelSubmit = async (e) => {
        // e.preventDefault();
        try {
          // console.log(brands[brand]._id);
          console.log(brand);
          console.log(brands)
          const added = await axios.post('/api/model/create', {
            name: name,
            brand: brands[brand]._id,
            engines: engines.split(',').map((engine) => engine.trim()),
          });

          const updatedBrand = await axios.put('/api/brand/update/' + brands[brand]._id, {
            modelId: added.data.model._id,
          });

          console.log(updatedBrand);
          console.log(added);
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
    <Grid container>
      <Grid item xs={2}>
        <AdminSidebar/>
      </Grid>
      <Grid item xs={8}>
        {/* implement with MUI components */}
        <Typography variant="h4" component="h4" sx={{margin: '5%'}}>
          Add Components
        </Typography>
        <Stack spacing={2} sx={{margin: '5%'}}>
        <TextField size="small" label="Brand Name" variant="outlined" value={brandName} onChange={handleBrandChange}/>
        <Button variant="contained" sx={{width:'10%', alignSelf: 'center'}} onClick={handleBrandSubmit}>Add Brand</Button>
        <Autocomplete size='small' options={Object.keys(brands)} onChange={(event, value) => 
          setModelValues({...modelValues, brand: value})
        } renderInput={(params) => <TextField {...params} label="Select Brand" variant="outlined" />} />
        <TextField size="small" label="Model Name" variant="outlined" value={name} onChange={handleModelChange('name')}/>
        <TextField size="small" label="Engines" variant="outlined" value={engines} onChange={handleModelChange('engines')}/>
        <Button variant="contained" sx={{width:'10%', alignSelf:'center'}} onClick={handleModelSubmit}>Add Model</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default AddComponents;

