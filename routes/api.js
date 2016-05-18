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
        var lastObject = getLastObject(obj),
            settingsRed,
            settingsGreen;

        /* THE LOGIC */
        var distance = req.body.input || lastObject.input.distance,
            settingsRed = req.body.red || lastObject.settings.red,
            settingsGreen = req.body.green || lastObject.settings.green;

        if (distance >= settingsGreen) {
            var ledValue = "green";
        } else if (distance > settingsRed && distance < settingsGreen) {
            var ledValue = "yellow";
        } else if (distance <= settingsRed) {
            var ledValue = "red";
        }

        var newdata = {
            time: now,
            input: {
                distance: distance
            },
            output: {
                led: req.body.output || ledValue
            },
            settings: {
                red: req.body.red || lastObject.settings.red,
                green: req.body.green || lastObject.settings.green
            },
            modus: req.body.modus || lastObject.modus
        };
        obj.push(newdata);
        jsonfile.writeFileSync(file, obj);
        res.redirect(req.get('referer'));
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