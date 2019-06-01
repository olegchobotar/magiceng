import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ReactPlayer from 'react-player'

const useStyles = makeStyles({
    card: {
        maxWidth: 630,
        height: 500
    },
    media: {
        height: 400,
        objectFit: 'fill'
    },
});

function VideoCard(props) {
    const { id, title, description, link } = props.value;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <ReactPlayer
                url={link}
                controls="true"
            />
            <CardActionArea>
                <CardMedia/>

                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default VideoCard;
