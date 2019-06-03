import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Sky from 'react-sky';
import '../home.css'
import { animals , space, food, tech, autumn, social } from '../images-sources';

export default class Home extends Component {

    render() {
        let background = '';
        switch (localStorage.getItem('background')) {
            case 'Autumn':
                background = autumn;
                break;
            case 'Space':
                background = space;
                break;
            case 'Food':
                background = food;
                break;
            case 'Tech':
                background = tech;
                break;
            case 'Autumn':
                background = food;
                break;
            case 'Social':
                background = social;
                break;
            default:
                background = animals;
        }
        const block = (
            <React.Fragment>
                <Sky
                    images={background}
                    how={130} /* Pass the number of images Sky will render chosing randomly */
                    time={40} /* time of animation */
                    size={'100px'} /* size of the rendered images */
                    background="silver" /* color of background */
                />
                <div>
                    <Container >
                        <Row className="show-grid">
                            <Col md={6}>
                                <div className="head-block-left-side">
                                    <h3 className="title">New <br/>World for your Child</h3>
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="contained"
                                        color="primary"
                                        className="start-now-button"
                                    >
                                        Start right now
                                    </Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="content-category">
                                    <h1 style={{textAlign: 'center'}}>What we propose</h1>
                                    <ul>
                                        <li><Link to="/videos">Interesting videos</Link></li>
                                        <li><Link to="/words">Cards for learning new words</Link></li>
                                        <li><Link to="/card-game">Think you know all words? Try it</Link></li>
                                    </ul>


                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </React.Fragment>

    );

        return (
            <div>
                {block}
            </div>
        );
    }
}
