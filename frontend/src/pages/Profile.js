import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { logoutUser } from '../actions/authentication';
import { withRouter} from 'react-router-dom';

import '../words-page.css';
import {connect} from "react-redux";

class Profile extends Component {

    render() {
        const { id, name, email, role, avatar } = this.props.auth.user;

        return (
            <Container>
                <Row >
                    <Col md={6}>
                        <div>
                            <img src={avatar} alt="avatar"/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h3>Id</h3>
                        <p>{id}</p>
                        <h3>Name</h3>
                        <p>{name}</p>
                        <h3>Email</h3>
                        <p>{email}</p>
                        <h3>Role</h3>
                        <p>{role}</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Profile));
