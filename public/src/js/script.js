function outputUpdateChild(vol) {
    document.querySelector('#child-out').value = vol;
}

function outputUpdateAdult(vol) {
    document.querySelector('#adult-out').value = vol;
}

d3.json("/api/data", function(error, data) {
    var time = ['times'];
    var sensor = ['Distance from television in centimeters'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sensor.push(element.input.distance);
    });

    var showResults = 20;
    var newArr = sensor.slice(Math.max(sensor.length - showResults, 1));
    var text = 'Distance from television in centimeters';

    newArr.unshift(text);

    console.log(newArr);

    var chart = c3.generate({
        data: {
            x: 'times',
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                newArr,
                time
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                categories: time,
                tick: {
                    format: '%H:%M:%S'
                }
            }
        }
    });
});