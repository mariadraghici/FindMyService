import React from 'react';
import './user-sidebar.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

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
  const routeMatch = useRouteMatch(['/mycars', '/addcar', '/profile'])
  const currentTab = routeMatch?.pattern?.path

  return (
      <Tabs value={currentTab}
            orientation="vertical"
            textColor="secondary"
            indicatorColor="secondary"
      >
          <Tab label="Profilul meu" value="/profile" to="/profile" component={Link}/>
          <Tab label="Adauga masina" value="/addcar" to="/addcar" component={Link} />
          <Tab label="Masinile mele" value="/mycars" to="/mycars" component={Link} />
          {/* <Tab label="Recenzii" value="/feedback" to="/feedback" component={Link}/> */}
      </Tabs>
  )
}

export default UserSidebar;
