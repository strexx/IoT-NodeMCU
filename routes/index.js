var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs'),
    getLastObject = require('../methods/methods.js');


// Home page -> overview
router.get('/', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('main', {
        title: 'Overview page',
        data: getLastObject(obj)
    });
  });
});

// Overview page
router.get('/overview', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('main', {
        title: 'Overview page',
        data: getLastObject(obj)
    });
  });
});

// Status page
router.get('/status', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }
    res.render('status', {
        title: 'Status page',
        data: getLastObject(obj)
    });
  });
});

// Modus page
router.get('/modus', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('modus', {
        title: 'Modus page',
        data: getLastObject(obj)
    });
  });
});

// Settings page
router.get('/settings', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('settings', {
        title: 'Settings page',
        data: getLastObject(obj)
    });
  });
});

module.exports = router;
