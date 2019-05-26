import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Speech from 'speak-tts'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 330,
        objectFit: 'fill'
    },
});

function WordCard(props) {
    const { id, word, translation, imageSrc, audioSrc } = props.value;
    const classes = useStyles();

    const speech = new Speech();
    speech.init({
        volume: 0.5,
        lang: "en-US",
        rate: 1,
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

    return (
        <Card className={classes.card}>
            <CardActionArea
                onClick={speak}
            >
                <CardMedia
                    className={classes.media}
                    image={imageSrc}
                    title={word}
                />
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

export default WordCard;
