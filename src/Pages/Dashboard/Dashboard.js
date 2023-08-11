import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar } from '@mui/material';
import { mainListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders.js';
import WashBookingForm from '../../Components/BookWash';
import Bookings from '../../Components/Bookings';
import ProfilePage from '../../Components/ProfileForm';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {

  const [open, setOpen] = React.useState(true);
  const [validToken, setValidToken] = React.useState(false);
  const[email,setEmail]=React.useState('')
  const[Dashboard,setDashboard]=React.useState(true)
  const[Book,setBook]=React.useState(false)
  const[History,setHistory]=React.useState(false)
  const[Profile,setProfile]=React.useState(false)
  

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  
  const[name,setName]=React.useState('')
  const [phone,setPhone]=React.useState('')
  sessionStorage.setItem('email',email)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


 const handleLogout=()=>{
    sessionStorage.removeItem('token')
    window.location.href="/"
 }
  React.useEffect(() => {

      const checkTokenValidity = async () => {

        try {
          const token=sessionStorage.getItem('token')

              
          const response = await fetch('http://localhost:5050/dashboard', {
            method: 'GET',
            headers: {
              Authorization: token,
            },    
          });
  
          const data = await response.json();
            
          if (response.ok) {
            setValidToken(true);
            setName(data.name)
            setEmail(data.email)
            setPhone(data.phone)
          console.log(data)
          sessionStorage.setItem('email',data.email)
          }

          else{
              window.location.href="/"
          }
        } catch (error) {
          console.error('Token verification error:', error);
        }
      };
  
      checkTokenValidity();
    }, []);  


  const toggleDrawer = () => {
    setOpen(!open);
  };

    const handleDashboard=()=>{
        setDashboard(true)
        setBook(false)
        setHistory(false)
        setProfile(false)
    }
    const handleBook=()=>{
        setDashboard(false)
        setBook(true)
        setHistory(false)
        setProfile(false)
    }
    const handleHistory=()=>{
        setDashboard(false)
        setBook(false)
        setHistory(true)
        setProfile(false)
    }
    const handleProfile=()=>{
        setDashboard(false)
        setBook(false)
        setHistory(false)
        setProfile(true)
    }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
            
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
              
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
                  HOORA
            </Typography>
            
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <MenuItem onClick={handleProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleHistory}>
                <Typography textAlign="center">History</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems ({ logout:handleLogout ,book:handleBook,profile:handleProfile,history:handleHistory,dashboard:handleDashboard})} 
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        {Dashboard &&  <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart name={name} email={email} phone={phone} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Bookings />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
 }

 {Book && <WashBookingForm/>}
 {History && <Bookings/>}
    {Profile && <ProfilePage name={name} email={email} phone={phone}/>}
            </Box>
    </ThemeProvider>
  );
}