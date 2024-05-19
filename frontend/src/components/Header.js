import React, {useContext} from 'react'
import Container from '@mui/material/Container';
import myAxios from './axios/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ProfileContext from './context/ProfileContext';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(ProfileContext);

  const logout = () => {
    myAxios.get('/api/logout')
    .then(res => {
      if (res.status === 200) {
        toast.success(res.data);
        setUser(false);
        navigate('/');
      }
    })
    .catch(err => {
      toast.error(err.response.data.error);
    });
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='transparent' >
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <img src={require("../img/light_logo_mic.png")} alt="logo" className="img-width" />
              </Typography>
              {/* {user.role === 1 && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>                
              </Typography>} */}
              <Button color="inherit"><Link to='/' style={{ color: '#FFF' }}>Home</Link></Button>
              {!user && <Button color="inherit"><Link to='/signup' style={{ color: '#FFF' }}>Înregistrare</Link></Button>}
              {!user && <Button color="inherit" ><Link to='/signin' style={{ color: '#FFF' }}>Logare</Link></Button>}
              {user && <Button color="inherit" ><Link to='/profile' style={{ color: '#FFF' }}>Contul meu</Link></Button>}
              {(user.role === 0 || user.role === 1) && <Button color="inherit" ><Link to='/search' style={{ color: '#FFF' }}>Caută Service</Link></Button>}
              {user.role === 2 && <Button color="inherit" ><Link to={`/service/page/${user.name}`} style={{ color: '#FFF' }}>Pagina mea</Link></Button>}
              {user && <Button color="inherit" onClick={logout} sx={{ color: '#FFF' }}>Deconectează-te</Button>}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    
  );
}

export default Header;