var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs'),
    getLastObject = require('../methods/methods.js');

router.get('/', function(req, res, next) {
  jsonfile.readFile('resources/data.json', function(err, obj) {
    if (err) {
        res.status(404);
        next();
    }

    res.render('main', {
        title: 'Overview page',
        description: 'See the status of leds and sensordata',
        data: getLastObject(obj)
    });
  });
});

module.exports = router;
