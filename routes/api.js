var passport = require('passport');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('../config/database');
require('../config/passport')(passport);

var Recipe = require('../models/Recipe.js');
var User = require('../models/User.js');

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created new user.'});
        });
    }
});

router.post('/signin', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

/* GET ALL RECIPES */
router.get('/recipe', function(req, res, next) {
    var token = getToken(req.headers);
    console.log("STEF - token ?:" + token);
    if (token) {
        Recipe.find(function (err, products) {
            if (err) return next(err);
            res.json(products);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

/* GET SINGLE BOOK BY ID */
router.get('/recipe/:id', function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Recipe.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'}); 
    }
});

/* SAVE BOOK */
router.post('/recipe', function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Recipe.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'}); 
    }
});

/* UPDATE BOOK */
router.put('/recipe/:id', function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'}); 
    }
});

/* DELETE BOOK */
router.delete('/recipe/:id', function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Recipe.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'}); 
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2)
            return parted[1];
        else
            return null;
    } else {
        return null;
    }
};

module.exports = router;
