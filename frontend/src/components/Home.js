import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button'

import '../home.css'

export default class Home extends Component {

    render() {
        const block = (
            <div className="home-main-block">
                <Container>
                    <Row className="show-grid">
                        <Col md={6}>
                            <div className="head-block-left-side">
                                <h3 className="title">Learn <br/> <span className="highlighted-text">English with Magic</span></h3>
                                <Button href="/login" variant="contained" color="primary" className="start-now-button">Start right now</Button>
                            </div>
                        </Col>
                        <Col md={6}>

                        </Col>
                    </Row>
                </Container>
            </div>
    );

        return (
            <div>
                {block}
            </div>
        );
    }
}