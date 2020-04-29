var GeoJSON = require('geojson');

var width = 700;
var height = 580;

// Create SVG
var svg = d3.select( "#mapgraph" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

var g = svg.append( "g" );

var path = d3.geoPath();
var projection = d3.geoMercator()
.scale(70)
.center([0,20])
.translate([width/2, height/2]);

var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(schemeGreens[9]);