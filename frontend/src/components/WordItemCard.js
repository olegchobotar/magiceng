import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Speech from 'speak-tts';
import axios from 'axios';
import { SET_FAVORITE_CARDS } from '../actions/types';

import StarBorder from '@material-ui/icons/StarBorder';
import {connect} from "react-redux";
import store from '../store';
import PropTypes from "prop-types";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 330,
        objectFit: 'fill'
    },
});

function WordItemCard(props) {
    const { favoriteCards } = props;

    const { word, translation, imageSrc, category } = props.value;

    const id = props.value.id ? props.value.id : props.value._id;

    const { userId} = props;

    const classes = useStyles();

    const speech = new Speech();
    speech.init({
        volume: 0.5,
        lang: "en-US",
        rate: 0.6,
        pitch: 1,
        voice: 'Google US English'
    }).then((data) => {
    }).catch(e => {
        console.error("The voices is unavailable", e)
    });

    let isFavorite = isFavoriteFunc(id);

    function isFavoriteFunc(cardId) {
        if (!favoriteCards.favoriteCards)
            return false;
        for (let key in favoriteCards.favoriteCards) {
            if (favoriteCards.favoriteCards[key]['cardId'] === cardId)
                return true;
        }
        return false;
    }

    function speak() {
        speech.speak({
            text: word,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        });
    }

    function favoriteHandler() {
        const card = {
            userId: userId,
            cardId: id
        };
        axios.put('/api/favorite-cards', card)
            .then(res => {
                store.dispatch({
                    type: SET_FAVORITE_CARDS,
                    payload: res.data
                });
            })
    }

    return (
        <Card className={classes.card}>
            <div style={{backgroundColor: '#4be4dc',
                padding: '3px',
                textAlign: 'center'}}
            >
                <p className="card-item-category">{category}</p>
            </div>
            <CardActionArea
                onClick={speak}
            >
                <CardMedia
                    className={classes.media}
                    image={imageSrc}
                    title={word}
                >
                    <StarBorder
                        className="favorite-icon"
                        onClick={favoriteHandler}
                            style={{ fontSize: '30px', color: isFavorite ? 'blue' : 'auto' }}
                    />
                </CardMedia>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {word}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                       {translation}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

WordItemCard.propTypes = {
    favoriteCards: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    favoriteCards: state.favoriteCards
});
export default connect(mapStateToProps)(WordItemCard);

