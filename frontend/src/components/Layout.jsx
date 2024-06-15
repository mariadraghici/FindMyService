import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout;