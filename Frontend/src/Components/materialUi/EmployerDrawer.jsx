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
import PostAddIcon from '@mui/icons-material/PostAdd';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import { Building2 } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

const sidebarWidth = 260;

const expandedSidebarMixin = (theme) => ({
  width: sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1a1a1a',
  borderRight: '2px solid #14b8a6',
});

const collapsedSidebarMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 8px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 8px)`,
  },
  backgroundColor: '#1a1a1a',
  borderRight: '2px solid #14b8a6',
});

const SidebarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(0.25, 2),
  minHeight: '72px',
  backgroundColor: '#0d0d0d',
  borderBottom: '1px solid #333',
}));

const DesktopSidebar = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'expanded' })(
  ({ theme, expanded }) => ({
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    ...(expanded && {
      ...expandedSidebarMixin(theme),
      '& .MuiDrawer-paper': expandedSidebarMixin(theme),
    }),
    ...(!expanded && {
      ...collapsedSidebarMixin(theme),
      '& .MuiDrawer-paper': collapsedSidebarMixin(theme),
    }),
  }),
);

const MobileSidebar = styled(MuiDrawer)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    width: sidebarWidth,
    backgroundColor: '#1a1a1a',
    borderRight: '2px solid #14b8a6',
    top: '72px',
    height: 'calc(100vh - 72px)',
    zIndex: theme.zIndex.drawer,
  },
  '& .MuiBackdrop-root': {
    top: '72px',
    height: 'calc(100vh - 72px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

export default function EmployerNavigationDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setExpanded(!expanded);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserLogout = () => {
    logout();
    navigate('/login');
  };

  const employerNavigationItems = [
    { 
      label: 'Overview', 
      icon: <DashboardIcon />, 
      route: '/dashboard/employer',
      description: 'Dashboard overview'
    },
    { 
      label: 'Create Job', 
      icon: <PostAddIcon />, 
      route: '/dashboard/employer/create-job',
      description: 'Post new position'
    },
    { 
      label: 'Job Management', 
      icon: <WorkOutlineIcon />, 
      route: '/dashboard/employer/manage-jobs',
      description: 'Manage posted jobs',
      badge: '12'
    },
    { 
      label: 'Candidates', 
      icon: <PeopleAltIcon />, 
      route: '/dashboard/employer/candidates',
      description: 'View applications',
      badge: '45'
    },
    { 
      label: 'Company Profile', 
      icon: <BusinessIcon />, 
      route: '/dashboard/employer/company-profile',
      description: 'Update company info'
    },
    { 
      label: 'Analytics', 
      icon: <BarChartIcon />, 
      route: '/dashboard/employer/analytics',
      description: 'Job performance data'
    },
    { 
      label: 'Configuration', 
      icon: <SettingsIcon />, 
      route: '/dashboard/employer/settings',
      description: 'Account settings'
    },
  ];

  const handleMenuNavigation = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const sidebarMenuContent = (
    <>
      <SidebarHeader>
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            color: '#14b8a6',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            width: 44,
            height: 44,
            '&:hover': {
              backgroundColor: 'rgba(20, 184, 166, 0.2)',
              transform: 'scale(1.05)',
            },
            borderRadius: '12px',
            display: { xs: 'none', lg: 'flex' },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        
        <IconButton
          onClick={handleMobileMenuToggle}
          sx={{
            color: '#14b8a6',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            width: 44,
            height: 44,
            '&:hover': {
              backgroundColor: 'rgba(20, 184, 166, 0.2)',
            },
            borderRadius: '12px',
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {expanded && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Changed icon and title */}
            <BusinessIcon sx={{ color: "#14b8a6" }} />
            <Typography variant="h6" sx={{ color: '#14b8a6', fontWeight: 'bold' }}>
              MyCompany
            </Typography>
          </Box>
        )}
      </SidebarHeader>

      <Divider sx={{ backgroundColor: '#333333', height: 2 }} />

      {/* Company Info Section */}
      <Box sx={{ 
        p: expanded ? 3 : 2, 
        textAlign: 'center',
        backgroundColor: '#0d0d0d',
        borderBottom: '1px solid #333'
      }}>
        <Avatar sx={{ 
          width: expanded ? 56 : 44, 
          height: expanded ? 56 : 44, 
          margin: '0 auto 8px', 
          bgcolor: 'linear-gradient(45deg, #14b8a6, #0f9488)',
          border: '2px solid #14b8a6',
          fontSize: expanded ? '1.5rem' : '1.2rem',
          fontWeight: 'bold'
        }}>
          {user?.companyName ? user.companyName.charAt(0).toUpperCase() : 'C'}
        </Avatar>
        
        {expanded && (
          <>
            <Typography variant="subtitle1" sx={{ 
              color: '#ffffff', 
              fontWeight: 600,
              mb: 0.5
            }}>
              {user?.companyName || 'Company Name'}
            </Typography>
            <Chip 
              label="Standard Account" // Changed from "Premium Account"
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                color: '#14b8a6',
                fontSize: '0.7rem',
                fontWeight: 500
              }} 
            />
          </>
        )}
      </Box>
      
      <Divider sx={{ backgroundColor: '#333333' }} />
      
      {/* Navigation Menu */}
      <List sx={{ 
        backgroundColor: '#1a1a1a', 
        flexGrow: 1,
        pt: 2
      }}>
        {employerNavigationItems.map((menuItem) => (
          <ListItem key={menuItem.label} disablePadding sx={{ 
            display: 'block',
            mb: 0.5,
            px: 1
          }}>
            <ListItemButton
              onClick={() => handleMenuNavigation(menuItem.route)}
              sx={{
                minHeight: 52,
                justifyContent: { xs: 'flex-start', lg: expanded ? 'initial' : 'center' },
                px: 2,
                py: 1.5,
                borderRadius: '12px',
                color: '#e5e5e5',
                '&:hover': {
                  backgroundColor: 'rgba(20, 184, 166, 0.1)',
                  color: '#14b8a6',
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: { xs: 3, lg: expanded ? 3 : 'auto' },
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {menuItem.badge ? (
                  <Badge 
                    badgeContent={menuItem.badge} 
                    color="error" 
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#14b8a6',
                        color: '#000',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {menuItem.icon}
                  </Badge>
                ) : (
                  menuItem.icon
                )}
              </ListItemIcon>
              
              <ListItemText 
                primary={menuItem.label}
                secondary={expanded ? menuItem.description : null}
                sx={{ 
                  opacity: { xs: 1, lg: expanded ? 1 : 0 },
                  '& .MuiListItemText-primary': {
                    color: 'inherit',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  },
                  '& .MuiListItemText-secondary': {
                    color: '#999',
                    fontSize: '0.75rem',
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ backgroundColor: '#333333' }} />
      
      {/* Logout Section */}
      <Box sx={{ 
        backgroundColor: '#0d0d0d',
        p: 1
      }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleUserLogout}
            sx={{
              minHeight: 52,
              justifyContent: { xs: 'flex-start', lg: expanded ? 'initial' : 'center' },
              px: 2,
              borderRadius: '12px',
              color: '#ff6b6b',
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: { xs: 3, lg: expanded ? 3 : 'auto' },
                justifyContent: 'center',
                color: '#ff6b6b',
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Sign Out" 
              sx={{ 
                opacity: { xs: 1, lg: expanded ? 1 : 0 },
                '& .MuiListItemText-primary': {
                  color: '#ff6b6b',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }
              }} 
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Mobile Floating Action Button */}
        <IconButton
          onClick={handleMobileMenuToggle}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: theme.zIndex.drawer + 2,
            background: 'linear-gradient(45deg, #14b8a6, #0f9488)',
            color: '#ffffff',
            width: 64,
            height: 64,
            display: { xs: 'flex', lg: 'none' },
            boxShadow: '0 8px 20px rgba(20, 184, 166, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0f9488, #0d8478)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Building2 size={28} />
        </IconButton>

        {/* Desktop Sidebar */}
        <DesktopSidebar variant="permanent" expanded={expanded}>
          {sidebarMenuContent}
        </DesktopSidebar>

        {/* Mobile Sidebar */}
        <MobileSidebar
          variant="temporary"
          open={mobileMenuOpen}
          onClose={handleMobileMenuToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {sidebarMenuContent}
        </MobileSidebar>

        {/* Main Content Area */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 3, lg: 4 },
            marginLeft: { 
              xs: 0,
              lg: expanded ? `24px` : `calc(${theme.spacing(9)} + 16px)`
            },
            transition: theme.transitions.create(['margin-left'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            backgroundColor: '#f8fafc',
            minHeight: '75vh',
            paddingBottom: { xs: '100px', lg: '20px' },
            borderRadius: { lg: '20px 0 0 0' },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}