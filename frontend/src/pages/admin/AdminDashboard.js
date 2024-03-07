import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdminSidebar from '../../components/admin/admin-sidebar/AdminSidebar'

const AdminDashboard = () => {
    return (
        <div>
            {/* <Header /> */}
            <div className="row justify-content-start">
                <div className="col-3">
                    <AdminSidebar />
                </div>
                <div className="col-8">
                    heei
                </div>
        </div>
            {/* <div className='container-fluid dashboard-container'>
            <div className='row'>
                <div className='col-md-3'>
                <div className='card card-dashboard'>
                    <div className='card-header'>
                    <h4>Admin Dashboard</h4>
                    </div>
                    <div className='card-body'>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Joined at: {new Date(createdAt).toLocaleDateString()}</p>
                    <p>Role: Admin {role}</p>
                    </div>
                </div>
                </div>
            </div>
        </div> */}
        <Footer />
        </div>
  )
}

export default AdminDashboard
