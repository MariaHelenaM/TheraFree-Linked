const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Convs = require('../models/conv');
var authenticate = require('../authenticate');

const convRouter = express.Router();

convRouter.use(bodyParser.json());

convRouter.route('/')
    .get((req, res, next) => {
        Convs.find({})
            .then((convs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(convs);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Convs.create(req.body)
            .then((conv) => {
                console.log('Conv Created ', conv);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(conv);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /conv');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Convs.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

convRouter.route('/:convId')
    .get((req, res, next) => {
        Convs.findById(req.params.convId)
            .then((conv) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(conv);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('POST operation not supported on /conv/' + req.params.convId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Convs.findByIdAndUpdate(req.params.convId, {
                $set: req.body
            }, { new: true })
            .then((conv) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(conv);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Convs.findByIdAndRemove(req.params.convId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = convRouter;