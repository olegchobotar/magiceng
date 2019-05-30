import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Speech from 'speak-tts';
import axios from 'axios';

import StarBorder from '@material-ui/icons/StarBorder';

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
    const { id, word, translation, imageSrc } = props.value;
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
        console.log(card);

        axios.post('/api/favorite-cards', card)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <Card className={classes.card}>
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
                        style={{ fontSize: '30px' }}
                        onClick={favoriteHandler}
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
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button
                    size="small"
                    color="primary"
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default WordItemCard;
