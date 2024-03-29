import React, { Component } from 'react';
import axios from 'axios';
import WordItemCard from '../components/WordItemCard';

import Grid from '@material-ui/core/Grid';

import '../words-page.css';
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class CardsFavoriteComponent extends Component {
    constructor() {
        super();

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    state = {
        isLoading: true,
        favoriteCards: [],
        categories: [],
        error: null,
        category: ''
    };

    componentDidMount() {
        axios.get('/api/favorite-cards/' + this.props.auth.user.id)
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    favoriteCards: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    handleSearchChange(e) {
        const api = e.target.value ? '/api/favorite-cards/find/' +  this.props.auth.user.id + '/'+ e.target.value : '/api/favorite-cards/' + this.props.auth.user.id;
        axios.get(api)
            .then(res => {
                this.setState({
                    favoriteCards: res.data
                });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, favoriteCards, error } = this.state;
        console.log(this.state);
        const {user} = this.props.auth;

        const main = (
            <div>
                <div className="words-header-block">
                </div>
                <h1 style={{float: 'left', marginLeft: '30px'}}>Favorite Cards</h1>
                <div
                    className="search-block"
                    style={{marginRight: '15%'}}
                >
                    <TextField
                        type="text"
                        label="Search"
                        name="word-search"
                        onChange={ this.handleSearchChange }
                        variant="outlined"
                    />
                </div>
                <div className="posts-container" >
                    <Grid
                        justify="center"
                        container
                        spacing={3}>
                        {error ? <p>{error.message}</p> : null}
                        {!isLoading ? (
                            favoriteCards.map(favoriteCard => {
                                console.log(favoriteCard);
                                const { _id } = favoriteCard;
                                return (
                                    <Grid item xs={6} md={4} lg={3} key={_id}>
                                       <WordItemCard value={favoriteCard.card} userId={user.id}/>
                                    </Grid>
                                );
                            })
                        ) : (
                            <h3>Loading...</h3>
                        )}
                        {!isLoading && !favoriteCards.length &&(
                            <div style={{marginTop: '40px', fontSize: '26px'}}>There is no Favorite Cards</div>
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

CardsFavoriteComponent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps)(CardsFavoriteComponent);

