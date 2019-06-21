const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateChangePasswordInput = require('../validation/changePassword');

const admins = require('../_helpers/admins');

const roles = require('../_helpers/roles');

const User = require('../models/User');

router.get('/', (req, res) => {
    User.find({}, function (err, users) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedUsers = [];
        for (let i = 0; i < users.length; i++) {
            returnedUsers.push(users[i].transform());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedUsers));
    })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, videoPost) => {
        if (err) res.status(500).send(error)
        res.status(200).json(videoPost.transform());
    });
});

router.put('/:id', (req, res) => (

    User.findByIdAndUpdate (
        req.params.id,
        req.body,
        {new: true},
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
));

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
                role: admins.includes(req.body.email) ? roles.Admin : roles.User
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar,
                            role: user.role
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 36000
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    isAdmin: user.role === roles.Admin
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.post('/:id/change-password', (req, res) => {
    const { errors, isValid } = validateChangePasswordInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userId = req.params.id;
    console.log(oldPassword);
    console.log(userId);
    User.findById(userId)
        .then(user => {
            if(!user) {
                console.log('not');
                return res.status(404).json(errors);
            }
            bcrypt.compare(oldPassword, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            if(err) console.error('There was an error', err);
                            else {
                                bcrypt.hash(newPassword, salt, (err, hash) => {
                                    if(err) console.error('There was an error', err);
                                    else {
                                        user.password = hash;
                                        user
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                            });
                                    }
                                });
                            }
                        });
                    } else {
                        errors.password = 'Wrong Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
