import React, {Fragment, useEffect, useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Videocam from '@material-ui/icons/Videocam';
import Category from '@material-ui/icons/Category';
import Class from '@material-ui/icons/Class';
import People from '@material-ui/icons/People';
import { withRouter } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser, setCurrentUser} from "../actions/authentication";
import { useAlert } from 'react-alert'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { allCategories } from "../images-sources";
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { setTheme } from '../actions/theme'

import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import { AdminWordsCreate, AdminWordsEdit, AdminWordsList } from '../adminPanel/admidWordsList';
import { AdminVideosCreate, AdminVideosEdit, AdminVideosList } from '../adminPanel/adminVideosList';
import { AdminUsersCreate, AdminUsersEdit, AdminUsersList } from '../adminPanel/adminUsersList';
import { AdminVideoCategoriesCreate, AdminVideoCategoriesEdit, AdminVideoCategoriesList } from '../adminPanel/adminVideoCategoryList';
import { AdminWordCategoriesCreate, AdminWordCategoriesEdit, AdminWordCategoriesList } from '../adminPanel/adminWordCategoryList';

import ExitToApp from '@material-ui/icons/ExitToApp';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import '../App.css'
import store from "../store";
import {SET_THEME} from "../actions/types";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MiniDrawer(props) {
    const { user, isAuthenticated } = props;
    const classes = useStyles();
    const [settingsOpen, seSettingsOpen] = React.useState(false);
    const [settingsThemeOpen, setSettingsThemeOpen] = React.useState(false);
    const [settingsChangePasswordOpen, setSettingsChangePasswordOpen] = React.useState(false);
    const [backgroundImages, setBackgroundImages] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [initialized, setInitialized] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        if (!initialized) {
            if (localStorage.getItem('background')) {
                setBackgroundImages(localStorage.getItem('background'));
            }
            setInitialized(true);
        }
    });
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
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
                        Cards
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
    const { value: valueProp, open } = props;
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setBackgroundImages(valueProp);
        }
    }, [valueProp, open]);

    function handleEntering() {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    }

    function handleChangePassword() {
        setSettingsChangePasswordOpen(false);
        axios.post(`/api/users/${props.auth.user.id}/change-password`, {oldPassword, newPassword})
            .then(res => {
                alert.show('Password has been changed');
            })
            .catch(error => {
                alert.show('Enter right password');
            });
    }

    function handleOk() {
        setSettingsThemeOpen(false);
    }

    function handleChange(event, newValue) {
        setBackgroundImages(newValue);
        store.dispatch({
            type: SET_THEME,
            payload: newValue
        });
        localStorage.setItem('background', newValue)
    }

    function handleOldPassword(e) {
        setOldPassword(e.target.value);
    }

    function handleNewPassword(e) {
        setNewPassword(e.target.value);
    }

    const themeSettingsModal = (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={settingsThemeOpen}
        >
            <DialogTitle id="settings-theme">Theme</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="Ringtone"
                    name="ringtone"
                    value={backgroundImages || localStorage.getItem('background')}
                    onChange={handleChange}
                >
                    {allCategories.map(option => (
                        <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
    const alert = useAlert();
    const changePasswordSettingsModal = (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={settingsChangePasswordOpen}
        >
            <DialogTitle id="settings-theme">Change Password</DialogTitle>
            <DialogContent dividers>
                <TextField
                    onChange={handleOldPassword}
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Enter old password"
                    type="password"
                    fullWidth
                />
                <TextField
                    onChange={handleNewPassword}
                    margin="dense"
                    id="password"
                    label="Enter new password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleChangePassword} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
    const settings = (
        <Dialog
            fullWidth={true}
            maxWidth = {'sm'}
            open={settingsOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Settings"}</DialogTitle>
            <DialogContent>
                <List component="div" role="list">
                    <ListItem
                        button
                        divider
                        aria-haspopup="true"
                        aria-controls="ringtone-menu"
                        aria-label="Theme"
                        onClick={() => setSettingsThemeOpen(true)}
                        role="listitem"
                    >
                        <ListItemText primary="Theme" secondary={backgroundImages || localStorage.getItem('background')} />
                    </ListItem>
                </List>
                <List component="div" role="list">
                    <ListItem
                        button
                        divider
                        aria-haspopup="true"
                        aria-controls="ringtone-menu"
                        aria-label="Change password"
                        onClick={(  ) => setSettingsChangePasswordOpen(true)}
                        role="listitem"
                    >
                        <ListItemText primary="Change Password"/>
                    </ListItem>
                </List>
                {themeSettingsModal}
                {changePasswordSettingsModal}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSettings} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    const admin = (
        <Fragment>
            <Admin
                title="Dashboard"
                restClient={jsonServerRestClient('/api')}>
                <Resource
                    name="word-categories"
                    options={{ label: 'Card Categories' }}
                    icon={Category}
                    list={AdminWordCategoriesList}
                    edit={AdminWordCategoriesEdit}
                    create={AdminWordCategoriesCreate}
                    remove={Delete}
                />
                <Resource
                    name="words"
                    options={{ label: 'Cards' }}
                    icon={Class}
                    list={AdminWordsList}
                    edit={AdminWordsEdit}
                    create={AdminWordsCreate}
                    remove={Delete}
                />
                <Resource
                    name="video-categories"
                    options={{ label: 'Video Categories' }}
                    icon={Category}
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
                    icon={People}
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
    auth: PropTypes.object.isRequired,
    theme: PropTypes.string,
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
    setTheme: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    theme: PropTypes.string,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, setTheme })(withRouter(MiniDrawer));
