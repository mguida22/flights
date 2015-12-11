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

function updateDelays(us, airports, delays) {
  var start = moment('2008-01-01');
  var end = moment('2009-01-01');
  var current = start;

  function f() {
    delay = delays[current.format('YYYY-M-D')];

    svg.selectAll("circle").remove();

    svg.append("svg:g")
      .attr("id", "circles")
      .selectAll("circle")
        .data(airports)
      .enter().append("svg:circle")
        .attr('transform', function (d) {
          proj = projection([d.Longitude * -1, d.Latitude]);
          if (proj !== null) {
            return 'translate(' +
              proj +
            ')';
          }
          return null;
        })
        .attr("r", function(d) {
          if (delay[d.locationID] > 0) {
            r = delay[d.locationID] * 0.3;
            if (r !== null) {
              return r;
            }
          }
          return 0;
        });

    document.getElementById('current-date').innerHTML = current.format('M/D/YYYY');
    current.add(1, 'days');
    if(current.isBefore(end)){
      setTimeout(f, 50);
    }
  }
  f();
}

function display(err, us, airports, delays) {
  if (err) {
    return console.error(err);
  }

  var r, proj;

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

  updateDelays(us, airports, delays);
}

queue()
  .defer(d3.json, "data/us.json")
  .defer(d3.csv, "data/airport-codes.csv")
  .defer(d3.json, "data/delays.json")
  .await(display);
