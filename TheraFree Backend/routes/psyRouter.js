const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Psys = require('../models/psy');

const psyRouter = express.Router();

psyRouter.use(bodyParser.json());

psyRouter.route('/')
    .get((req,res,next) => {
        Psys.find({})
            .then((psys) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(psys);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        Psys.create(req.body)
            .then((psy) => {
                console.log('Psy Created ', psy);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(psy);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /psys');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Psys.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

psyRouter.route('/:psyId')
    .get((req,res,next) => {
        Psys.findById(req.params.psyId)
            .then((psy) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(psy);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.psyId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Psys.findByIdAndUpdate(req.params.psyId, {
            $set: req.body
        }, { new: true })
            .then((psy) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(psy);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Psys.findByIdAndRemove(req.params.psyId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = psyRouter;
