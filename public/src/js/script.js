d3.json("/api/data", function(error, data) {
    var time = [];
    var sensor = ['Distance from television in centimeters'];

    data.forEach(function(element, index) {
        time.push(element.time);
        sensor.push(element.input.distance);
    });

    //console.log(sensor);

    var showResults = 5;
    var newArr = sensor.slice(Math.max(sensor.length - showResults, 1));
    var text = 'Distance from television in centimeters';

    newArr.unshift(text);

    console.log(newArr);

    var chart = c3.generate({
        data: {
            columns: [
                newArr
            ]
        },
        axis: {
            x: {
                type: 'category',
                categories: time
            }

        }
    });
});