import React, { Component } from 'react';
import axios from 'axios';
import WordItemCard from '../components/WordItemCard';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class WordsComponent extends Component {
    constructor() {
        super();

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    state = {
        isLoading: true,
        wordPosts: [],
        favoriteCards: [],
        categories: [],
        error: null,
        category: ''
    };

    componentDidMount() {
        axios.get('/api/words')
            .then(res => {
                this.setState({
                    isLoading: false,
                    wordPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));

        axios.get('/api/favorite-cards/' + this.props.auth.user.id)
            .then(res => {
                this.setState({
                    favoriteCards: res.data
                });
            });

        axios.get('/api/word-categories/all')
            .then(res => {
                this.setState({
                    categories: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleSearchChange(e) {
        const api = e.target.value ? '/api/words/find/' + e.target.value : '/api/words';
        axios.get(api)
            .then(res => {
                this.setState({
                    wordPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleChange(value) {
        this.setState({
            category: value
        });

        const api = value ? '/api/words/find-by-category/' + value : '/api/words';
        axios.get(api)
            .then(res => {
                this.setState({
                    wordPosts: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, wordPosts, error, categories, favoriteCards, category } = this.state;
        const {user} = this.props.auth;

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
                    <FormControl
                        style={{minWidth: '150px', margin: '9px'}}
                    >
                        <InputLabel htmlFor="category-label">Category</InputLabel>
                        <Select
                            value={category}
                            onChange={event => this.handleChange(event.target.value)}
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
                    <FormControl>
                        <TextField
                            type="text"
                            label="Search"
                            name="word-search"
                            tyle={{height: '30px'}}
                            onChange={ this.handleSearchChange }
                            variant="outlined"
                        />
                    </FormControl>


                </div>
                <div className="posts-container">
                    <h1>Words</h1>
                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                        justify="center"
                    >
                        {error ? <p>{error.message}</p> : null}
                        {!isLoading ? (
                            wordPosts.map(wordPost => {
                                const { _id } = wordPost;
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        lg={3}
                                    >
                                       <WordItemCard
                                           key={_id + 'card'}
                                           favoriteCards = {favoriteCards}
                                           value={wordPost}
                                           userId={user.id}/>
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

WordsComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps)(WordsComponent);

