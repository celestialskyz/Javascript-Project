document.addEventListener("DOMContentLoaded", () => {
  getCountries();
  });
  // document.getElementById('buttt').addEventListener('click', function (e) {
  //   e.preventDefault();
  //   d3.selectAll('.show')
  //   .remove();
  // })

function getCountries() {
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
////debugger
  // step 4 - send off the request with optional data
  xhr.send();
}

function makebarsg(countries){
 // //debugger
  var svg = d3.select("#comparecases"),
  margin = {top: 20, right: 40, bottom: 30, left: 40},
  width = svg.attr("width")-(margin.left + (2*margin.right)),
  height= svg.attr("height")-(1.5*margin.top + margin.bottom);

  var xScale = d3.scaleBand().rangeRound([20, width]).padding(0.2);
  var subcatsX = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height, 10]);

  var color = d3.scaleOrdinal().range(["#002ec5","#2ed0db"]);
  // .range(["#002ec5","#00c50a","#69e0e9"]);

  var xAxis = d3.axisBottom(xScale)
  .tickSize(0);
  //d3.axisBottom(xScale)
  // var yAxis = d3.axisLeft(yScale);

  let subcatsnames = ["NewRecovered", "TotalRecovered"];
  // let subcatsnames = ["TotalConfirmed","NewRecovered", "TotalRecovered"];

  // //debugger
  let y =[];
    countries.forEach(c => {
      if (c.NewConfirmed>2000) {
     //y.push(c.TotalConfirmed);
     y.push(c.NewRecovered);
     y.push(c.TotalRecovered);}
    });
    
      countries.forEach(c => {
      //c.subs =[{name:"TotalConfirmed", value: c.TotalConfirmed}, {name:"NewRecovered", value: c.NewRecovered},{name: "TotalRecovered", value:c.TotalRecovered}] 
      c.subs =[{name:"NewRecovered", value: c.NewRecovered},{name: "TotalRecovered", value:c.TotalRecovered}] 

    })
    let dom = countries.filter(d=> { if (d.NewConfirmed> 2000) return d.NewConfirmed;});
  
  xScale.domain(dom.map(d=> { return d.Country;}));
  subcatsX.domain(subcatsnames).rangeRound([20, xScale.bandwidth()]);
  yScale.domain([0, d3.max(y)]);
  //var g = svg.append("g").attr("transform", "translate(100 ,0)");
    var g = svg.append("g").attr('class', 'show');
    g.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(20," + height + ")")
      .call(xAxis);

    g.append("g").attr("class", "y axis")
    .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s"))
    .ticks(15)).attr("transform", "translate(28,0)")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 18)
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
        .data(function(c) {//debugger 
          return c.subs;})
      .enter().append("rect")
        .attr("width", subcatsX.bandwidth())
        .attr("x", function(c) { return subcatsX(c.name);})
        .attr("y", function(c) {return yScale(c.value);})
        .attr("height", function(c){return height-yScale(c.value);})
        .style("fill", function(c){////debugger 
          return color(c.name);});


    // var legend = svg.selectAll(".legend")
    //       .data(dom[0].subs.reverse())
    //      .enter().append('g')
    //       .attr("class", "legend")
    //       .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
    //       .style("opacity","0");

    //       legend.append("rect")
    //       .attr("x", width - 18)
    //       .attr("width", 18)
    //       .attr("height", 18)
    //       .style("fill", function(d) { return color(d); });
    
    //   legend.append("text")
    //       .attr("x", width - 24)
    //       .attr("y", 10)
    //       .attr("dy", ".35em")
    //       .style("text-anchor", "end")
    //       .text(function(d) {return d; });
    

  }