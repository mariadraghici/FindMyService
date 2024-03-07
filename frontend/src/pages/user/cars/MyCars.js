import React, {useState, useEffect} from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import UserSidebar from '../../../components/user/UserSidebar';
import './cars.css';

const MyCars = () => {

  return (
    <div>
        <Header/>
        <div className="container container-padding">
            <div className="row">
                <div className="col-3">
                    <UserSidebar/>
                </div>
                
                <div className="col-8">
                    <div className='card card-dashboard'>
                        <div className='card-header'>
                            <h4>My Cars</h4>
                        </div>
                        <div className='card-body'>
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

export default MyCars
