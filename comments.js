// Create web server

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Comment = require('../models/comment');

router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(comments);
    });
});

router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(comment);
    });
});

// add post / endpoint
router.post('/', jsonParser, function(req, res) {
    var comment = new Comment({
        content: req.body.content
    });
    comment.save(function(err) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(comment);
    });
});
