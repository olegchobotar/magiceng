import React, { Fragment  } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';
import VideoLabel from '@material-ui/icons/VideoLabel';
import Class from '@material-ui/icons/Class';
import MailIcon from '@material-ui/icons/Mail';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import {NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authentication";

import '../App.css'

const drawerWidth = 240;

MiniDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#1b1c1d',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    title: {
        flexGrow: 1,
        color: 'white'
    },
    content: {
        flexGrow: 1,
    },
}));

MiniDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function MiniDrawer(props) {
    const { user, isAuthenticated } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function onLogout(e) {
        e.preventDefault();
        handleClose();
        logoutUser();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {isAuthenticated && user.role === 'Admin' &&(
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        className={classes.title}
                        component={Link}
                        to={'/'}
                    >
                       MagicEng
                    </Typography>
                    { isAuthenticated ?(
                                    <Fragment>
                                        <Button
                                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <img src={user.avatar} alt={user.name} title={user.name}
                                                 className="rounded-circle"
                                                 style={{
                                                     width: '35px',
                                                     marginRight: '5px',
                                                     border: "2px solid silver"
                                                 }} />
                                        </Button>
                                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                            <MenuItem onClick={handleClose} component={Link} to='/profile'>Profile</MenuItem>
                                            <MenuItem onClick={handleClose} component={Link} to='/dashboard'>Dashboard</MenuItem>
                                            <MenuItem onClick={handleClose} component={Link} to='/settings'>Settings</MenuItem>
                                            <MenuItem onClick={onLogout.bind(MiniDrawer)} component={Link} to='/' >Logout</MenuItem>
                                        </Menu>
                                    </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit"
                                    component={Link}
                                    to='/login'>Login</Button>
                            <Button color="inherit"
                                    className="sign-up-button"
                                    component={Link}
                                    to='/register'
                            >Sign Up</Button>
                        </Fragment>

                    )}

                </Toolbar>

            </AppBar>
            {isAuthenticated && user.role === 'Admin' && (
                <Fragment>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem
                                button
                                component={Link}
                                to={'cards'}
                            >
                                <ListItemIcon> <Class /> </ListItemIcon>
                                <ListItemText primary="Cards Constructor" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to={'words'}
                            >
                                <ListItemIcon> <Videocam /> </ListItemIcon>
                                <ListItemText primary="Words Constructor" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to={'video'}
                            >
                                <ListItemIcon> <VideoLabel /> </ListItemIcon>
                                <ListItemText primary="Video Components" />
                            </ListItem>

                        </List>
                    </Drawer>
                </Fragment>
            )}

            <main className={classes.content}>
                <div className={classes.toolbar} />

            </main>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(MiniDrawer));
