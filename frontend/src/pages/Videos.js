import React, { Component } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard.js';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default class VideosComponent extends Component {
    constructor() {
        super();

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    state = {
        isLoading: true,
        videoPosts: [],
        categories: [],
        error: null,
        category: ''
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

        axios.get('/api/video-categories/all')
            .then(res => {
                this.setState({
                    categories: res.data
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

    handleCategoryChange(value) {
        this.setState({
            category: value
        });

        const api = value ? '/api/videos/find-by-category/' + value : '/api/videos';
        axios.get(api)
            .then(res => {
                this.setState({
                    videoPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    render() {

        const { isLoading, videoPosts, error, categories, category } = this.state;

        const main = (
            <div>
                <div className="videos-header-block">
                </div>
                <h1 style={{float: 'left', marginLeft: '30px'}}>Videos</h1>
                <div
                    className="search-block"
                >
                    <FormControl
                        style={{minWidth: '150px', margin: '9px'}}
                    >
                        <InputLabel htmlFor="category-label">Category</InputLabel>
                        <Select
                            value={category}
                            onChange={event => this.handleCategoryChange(event.target.value)}
                            name="age"
                            inputProps={{
                                name: 'category',
                                id: 'category-label',
                            }}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            { categories.map(category => {
                                return (
                                    <MenuItem value={category.name}>{category.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        type="text"
                        label="Search"
                        name="video-search"
                        onChange={ this.handleSearchChange }
                        variant="outlined"
                    />
                </div>
                <div className="videos-container">
                    <Grid
                        alignItems="center"
                        justify="center"
                        container
                        spacing={3}>
                        {error ? <p>{error.message}</p> : null}
                        {!isLoading ? (
                            videoPosts.map(videoPost => {
                                const id = videoPost.id ? videoPost.id : videoPost._id;
                                return (
                                    <Grid item xs={6} md={4} lg={6} key={id}>
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
