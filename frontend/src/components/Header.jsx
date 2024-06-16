import React, {useContext, useState, useEffect} from 'react'
import myAxios from './axios/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProfileContext from './context/ProfileContext';
import './header.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import logo from '/img/light_logo_mic.webp';
import { Grid } from '@mui/material';
import Badge from '@mui/material/Badge';
import OffersNotificationsCounter from './context/OffersNotificationsCounter';

const Header = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(ProfileContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {offersNotificationsCounter} = useContext(OffersNotificationsCounter);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const logout = async (e) => {
    e.preventDefault();
    try {
      const res = await myAxios.get('/api/logout');
      if (res.status === 200) {
        setUser(null);
        toast.success(res.data);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  return (
    <AppBar position="static" color='transparent'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* for desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}}>
              <img src={logo} alt="logo" className='logo-desktop' />
          </Box>

          <Grid container alignItems="center" sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <Grid item xs={2}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{color: '#FFF'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={'home'} onClick={handleCloseNavMenu}>
              <Button color="inherit"><Link to='/' style={{ color: '#FFF' }}>Acasă</Link></Button>
              </MenuItem>

              {user && <MenuItem key={'auctions'} onClick={handleCloseNavMenu}>
              <Button color="inherit"><Link to='/auctions' style={{ color: '#FFF' }}>Licitații</Link></Button>
              </MenuItem>}

              {!user && <MenuItem key={'signup'} onClick={handleCloseNavMenu}>
              <Button color="inherit"><Link to='/signup' style={{ color: '#FFF' }}>Înregistrare</Link></Button>
                </MenuItem>}
                {!user && <MenuItem key={'signin'} onClick={handleCloseNavMenu}>
                <Button color="inherit" ><Link to='/signin' style={{ color: '#FFF' }}>Logare</Link></Button>
                </MenuItem>}
              {/* {user && user.role !== 2 && <MenuItem key={'profile'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to='/profile' style={{ color: '#FFF' }}>Contul meu</Link></Button>
                </MenuItem>} */}
              {user && (user.role === 0 || user.role === 1) && <MenuItem key={'search'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to='/search' style={{ color: '#FFF' }}>Caută Service</Link></Button>
                </MenuItem>}
              {user && user.role === 2 && <MenuItem key={'servicePage'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to={`/service/page/${user.name}`} style={{ color: '#FFF' }}>Pagina mea</Link></Button>
                </MenuItem>}
              {user && user.role === 2 && <MenuItem key={'offers'} onClick={handleCloseNavMenu}>
              <Button color="inherit" >
                <Link to='/service/offers' style={{ color: '#FFF' }}>
             
              <Badge badgeContent={offersNotificationsCounter} color="error">
                Oferte
              </Badge>
              </Link></Button>
                </MenuItem>}
              
              {user && user.role !== 2 && <MenuItem key={'profilulMeu'} onClick={handleCloseNavMenu}>
              <Button color='inherit' LinkComponent={Link} to='/profile' sx={{color: '#FFF'}}>Profilul meu</Button>
              </MenuItem>}
              {user && user.role !== 2 && <MenuItem key={'adaugaMasina'} onClick={handleCloseNavMenu}>
              <Button color='inherit' LinkComponent={Link} to={`/addcar`} sx={{color: '#FFF'}}>Adauga masina</Button>
              </MenuItem>}
              {user && user.role !== 2 && <MenuItem key={'masinileMele'} onClick={handleCloseNavMenu}>
              <Button color="inherit" LinkComponent={Link} to='/mycars' sx={{color: '#FFF'}}> Masinile mele
              </Button>
              </MenuItem>}

              {user && user.role === 0 && <MenuItem key={'admin'} onClick={handleCloseNavMenu}>
              <Button color='inherit' LinkComponent={Link} to='/admin/dashboard' sx={{color: '#FFF'}}>ADMIN DASHBOARD</Button>
              </MenuItem>}

              {user && <MenuItem key={'logout'} onClick={handleCloseNavMenu}>
               <Button color="inherit" onClick={logout} sx={{ color: '#FFF' }}>Deconectează-te</Button>
                </MenuItem>}
            </Menu>
          </Grid>

          {/* for mobile - logo */}
          <Grid item xs={8} container justifyContent="center">
              <img src={logo} alt="logo" className='logo-mobile'/>
            </Grid>
            <Grid item xs={2} />
          </Grid>

          {/* for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end'}}>
            <Button color="inherit"><Link to='/' style={{ color: '#FFF' }}>Acasă</Link></Button>
            {user && <Button color="inherit"><Link to='/auctions' style={{ color: '#FFF' }}>Licitații</Link></Button>}
            {!user && <Button color="inherit"><Link to='/signup' style={{ color: '#FFF' }}>Înregistrare</Link></Button>}
            {!user && <Button color="inherit" ><Link to='/signin' style={{ color: '#FFF' }}>Logare</Link></Button>}
            {user && user.role !== 2 && <Button color="inherit" ><Link to='/profile' style={{ color: '#FFF' }}>Contul meu</Link></Button>}
            {user && (user.role === 0 || user.role === 1) && <Button color="inherit" ><Link to='/search' style={{ color: '#FFF' }}>Caută Service</Link></Button>}
            {user && user.role === 2 && <Button color="inherit" ><Link to={`/service/page/${user.name}`} style={{ color: '#FFF' }}>Pagina mea</Link></Button>}
            {user && user.role === 2 && <Button color="inherit" >
              <Link to='/service/offers' style={{ color: '#FFF' }}>
                <Badge badgeContent={offersNotificationsCounter} color="error">
                  Oferte
                </Badge>
              </Link></Button>}
              {user && user.role === 1 &&
              <Button color='inherit' LinkComponent={Link} to='/admin/dashboard' sx={{color: '#FFF'}}>ADMIN DASHBOARD</Button>
              }

              {user && user.role !== 2 &&
              <Button color='inherit' LinkComponent={Link} to='/serviceRecommendation' sx={{color: '#FFF'}}>Recomandă Service</Button>
              }
            {user && <Button color="inherit" onClick={logout} sx={{ color: '#FFF' }}>Deconectează-te</Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;