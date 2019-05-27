import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import WordItemCard from '../components/WordItemCard';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';

export default class WordsComponent extends Component {
    state = {
        isLoading: true,
        videoPosts: [],
        error: null
    };

    componentDidMount() {
        axios.get('/api/words')
            .then(res => {
                this.setState({
                    isLoading: false,
                    videoPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {

        const { isLoading, videoPosts, error } = this.state;

        const main = (
            <div>
                <img
                    className="header-image"
                    src={process.env.PUBLIC_URL + '/assets/images/beach.jpg'}
                    alt='beautiful image'
                />
                <div className="posts-container">
                    <h1>Words</h1>
                    <Grid
                        justify="center"
                        container
                        spacing={3}>
                        {error ? <p>{error.message}</p> : null}
                        {!isLoading ? (
                            videoPosts.map(videoPost => {
                                const { id } = videoPost;
                                return (
                                    <Grid item xs={6} md={4} lg={3} key={id}>
                                       <WordItemCard value={videoPost}/>
                                    </Grid>
                                );
                            })
                        ) : (
                            <h3>Loading...</h3>
                        )}
                    </Grid>
                </div>

            </div>
        );

        return (
            <React.Fragment>
                { main }

            </React.Fragment>
        );
    }
}