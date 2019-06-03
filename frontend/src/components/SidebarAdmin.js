import React, { Fragment  } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Videocam from '@material-ui/icons/Videocam';
import Class from '@material-ui/icons/Class';
import { withRouter } from 'react-router-dom';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authentication";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { allCategories } from "../images-sources";
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { AdminWordsCreate, AdminWordsEdit, AdminWordsList } from '../posts/admidWordsList';
import { AdminVideosCreate, AdminVideosEdit, AdminVideosList } from '../posts/adminVideosList';
import { AdminUsersCreate, AdminUsersEdit, AdminUsersList } from '../posts/adminUsersList';
import { AdminVideoCategoriesCreate, AdminVideoCategoriesEdit, AdminVideoCategoriesList } from '../posts/adminVideoCategoryList';
import { AdminWordCategoriesCreate, AdminWordCategoriesEdit, AdminWordCategoriesList } from '../posts/adminWordCategoryList';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import '../App.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MiniDrawer(props) {
    const { user, isAuthenticated } = props;
    const classes = useStyles();
    const [settingsOpen, seSettingsOpen] = React.useState(false);
    const [backgroundImages, setBackgroundImages] = React.useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleChangeBackground(event, newValue) {
        setBackgroundImages(newValue);
        localStorage.setItem('background', newValue)
    }

    function handleSettings(event) {
        setAnchorEl(null);
        seSettingsOpen(!settingsOpen);
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
                    [classes.appBarShift]: false,
                })}
            >
                <Toolbar>
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
                        Words
                    </Button>
                    <Button
                        className="navbar-item"
                        color="inherit"
                        component={Link}
                        to="/videos"
                    >
                        Videos
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
                                <MenuItem onClick={handleClose} component={Link} to='/favorite'>Favorite Cards</MenuItem>
                                <MenuItem onClick={handleDashboard} component={Link} to='/dashboard'>Dashboard</MenuItem>
                                <MenuItem onClick={handleSettings}>Settings</MenuItem>
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
            <main className={classes.content}>
                <div className={classes.toolbar} />

            </main>
        </Fragment>
    );

    const settings = (
        <Dialog
            maxWidth="md"
            open={settingsOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Settings"}</DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-label="Ringtone"
                    name="ringtone"
                    value={backgroundImages}
                    onChange={handleChangeBackground}
                >
                    {allCategories.map(option => (
                        <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSettings} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )

    const admin = (
        <Fragment>
            <Admin
                title="Dashboard"
                restClient={jsonServerRestClient('/api')}>
                <Resource
                    name="word-categories"
                    options={{ label: 'Word Categories' }}
                    icon={Class}
                    list={AdminWordCategoriesList}
                    edit={AdminWordCategoriesEdit}
                    create={AdminWordCategoriesCreate}
                    remove={Delete}
                />
                <Resource
                    name="words"
                    icon={Class}
                    list={AdminWordsList}
                    edit={AdminWordsEdit}
                    create={AdminWordsCreate}
                    remove={Delete}
                />
                <Resource
                    name="video-categories"
                    options={{ label: 'Video Categories' }}
                    icon={Class}
                    list={AdminVideoCategoriesList}
                    edit={AdminVideoCategoriesEdit}
                    create={AdminVideoCategoriesCreate}
                    remove={Delete}
                />
                <Resource
                    name="videos"
                    icon={Videocam}
                    list={AdminVideosList}
                    edit={AdminVideosEdit}
                    create={AdminVideosCreate}
                    remove={Delete}
                />
                <Resource
                    name="users"
                    icon={Videocam}
                    list={AdminUsersList}
                    edit={AdminUsersEdit}
                    create={AdminUsersCreate}
                    remove={Delete}
                />
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
            {settings}
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
