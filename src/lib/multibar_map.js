// document.addEventListener("DOMContentLoaded", () => {
//   multiCountries();
// });
document.getElementById('buttt').addEventListener('click', function (e) {
e.preventDefault();
  d3.selectAll('.show').remove();
  debugger
  let input1 = document.getElementById("cat1").value;
  let input2 = document.getElementById("cat2").value;
  
  multiCountries(input1, input2);
});

function multiCountries(cat1, cat2) {
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open('GET', 'https://api.covid19api.com/summary');

  // step 3 - register a callback
  xhr.onload = function () {
    const info = JSON.parse(xhr.response);
    const countries = info.Countries;
    makebarsg(countries, cat1, cat2);
  };
////debugger
  // step 4 - send off the request with optional data
  xhr.send();
}

function makebarsg(countries, cat1, cat2){
  debugger

  d3.select('.outsite').append("svg").attr("id", "comparecases").attr("width", 1500).attr("height", 600);
  var svg = d3.select("#comparecases"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = svg.attr("width")-(margin.left + (2*margin.right)),
  height= svg.attr("height")-(1.5*margin.top + margin.bottom);
debugger
  svg.attr('class', 'show');

  var xScale = d3.scaleBand().rangeRound([20, width]).padding(0.2);
  var subcatsX = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height, 10]);

  var color = d3.scaleOrdinal()
  .range(["#002ec5","#2ed0db"]);

  var xAxis = d3.axisBottom(xScale)
  .tickSize(0);
  //d3.axisBottom(xScale)
  // var yAxis = d3.axisLeft(yScale);

  // let subcats = new Object();
  // let subcatsnames = ["TotalConfirmed","NewRecovered", "TotalRecovered"];
   let subcatsnames = [cat1, cat2];

  ////debugger
  let y =[];
    countries.forEach(c => {
      if (c.NewConfirmed>2000) {
     y.push(c[`${cat1}`]);
     ////debugger
     y.push(c[`${cat2}`]);}
    });
    
      countries.forEach(c => {
      c.subs =[{name:cat1, value: c[`${cat1}`]}, {name:cat2, value: c[`${cat2}`]}] 
        ////debugger
    })
    ////debugger
    let dom = countries.filter(d=> { if (d.NewConfirmed> 2000) return d.NewConfirmed;});
    //debugger
  xScale.domain(dom.map(d=> { return d.Country;}));
  subcatsX.domain(subcatsnames).rangeRound([20, xScale.bandwidth()]);
  yScale.domain([0, d3.max(y)]);
  //var g = svg.append("g").attr("transform", "translate(100 ,0)");
    var g = svg.append("g");
    g.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(20," + height + ")")
      .call(xAxis);

    g.append("g").attr("class", "y axis")
    .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s"))
    .ticks(15)).attr("transform", "translate(50,0)")
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
      .data(function(c) {//debugger 
        return c.subs;})
      .enter().append("rect")
      .attr("width", subcatsX.bandwidth())
      .attr("x", function(c) { return subcatsX(c.name);})
      .attr("y", function(c) {return yScale(c.value);})
      .attr("height", function(c){return height-yScale(c.value)})
      .style("fill", function(c){ //debugger 
        return color(c.name)})

      var legend = svg.selectAll(".legend")
        .data(subcatsnames.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
          .attr("x", width-20)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

        legend.append("text")
          .attr("x", width-1)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d){return d;})
 }