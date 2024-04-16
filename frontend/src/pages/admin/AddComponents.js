import React, {useState, useEffect} from 'react'
import AdminSidebar from '../../components/admin/admin-sidebar/AdminSidebar'
import {toast} from 'react-toastify';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../components/admin/admin-sidebar/admin-sidebar.css';

const AddComponents = () => {

      const [modelValues, setModelValues] = useState({
        name: '',
        engines: []
      });

      const [brandName, setBrandName] = useState('');
      const [currentBrand, setCurrentBrand] = useState('');

      const {name, engines} = modelValues;
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

      const handleDropdownChange = (selected) => {
        setCurrentBrand(selected.value);
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
            
            if (typeof window !== 'undefined') {
              localStorage.setItem('jwt', JSON.stringify(added.data));
            }
          } 
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }

      const handleModelSubmit = async (e) => {
        e.preventDefault();
        try {
          const added = await axios.post('/api/model/create', {
            name: name,
            brand: brands[currentBrand]._id,
            engines: engines.split(',').map((engine) => engine.trim()),
          });

          const updatedBrand = await axios.put('/api/brand/update/' + brands[currentBrand]._id, {
            modelId: added.data.model._id,
          });

          if (added.data.success === true && updatedBrand.data.success === true) {
            setModelValues({name: '', engines: []});
            toast.success("Model added successfully!"); 
            
            if (typeof window !== 'undefined') {
              localStorage.setItem('jwt', JSON.stringify(added.data));
            }
          } 
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }


  return (
    <div>
      <div className="row justify-content-start">
        <div className="col-3">
          <AdminSidebar />
        </div>
        <div className="col-8">
          <div className="form">
            <h3>Add Models</h3>
              <form>
                <div className="input-container">
                  <label>Name </label>
                  <input onChange={handleModelChange("name")} type="text" name="name" value={name} required />
                </div>
                <Dropdown className="input-container" options={Object.keys(brands)} value={currentBrand} onChange={handleDropdownChange} placeholder={"Select a brand..."}/>
                <div className="input-container">
                  <label>Engines </label>
                  <input onChange={handleModelChange("engines")} type="text" name="engines" value={engines} required />
                </div>
                <div className="button-container">
                  <button onClick={handleModelSubmit} type="submit">Add Model</button>
                </div>
              </form>
          </div>
          <div className="form">
            <h3>Add Brands</h3>
              <form>
                <div className="input-container">
                  <label>Name </label>
                  <input type="text" required onChange={handleBrandChange} value={brandName}/>
                </div>
                <div className="button-container">
                  <button onClick={handleBrandSubmit} type="submit">Add Brand</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddComponents;

