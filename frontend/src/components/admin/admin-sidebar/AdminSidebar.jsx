import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const AdminSidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };
    
    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    
    const handleDrawerToggle = () => {
        if (!isClosing) {
          setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Typography variant="h6" component="div" sx={{margin: '5%'}}>
            FindMyService
            </Typography>
            <Divider />
          <Divider />
          <List>
              <ListItem disablePadding>
                <Link to="/admin/dashboard">
                    <ListItemButton>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to="/admin/component/add">
                    <ListItemButton>
                        <ListItemText primary="Add Component" />
                    </ListItemButton>
                </Link>
            </ListItem>
            <ListItem disablePadding>
                <Link to="/admin/component/update">
                    <ListItemButton>
                        <ListItemText primary="Update Component" />
                    </ListItemButton>
                </Link>
            </ListItem>

          </List>
          <Divider />
        </div>
      );

    return (
     <>
         <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
     </>
    )
}

export default AdminSidebar;
