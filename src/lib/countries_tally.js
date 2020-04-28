//https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3 
document.addEventListener("DOMContentLoaded", () => {
  GetCountries();
})

function GetCountries() {
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

    graph(countries);

  };
//debugger
  // step 4 - send off the request with optional data
  xhr.send();
}


  function graph(countries){
    console.log("JELLO");
      var svg = d3.select("#newcases"),
      margin = 80,
      width = svg.attr("width")-(3*margin),
      height= svg.attr("height")-(1.5*margin);
  // debugger
  // var svg = d3.select("svg");

    var xScale = d3.scaleBand().range ([0, width]).padding(0.2);
    var yScale = d3.scaleLinear().range ([height, 0]);

    var g = svg.append("g").attr("transform", "translate(100 ,100)");
    let y =[];
    countries.forEach(c => {
      if (c.NewConfirmed>1000) {
     y.push(c.NewConfirmed);
    }
    });
    let dom = countries.filter(d=> { if (d.NewConfirmed> 1000) return d.NewConfirmed;});
    // debugger
    xScale.domain(dom.map(d=> { return d.Country;}));
    yScale.domain([0, d3.max(y)]);
    // debugger
    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height )
    .attr("x", width)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Countries");
    // debugger;

    g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d){
      return d;
    }).ticks(15))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 1)
    .attr("dy", "-5.1em")
    .attr("dx", "-19.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Number of Cases");

    g.selectAll(".bar")
    .data(dom)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.Country); })
    .attr("y", function(d) { return yScale(d.NewConfirmed); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d.NewConfirmed); });
    // debugger
    svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "24px")
   .text("New Confirmed Cases")
   .attr("height", function(d) { return height - y(d.value); });
   
    // let bars = document.getElementById('bar')

  }
