import * as React from 'react';
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
import logo from '../../img/light_logo_mic.png';
import './responsive-appbar.css';
import { Grid } from '@mui/material';
import Badge from '@mui/material/Badge';
import { useContext } from 'react';
import ProfileContext from '../context/ProfileContext';

function ResponsiveAppBar({logout, notifications}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {user, setUser} = useContext(ProfileContext)
  console.log(user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


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
              <Button color="inherit"><Link to='/' style={{ color: '#FFF' }}>Home</Link></Button>
              </MenuItem>

              {!user && <MenuItem key={'signup'} onClick={handleCloseNavMenu}>
              <Button color="inherit"><Link to='/signup' style={{ color: '#FFF' }}>Înregistrare</Link></Button>
                </MenuItem>}
                {!user && <MenuItem key={'signin'} onClick={handleCloseNavMenu}>
                <Button color="inherit" ><Link to='/signin' style={{ color: '#FFF' }}>Logare</Link></Button>
                </MenuItem>}
              {user && user.role !== 2 && <MenuItem key={'profile'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to='/profile' style={{ color: '#FFF' }}>Contul meu</Link></Button>
                </MenuItem>}
              {user && (user.role === 0 || user.role === 1) && <MenuItem key={'search'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to='/search' style={{ color: '#FFF' }}>Caută Service</Link></Button>
                </MenuItem>}
              {user && user.role === 2 && <MenuItem key={'servicePage'} onClick={handleCloseNavMenu}>
              <Button color="inherit" ><Link to={`/service/page/${user.name}`} style={{ color: '#FFF' }}>Pagina mea</Link></Button>
                </MenuItem>}
              {user && user.role === 2 && <MenuItem key={'offers'} onClick={handleCloseNavMenu}>
              <Button color="inherit" >
                <Link to='/service/offers' style={{ color: '#FFF' }}>
             
              <Badge badgeContent={notifications} color="error">
                Oferte
              </Badge>
              </Link></Button>
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
            <Button color="inherit"><Link to='/' style={{ color: '#FFF' }}>Home</Link></Button>
            {!user && <Button color="inherit"><Link to='/signup' style={{ color: '#FFF' }}>Înregistrare</Link></Button>}
            {!user && <Button color="inherit" ><Link to='/signin' style={{ color: '#FFF' }}>Logare</Link></Button>}
            {user && user.role !== 2 && <Button color="inherit" ><Link to='/profile' style={{ color: '#FFF' }}>Contul meu</Link></Button>}
            {user && (user.role === 0 || user.role === 1) && <Button color="inherit" ><Link to='/search' style={{ color: '#FFF' }}>Caută Service</Link></Button>}
            {user && user.role === 2 && <Button color="inherit" ><Link to={`/service/page/${user.name}`} style={{ color: '#FFF' }}>Pagina mea</Link></Button>}
            {user && user.role === 2 && <Button color="inherit" >
              <Link to='/service/offers' style={{ color: '#FFF' }}>
                <Badge badgeContent={notifications} color="error">
                  Oferte
                </Badge>
              </Link></Button>}
            {user && <Button color="inherit" onClick={logout} sx={{ color: '#FFF' }}>Deconectează-te</Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
