import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Briefcase } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#000000',
  // borderRight: '1px solid #333',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#000000',
  // borderRight: '1px solid #333',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  minHeight: '64px',
  backgroundColor: '#000000',
}));

const PermanentDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const TemporaryDrawer = styled(MuiDrawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#000000',
    // borderRight: '1px solid #333',
    top: '64px', // Start below AppBar (64px is standard AppBar height)
    height: 'calc(100vh - 64px)', // Adjust height
    zIndex: theme.zIndex.drawer,
  },
  '& .MuiBackdrop-root': {
    top: '64px', // Backdrop also starts below header
    height: 'calc(100vh - 64px)',
  },
}));

export default function JobSeekerDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const jobSeekerMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard/jobseeker' },
    { text: 'Find Jobs', icon: <WorkIcon />, path: '/jobs' },
    { text: 'Applied Jobs', icon: <AssignmentIcon />, path: '/dashboard/jobseeker/applied-jobs' },
    { text: 'Saved Jobs', icon: <FavoriteIcon />, path: '/dashboard/jobseeker/saved-jobs' },
    { text: 'Profile', icon: <PersonIcon />, path: '/dashboard/jobseeker/profile' },
    { text: 'Job Alerts', icon: <NotificationsIcon />, path: '/dashboard/jobseeker/alerts' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/jobseeker/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false); // Close mobile drawer after navigation
  };

  const drawerContent = (
    <>
      <DrawerHeader>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: '#14b8a6',
            backgroundColor: 'transparent',
            width: 48,
            height: 48,
            padding: 4.5,
            '&:hover': {
              backgroundColor: '#333333',
            },
            borderRadius: '50%',
            display: { xs: 'none', md: 'flex' }, // Hide on mobile
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        
        {/* Mobile close button */}
        <IconButton
          onClick={handleMobileDrawerToggle}
          sx={{
            color: '#14b8a6',
            backgroundColor: 'transparent',
            width: 48,
            height: 48,
            padding:4.5,
            '&:hover': {
              backgroundColor: '#333333',
            },
            borderRadius: '50%',
            display: { xs: 'flex', md: 'none' }, // Show only on mobile
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>

      <Divider sx={{ backgroundColor: '#333333' }} />

      {/* User Avatar Only - Name is in Header */}
      <Box sx={{ 
        p: 2, 
        textAlign: 'center', 
        paddingTop : 1.5,
        paddingBottom : 1.5,
        backgroundColor: '#000000',
        color: '#ffffff'
      }}>
        <Avatar sx={{ 
          width: open ? 48 : 40, 
          height: open ? 48 : 40, 
          margin: '0 auto', 
          bgcolor: '#14b8a6',
          fontSize: open ? '1.2rem' : '1rem'
        }}>
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Avatar>
      </Box>
      
      <Divider sx={{ backgroundColor: '#333333' }} />
      
      {/* Main Menu Items */}
      <List sx={{ backgroundColor: '#000000', color: '#ffffff', flexGrow: 1 }}>
        {jobSeekerMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: { xs: 'flex-start', md: open ? 'initial' : 'center' },
                px: 2.5,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 3, md: open ? 3 : 'auto' },
                  justifyContent: 'center',
                  color: '#14b8a6',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: { xs: 1, md: open ? 1 : 0 }, // Always visible on mobile
                  color: '#ffffff !important',
                  '& .MuiListItemText-primary': {
                    color: '#ffffff !important',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ backgroundColor: '#333333' }} />
      
      {/* Logout Button */}
      <Box sx={{ backgroundColor: '#000000' }}>
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: { xs: 'flex-start', md: open ? 'initial' : 'center' },
                px: 2.5,
                color: '#ff4444',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 3, md: open ? 3 : 'auto' },
                  justifyContent: 'center',
                  color: '#ff4444',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                sx={{ 
                  opacity: { xs: 1, md: open ? 1 : 0 }, // Always visible on mobile
                  color: '#ff4444 !important',
                  '& .MuiListItemText-primary': {
                    color: '#ff4444 !important',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Main Dashboard Content - No separate header to avoid overlap */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Mobile Floating Button */}
        <IconButton
          onClick={handleMobileDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#14b8a6',
            color: '#ffffff',
            width: 56,
            height: 56,
            display: { xs: 'flex', md: 'none' },
            '&:hover': {
              backgroundColor: '#0f9488',
            },
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Permanent Drawer */}
        <PermanentDrawer variant="permanent" open={open}>
          {drawerContent}
        </PermanentDrawer>

        {/* Mobile Temporary Drawer */}
        <TemporaryDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
        >
          {drawerContent}
        </TemporaryDrawer>

        {/* Main Content Area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 3 },
            marginLeft: { 
              xs: 0, // No margin on mobile
              md: open ? `20px` : `calc(${theme.spacing(8)} + 1px)`
            },
            transition: theme.transitions.create(['margin-left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: '#f5f5f5',
            minHeight: '70vh', // Adjusted for no separate header
            // Ensure content doesn't get hidden behind floating button on mobile
            paddingBottom: { xs: '80px', md: 0 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}