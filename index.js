var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/us.json", function(err, us) {
  if (err) {
    return console.error(err);
  }

  d3.csv("data/airport-codes.csv", function(err, airports) {
    if (err) {
      return console.error(err);
    }

    d3.json("data/delays.json", function(err, delays) {
      if (err) {
        return console.error(err);
      }

      delays = delays['2008-01-01'];

      svg.insert("path", ".graticule")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .attr("d", path);

      svg.insert("path", ".graticule")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
        .attr("class", "county-boundary")
        .attr("d", path);

      svg.insert("path", ".graticule")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-boundary")
        .attr("d", path);

      svg.append("svg:g")
        .attr("id", "circles")
        .selectAll("circle")
          .data(airports)
        .enter().append("svg:circle")
          .attr('transform', function (d) {
            return 'translate(' +
              projection([d.Longitude * -1, d.Latitude]) +
            ')';
          })
          .attr("r", function(d) {
            if (delays[d.locationID] > 0) {
              return delays[d.locationID] * 0.3;
            }
            return 0;
          });
    });
  });
});