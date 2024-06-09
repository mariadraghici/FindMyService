import React, {useState, useEffect} from 'react'
import AdminSidebar from '../../components/admin/admin-sidebar/AdminSidebar'
import toast from 'react-hot-toast';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const UpdateComponents = () => {

    const columns = [
        {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Engines',
          selector: row => row.engines.join(', '),
          sortable: true,
        },
    ];

    const [models, setModels] = useState([]);

    useEffect(() => {
        axios.get('/api/models/display')
        .then(res => {
            if (res.data.success === true) {
                setModels(res.data.models);
            }
        })
        .catch(err => {
            toast.error(err.response.data.error);
        });
    }, []);

    return (
        <div>
            <div className="row justify-content-start">
                <div className="col-3">
                    <AdminSidebar />
                </div>
                <div className="col-8">
                <DataTable columns={columns} data={models} selectableRows />
                </div>
            </div>
        </div>
    )
}

export default UpdateComponents;

