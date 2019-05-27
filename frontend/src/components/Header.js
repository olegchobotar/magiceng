import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import SidebarAdmin from '../components/SidebarAdmin';

class Header extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Nav>
                <NavDropdown
                    className="header-dropdown"
                    title={
                        <img src={user.avatar} alt={user.name} title={user.name}
                             className="rounded-circle"
                             style={{
                                 width: '35px',
                                 marginRight: '5px',
                                 border: "2px solid silver"
                             }} />
                    }>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.onLogout.bind(this)}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
        const guestLinks = (
            <Nav>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Button
                    variant="contained"
                    color="primary"
                    href="/register"
                    className="sign-up-button"
                >Sign Up</Button>

            </Nav>
        );
        return(
            <SidebarAdmin user={user} isAuthenticated={isAuthenticated}/>
        )
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));