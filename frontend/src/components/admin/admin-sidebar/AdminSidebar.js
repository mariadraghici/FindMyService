import React from 'react';
import './admin-sidebar.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AdminSidebar = () => {
    const navigate = useNavigate();

    // console.log(props);
    const logout = () => {
        axios.get('/api/logout')
        .then(res => {
        if (res.data.success === true) {
            toast.success(res.data.message);
            localStorage.removeItem('jwt');
            navigate('/');
        }
        })
        .catch(err => {
        toast.error(err.response.data.error);
        });
    }

    return (
     <div>
        {/* <!--Main Navigation--> */}
        <header>
        {/* <!-- Sidebar --> */}
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                    <div className='brand'>FindMyService</div>
                    <a
                    href="#"
                    className="list-group-item list-group-item-action py-2 ripple "
                    aria-current="true"
                    >
                    <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-chart-area fa-fw me-3"></i><span>Manage users</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-chart-area fa-fw me-3"></i><span>Manage services</span>
                    </a>
                    <a href="/admin/component/add" className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-chart-area fa-fw me-3"></i><span>Add components</span>
                    </a>
                    <a href="/admin/component/update" className="list-group-item list-group-item-action py-2 ripple">
                    <i className="fas fa-chart-area fa-fw me-3"></i><span>Update components</span>
                    </a>

                    <a href="#" className="list-group-item separator-item">
                    <span>My Profile</span>
                    </a>
                    <a href="" onClick={logout} className="list-group-item list-group-item-action py-2 ripple">
                   <span>Logout</span>
                    </a>
                </div>
            </div>
        </nav>

        </header>
        {/* <!--Main Navigation--> */}
        </div>
    )
}

export default AdminSidebar;
