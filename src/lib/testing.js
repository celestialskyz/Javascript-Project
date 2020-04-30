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
    makebarsg(countries);
  };
//debugger
  // step 4 - send off the request with optional data
  xhr.send();
}

function makebarsg(countries){
 // debugger
  var svg = d3.select("#comparecases"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = svg.attr("width")-(3*margin.left + margin.right),
  height= svg.attr("height")-(1.5*margin.top + margin.bottom);

  var xScale = d3.scaleBand().rangeRound([20, width]).padding(0.2);
  var subcatsX = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height, 0]);

  var color = d3.scaleOrdinal().range(["#002ec5","#008f99"]);
  // .range(["#002ec5","#00c50a","#69e0e9"]);

  var xAxis = d3.axisBottom(xScale)
  .tickSize(0);
  //d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale);

  let subcatsnames = ["NewRecovered", "TotalRecovered"];
  // let subcatsnames = ["TotalConfirmed","NewRecovered", "TotalRecovered"];

  // debugger
  let y =[];
    countries.forEach(c => {
      if (c.NewConfirmed>1000) {
     //y.push(c.TotalConfirmed);
     y.push(c.NewRecovered);
     y.push(c.TotalRecovered);}
    });
    
      countries.forEach(c => {
      //c.subs =[{name:"TotalConfirmed", value: c.TotalConfirmed}, {name:"NewRecovered", value: c.NewRecovered},{name: "TotalRecovered", value:c.TotalRecovered}] 
      c.subs =[{name:"NewRecovered", value: c.NewRecovered},{name: "TotalRecovered", value:c.TotalRecovered}] 

    })
    let dom = countries.filter(d=> { if (d.NewConfirmed> 1000) return d.NewConfirmed;});
  
  xScale.domain(dom.map(d=> { return d.Country;}));
  subcatsX.domain(subcatsnames).rangeRound([0, xScale.bandwidth()]);
  yScale.domain([0, d3.max(y)]);
  //var g = svg.append("g").attr("transform", "translate(100 ,0)");
    var g = svg.append("g");
    g.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(10," + height + ")")
      .call(xAxis);

    g.append("g").call(d3.axisLeft(yScale).tickFormat(d3.format(".2s"))
    .ticks(15))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 1)
    .attr("dy", "-5.1em")
    .attr("dx", "-19.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Number of Cases");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var subsection = svg.selectAll(".subsection")
      .data(dom)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + xScale(d.Country) + ",0)"; });

      subsection.selectAll("rect")
        .data(function(c) {return c.subs;})
      .enter().append("rect")
        .attr("width", subcatsX.bandwidth())
        .attr("x", function(c) { return subcatsX(c.name);})
        .attr("y", function(c) {return yScale(c.value);})
        .attr("height", function(c){return height-yScale(c.value);})
        .style("fill", function(c){//debugger 
          return color(c.name);});
  }