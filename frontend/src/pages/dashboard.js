import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import store from "../store";

export default class Dashboard extends Component {

    render() {
        const block = (
            <div>
                <div className="home-main-block">
                    <Container>
                        {store.getState()['auth']['user']['role'] !== 'Admin' && (
                            <Redirect to="/" />
                        )}
                    </Container>
                </div>

            </div>

        );

        return (
            <div>
                {/*<Sidebar/>*/}
            </div>
        );
    }
}