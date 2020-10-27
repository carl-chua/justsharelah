import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ProfileCard from "../Components/ProfileCard";
import ChangePassword from "../Components/ChangePassword";

import NavBar from "../Components/NavBar";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: "5%",
    display: "inline",
    padding: 0,
    margin: 0,
  },
  content: {
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingLeft: 10,
    minWidth: "18vw",
    height: 120,
  },
  tabPanel: {
  },
  tabContainer : {
    marginLeft: "5%",
    padding: "2%",
    maxHeight: "85vh", 
    minWidth: "60VW",
    overflow: "auto",
    borderRadius : 16,
    borderColor : "#BEBEBE",
    boxShadow : "-10px 10px 4px rgba(0, 0, 0, 0.05)",
},
}));

const dummyData = {
        name: "MAX",
        mobileNum: "999999",
        password: "xxxx",
        country: "MSIA"
    }

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div className={classes.root}>
      <div>
        <NavBar style={{ position: "sticky" }} />
      </div>
      <div className = {classes.content}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          
        </Tabs>
        <TabPanel value={value} index={0} className = {classes.tabPanel}>
          <Box
              m = {1}
              border = {1}
              bgcolor = "background-paper"
              className = {classes.tabContainer}
              >
              <ProfileCard data = {dummyData}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} className = {classes.tabPanel}>
        <Box
              m = {1}
              border = {1}
              bgcolor = "background-paper"
              className = {classes.tabContainer}
              >
              <ChangePassword data = {dummyData}/>
          </Box>
        </TabPanel>
      </div>
    </div>
  );
}
