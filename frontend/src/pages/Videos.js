import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';

export default class VideosComponent extends Component {
    state = {
        isLoading: true,
        wordPosts: [],
        error: null
    };

    componentDidMount() {
        axios.get('/api/videos')
            .then(res => {
                this.setState({
                    isLoading: false,
                    wordPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {

        const { isLoading, wordPosts, error } = this.state;

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
                            wordPosts.map(wordPost => {
                                const { _id } = wordPost;
                                return (
                                    <Grid item xs={6} md={4} lg={3} key={_id}>
                                        {/*<VideoCard value={wordPost}/>*/}
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