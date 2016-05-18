// Range slider updater
function outputUpdateChild(vol) {
    document.querySelector('#child-out').value = vol;
}

function outputUpdateAdult(vol) {
    document.querySelector('#adult-out').value = vol;
}

window.onload = function() {
    function toggleModus() {
        var modus = document.querySelector(".cur-mod").innerHTML,
            customModus = document.querySelector(".custom-modus"),
            childModus = document.querySelector(".child-modus"),
            adultModus = document.querySelector(".adult-modus"),
            grandpaModus = document.querySelector(".grandpa-modus");

        if (modus == 'custom') {
            customModus.classList.add('mod-active');
        } else if (modus == 'child') {
            childModus.classList.add('mod-active');
        } else if (modus == 'adult') {
            adultModus.classList.add('mod-active');
        } else if (modus == 'grandpa') {
            grandpaModus.classList.add('mod-active');
        }
    }

    function toggleMenuActive() {

        // Get all menu items

        var links = Array.prototype.slice.call(document.querySelectorAll('nav li')),
            hash = window.location.href.split('/')[3],
            pageTitle = document.querySelector(".page-title h2");

        // If homepage

        if (hash === '')
            hash = 'overview';

        // Full 100% height for other pages hax
        if (hash != '' && hash != 'overview') {
            document.querySelector("body").classList.add("full-height");
            document.querySelector("html").classList.add("full-height");
            document.querySelector("#wrapper").classList.add("full-height");
        }

        pageTitle.innerHTML = hash;

        var link = document.querySelector('#' + hash);

        // Remove active class

        links.forEach(function(item) {
            item.classList.remove("active");
        });

        // Add active class to new hash

        link.classList.add('active');
    }
    
    toggleMenuActive();
    toggleModus();
};

// Get d3 json for chart
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
