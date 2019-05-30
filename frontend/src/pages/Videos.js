import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import VideoCard from '../components/VideoCard.js';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';
import TextField from '@material-ui/core/TextField'

export default class VideosComponent extends Component {
    constructor() {
        super();

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    state = {
        isLoading: true,
        videoPosts: [],
        error: null
    };

    componentDidMount() {
        axios.get('/api/videos')
            .then(res => {
                this.setState({
                    isLoading: false,
                    videoPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleSearchChange(e) {
        const api = e.target.value ? '/api/videos/find/' + e.target.value : '/api/videos';
        axios.get(api)
            .then(res => {
                this.setState({
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
                <div
                    className="search-block"
                >
                    <TextField
                        type="text"
                        label="Search"
                        name="video-search"
                        onChange={ this.handleSearchChange }
                        variant="outlined"
                    />
                </div>
                <div className="posts-container">
                    <h1>Videos</h1>
                    <Grid
                        container
                        spacing={3}>
                        {error ? <p>{error.message}</p> : null}
                        {!isLoading ? (
                            videoPosts.map(videoPost => {
                                const { _id } = videoPost;
                                return (
                                    <Grid item xs={6} md={4} lg={6} key={_id}>
                                        <VideoCard value={videoPost}/>
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
