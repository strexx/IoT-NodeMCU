"use strict";function outputUpdateChild(t){document.querySelector("#child-out").value=t}function outputUpdateAdult(t){document.querySelector("#adult-out").value=t}d3.json("/api/data",function(t,e){var i=["times"],n=["Distance from television in centimeters"];e.forEach(function(t,e){i.push(t.time),n.push(t.input.distance)});var o=20,u=n.slice(Math.max(n.length-o,1)),a="Distance from television in centimeters";u.unshift(a),console.log(u);c3.generate({data:{x:"times",xFormat:"%Y-%m-%d %H:%M:%S",columns:[u,i]},axis:{x:{type:"timeseries",categories:i,tick:{format:"%H:%M:%S"}}}})});