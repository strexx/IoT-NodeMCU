var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    jsonfile = require('jsonfile'),
    moment = require('momentjs'),
    getLastObject = require('../methods/methods.js');

router.post('/', function(req, res) {
    var file = 'resources/data.json',
        now = moment().format('YYYY-MM-DD HH:mm:ss');

    jsonfile.readFile(file, function(err, obj) {
        var lastObject = getLastObject(obj);

        /* LA SERVER LOGIC */
        
        var distance = req.body.input || lastObject.input.distance;

        // Range distance from television in centimeters
        if (distance >= 100) {
            // Enough distance from television
            var ledValue = "green";
        } else if (distance > 49 && distance < 101) {
            // Almost too close to television
            var ledValue = "yellow";
        } else {
            // Too close to television 0 to 49 CM
            var ledValue = "red";
        }

        var newdata = {
            time: now,
            input: {
                distance: distance
            },
            output: {
                led: req.body.output || ledValue
            }
        };
        console.log(req.body);
        obj.push(newdata);
        jsonfile.writeFileSync(file, obj);
        res.redirect('/');
    });
});

router.get('/status/input', function(req, res) {
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"distance":' + getLastObject(obj).input.distance + '}');
    });
});

router.get('/status/output', function(req, res) {
    var name = req.params.input;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send('{"led":"' + getLastObject(obj).output.led + '"}');
    });
});

router.get('/data/', function(req, res) {
    var name = req.params.name;
    var file = 'resources/data.json';

    jsonfile.readFile(file, function(err, obj) {
        res.send(obj);
    });
});

module.exports = router;