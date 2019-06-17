import React,  { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button'

import "../card-game-page.css";

import {connect} from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    media: {
        width: '100%',
        objectFit: 'cover',
        backgroundSize: 'contain'
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CardGame (props) {
    const [initialized, setInitialized] = useState(false);
    const [initializedCategories, setInitializedCategories] = useState(false);
    const [cards, setCards] = useState();
    const [index, setIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [buttons, setButtons] = useState([]);
    const [answer, setAnswer] = useState('');
    const [countRightAnswers, setCountRightAnswers] = useState(0);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        if (!initializedCategories) {
            axios.get('/api/word-categories/all')
                .then(({ data }) => {
                    setCategories(data);
                })
                .catch(error => console.log(error));
            setInitializedCategories(true);
        }
    });

    function answerHandler(e) {
        if (answer)
            return;
        const value = e.target.textContent;
        if (value === cards[index].word) {
            console.log('right')
            setCountRightAnswers(countRightAnswers + 1);
        }
        setAnswer(value);
        setTimeout(
            function() {
                setButtons(randomFourValues(cards, index + 1));
                if (!cards[index + 1] || index === 9)
                    setOpen(true);
                setIndex(index + 1);
                setAnswer('');

            },
            1500
        );
    }
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function randomFourValues(val, currentIndex) {
        console.log(index);
        if (!val || val.length < 4 || !val[currentIndex])
            return [];
        let items = [];
        items.push(val[currentIndex].word);
        while (items.length < 4) {
            const randomVal = val[Math.floor(Math.random() * val.length)].word;
            if (items.indexOf(randomVal) === -1)
                items.push(randomVal);
        }
        return shuffle(items);
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
        const api = e.target.value !== 'All' ? '/api/words/find-by-category/' + e.target.value : '/api/words';
        axios.get(api)
            .then(({ data }) => {
                setCards(shuffle(data));
                setButtons(randomFourValues(data, index));
            });
        setInitialized(true);
    }

    return (
        <div>
            <h2 className="card-game-title">What is it?</h2>
            <div className="card-game-header">
                <h3>You can practise special category</h3>
                <FormControl
                    style={{minWidth: '150px', margin: '9px'}}
                >
                    <InputLabel htmlFor="category-label">Category</InputLabel>
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        name="age"
                        inputProps={{
                            name: 'category',
                            id: 'category-label',
                        }}
                    >
                        <MenuItem value="All">
                            <em>All</em>
                        </MenuItem>
                        { categories.map(category => {
                            return (
                                <MenuItem value={category.name}>{category.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <Container>
                <Row style={{margin: '0 auto'}}>
                    <Col md={12}>
                        <div>
                            { initialized && cards && cards[index] && buttons.length > 3 && index < 10 &&
                                <div className="card-game-canvas" style={{width: '700px'}}>
                                    <CardMedia
                                        style={{height: '50vh'}}
                                        className={classes.media}
                                        image={cards[index].imageSrc}
                                    />
                                    <div
                                        className="variations-button-container"
                                    >
                                        {
                                            buttons.map((cardValue, key )=> {
                                            return (
                                                <Button
                                                    key={key}
                                                        style={ answer !== '' && cardValue === cards[index].word ? {backgroundColor: '#7fe27f'} :
                                                                answer !== '' && answer === cardValue ? {backgroundColor: '#FF6347'} : {}
                                                           }
                                                    onClick={answerHandler}
                                                >{ cardValue }</Button>
                                            );
                                        })
                                        }
                                    </div>
                                </div>
                            }
                            { initialized && cards && cards.length < 4 &&
                                <div>
                                    <h3>Unfortunately there are not enough cards in this category. </h3>
                                </div>
                            }
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Results"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        You result is {countRightAnswers} of {index}. Good job!
                                    </DialogContentText>
                                    <img src="../assets/images/result-gif.webp" alt=""/>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

CardGame.propTypes = {
    cards: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    cards: state.cards
});

export default connect(mapStateToProps )(withRouter(CardGame));
