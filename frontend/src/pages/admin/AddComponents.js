import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/admin/admin-sidebar/AdminSidebar'
import {toast} from 'react-toastify';
import {navigate} from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const AddComponents = () => {

      const [values, setValues] = useState({
        name: '',
        engines: []
      });

      const {name, engines} = values;

      const handleChange = val => event => {
        // console.log(event.target.value);
        setValues({...values, [val]: event.target.value});
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const added = await axios.post('/api/model/create', {
            name: name,
            engines: engines.split(',').map((engine) => engine.trim()),
          });

          if (added.data.success === true) {
            setValues({name: '', engines: []});
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
                <Sidebar />
            </div>
            <div className="col-8">
              <div className="form">
                <form>
                  <div className="input-container">
                    <label>Name </label>
                    <input onChange={handleChange("name")} type="text" name="name" value={name} required />
                  </div>
                  <div className="input-container">
                    <label>Engines </label>
                    <input onChange={handleChange("engines")} type="text" name="engines" value={engines} required />
                  </div>
                  <div className="button-container">
                    <button onClick={handleSubmit} type="submit">Add Model</button>
                  </div>
                </form>
              </div>
                    </div>
                </div>
            </div>
  )
}

export default AddComponents;

