import React from 'react';
import './user-sidebar.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import  useMediaQuery from '@mui/material/useMediaQuery';

function useRouteMatch(patterns) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath(pattern, pathname)
      if (possibleMatch !== null) {
          return possibleMatch
      }
  }
  return null
};

const UserSidebar = () => {
  const routeMatch = useRouteMatch(['/mycars', '/addcar', '/profile', '/myauctions'])
  const currentTab = routeMatch?.pattern?.path
  const isSmallScreen = useMediaQuery('(max-width:600px)');


  return (
      <Tabs value={currentTab}
            orientation="horizontal"
            textColor="primary"
            variant={isSmallScreen ? "fullWidth" : "standard"}
            indicatorColor="primary"
            className='user-sidebar-tabs'
      >
          <Tab label="Profilul meu" value="/profile" to="/profile" component={Link} sx={{fontSize: 'large'}}/>
          <Tab label="Adauga masina" value="/addcar" to="/addcar" component={Link} sx={{fontSize: 'large'}}/>
          <Tab label="Masinile mele" value="/mycars" to="/mycars" component={Link} sx={{fontSize: 'large'}}/>
          <Tab label="Licitatiile mele" value="/myauctions" to="/myauctions" component={Link} sx={{fontSize: 'large'}}/>
      </Tabs>
  )
}

export default UserSidebar;
