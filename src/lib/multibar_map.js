document.addEventListener("DOMContentLoaded", () => {
  multiCountries();
});

function multiCountries() {
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open('GET', 'https://api.covid19api.com/summary');

  // step 3 - register a callback
  xhr.onload = function () {
    // console.log(xhr.status); //  for status info
    // console.log(xhr.responseType); //the type of data that was returned
    // console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
    const info = JSON.parse(xhr.response);
    const countries = info.Countries;
    makebarsg(countries)
  };
//debugger
  // step 4 - send off the request with optional data
  xhr.send();
}

function makebarsg(countries){
  var svg = d3.select("#comparecases"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = svg.attr("width")-(3*margin.left + margin.right),
  height= svg.attr("height")-(1.5*margin.top + margin.bottom);

  var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.2);
  var subcatsX = d3.scale.ordinal();
  var yScale = d3.scaleLinear().range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(xScale)
  .tickSize(0)
  .orient("bottom");
  //d3.axisBottom(xScale)
  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

  let subs = [];
  let subcats = countries.slice();
  subcats.forEach(element => {
      { element.TotalConfirmed, element.NewRecovered, element.TotalRecovered }
  });
  debugger
  
}