import React from 'react';
import './user-sidebar.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function samePageLinkNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }
  
  function LinkTab(props) {
    return (
      <Tab
        component="a"
        aria-current={props.selected && 'page'}
        {...props}
      />
    );
  }
  
  LinkTab.propTypes = {
    selected: PropTypes.bool,
  };

const UserSidebar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
        event.type !== 'click' ||
        (event.type === 'click' && samePageLinkNavigation(event))
        ) {
        setValue(newValue);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            role="navigation"
            orientation='vertical'
        >
                    <LinkTab label="Profilul meu" href='/dashboard'/>
                    <LinkTab label="Mașinile mele" href='/mycars'/>
                    <LinkTab label="Adaugă o nouă mașină" href='/addcar'/>
                    <LinkTab label="Feedback" href='/feedback'/>
                </Tabs>
            </Box>
        );
}

export default UserSidebar;
