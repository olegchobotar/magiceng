import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Sky from 'react-sky';
import '../home.css'

export default class Home extends Component {

    render() {
        const block = (
            <React.Fragment>
                <Sky
                    images={{
                        0: "https://image.flaticon.com/icons/svg/1198/1198051.svg",
                        1: "https://image.flaticon.com/icons/svg/1198/1198052.svg",
                        2: "https://image.flaticon.com/icons/svg/1198/1198053.svg",
                        3: "https://image.flaticon.com/icons/svg/1198/1198053.svg",
                        4: "https://image.flaticon.com/icons/svg/1198/1198056.svg",
                        5: "https://image.flaticon.com/icons/svg/1198/1198057.svg",
                        6: "https://image.flaticon.com/icons/svg/1198/1198059.svg",
                        7: "https://image.flaticon.com/icons/svg/1198/1198060.svg",
                        8: "https://image.flaticon.com/icons/svg/1198/1198062.svg",
                        9: "https://image.flaticon.com/icons/svg/1198/1198063.svg",
                        10: "https://image.flaticon.com/icons/svg/1198/1198065.svg",
                        11: "https://image.flaticon.com/icons/svg/1198/1198053.svg",
                        12: "https://image.flaticon.com/icons/svg/1198/1198068.svg",
                        13: "https://image.flaticon.com/icons/svg/1198/1198069.svg",
                        14: "https://image.flaticon.com/icons/svg/1198/1198070.svg",
                        15: "https://image.flaticon.com/icons/svg/1198/1198073.svg",
                        16: "https://image.flaticon.com/icons/svg/1198/1198075.svg",
                        17: "https://image.flaticon.com/icons/svg/1198/1198076.svg",
                        18: "https://image.flaticon.com/icons/svg/1198/1198079.svg"
                    }}
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
