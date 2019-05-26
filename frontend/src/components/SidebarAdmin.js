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
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';
import VideoLabel from '@material-ui/icons/VideoLabel';
import Class from '@material-ui/icons/Class';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authentication";

import { jsonServerRestClient, Admin, Resource, Delete, MenuItemLink } from 'admin-on-rest';

import { WordPostList, WordPostEdit, WordPostCreate } from '../posts/wordPosts';
import { VideoPostList, VideoPostEdit, VideoPostCreate } from '../posts/videoPosts';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import '../App.css'
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

    function handleDashboard(event) {
        setAnchorEl(event.currentTarget);
        localStorage.setItem('isDashboardActive', true);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function closeDashboard() {
        localStorage.removeItem('isDashboardActive');
    }

    function onLogout(e) {
        e.preventDefault();
        logoutUser();
        handleClose();
    }

    const userBar = (
        <Fragment>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {isAuthenticated && user.role === 'Admin' && false &&(
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
                    <Button
                        className="navbar-item"
                        color="inherit"
                        component={Link}
                        to="/words"
                    >
                        New Words
                    </Button>
                    <Button
                        className="navbar-item"
                        color="inherit"
                        component={Link}
                        to="/videos"
                    >
                        Video
                    </Button>
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
                                <MenuItem onClick={handleDashboard} component={Link} to='/dashboard'>Dashboard</MenuItem>
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
            {isAuthenticated && user.role === 'Admiddn' && (
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
                                to={'/dashboard/cards'}
                            >
                                <ListItemIcon> <Class /> </ListItemIcon>
                                <ListItemText primary="Cards Constructor" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to={'/dashboard/words'}
                            >
                                <ListItemIcon> <Videocam /> </ListItemIcon>
                                <ListItemText primary="Words Constructor" />
                            </ListItem>
                            <ListItem
                                button
                                component={Link}
                                to={'/dashboard/video'}
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
        </Fragment>
    )

    // const convertHTTPResponseToREST = (response, type, resource, params) => {
    //     const { headers, json } = response;
    //     switch (type) {
    //         case 'GET_LIST':
    //             return {
    //                 data: json.map(resource => {...resource, id: resource._id
    //                 }),
    //                 total: parseInt(headers.get('content-range').split('/').pop(), 10),
    //             };
    //         case 'UPDATE':
    //         case 'DELETE':
    //         case 'GET_ONE':
    //             return { ...json, id: json._id };
    //         case 'CREATE':
    //             return { ...params.data, id: json._id };
    //         default:
    //             return json;
    //     }
    // };

    const admin = (
        <Fragment>
            <Admin
                title="Dashboard"
                restClient={jsonServerRestClient('/api')}>
                <Resource
                    name="words"
                    icon={Class}
                    list={WordPostList}
                    edit={WordPostEdit}
                    create={WordPostCreate}
                    remove={Delete}/>
                <Resource
                    name="videos"
                    icon={Videocam}
                    list={VideoPostList}
                    edit={VideoPostEdit}
                    create={VideoPostCreate}
                    remove={Delete}/>
            </Admin>
            <Tooltip
                title="Exit"
                aria-label="Add"
                onClick={closeDashboard}
                component={Link}
                to="/"
            >
                <Fab
                    color="primary"
                    className={classes.absolute}>
                    <ExitToApp />
                </Fab>
            </Tooltip>
        </Fragment>

    );
    return (
        <div>
            {isAuthenticated && user.role === 'Admin' && localStorage.isDashboardActive ? admin : userBar}
        </div>
    );
}


const drawerWidth = 240;


MiniDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const useStyles = makeStyles(theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(MiniDrawer));
