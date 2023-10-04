import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SearchBar from './SearchBar/SearchBar';
import { useLocation } from 'react-router-dom';

export default function PrimarySearchAppBar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const location = useLocation();
    const isLoginPage = location.pathname === '/login'
    const isSignupPage = location.pathname === '/signup'

    const addProductTab = (isLoggedIn && isAdmin && !isLoginPage && !isSignupPage) || (!isLoggedIn && !isLoginPage && !isSignupPage)
        ? { title: 'Add Product', link: 'products/addProduct' }
        : null;

    const addSignUpLink = (isLoginPage || isSignupPage) ? { title: 'Sign Up', link: '/signup' } : null;
    const addLoginLink = (!isLoggedIn) ? { title: 'Login', link: '/login' } : null;
    const addHomeLink = (!isLoginPage && !isSignupPage) ? { title: 'Home', link: '/' } : null;

    const tabsData = [
        addHomeLink,
        addProductTab,
        addLoginLink,
        addSignUpLink,
    ].filter(Boolean);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {tabsData.map((tab, index) => (
                <MenuItem key={index}>
                    <Link to={tab.link}>{tab.title}</Link>
                </MenuItem>
            ))}
        </Menu>
    );
    //
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCart />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        upGrad E-Shop
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {(!isLoginPage && !isSignupPage) && (
                        <SearchBar />
                    )}

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {tabsData.map((tab, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                noWrap
                                component={Link}
                                to={tab.link}
                                sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }}
                                mr={3}
                                mt={0.5}
                            >
                                {tab.title}
                            </Typography>
                        ))}
                        {isLoggedIn && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'darkred',
                                    },
                                }}
                            >
                                Sign Out
                            </Button>
                        )}

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

        </Box>
    );
}