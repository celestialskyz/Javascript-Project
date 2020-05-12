// document.addEventListener("DOMContentLoaded", () => {
//   multiCountries();
// });
document.getElementById('buttt').addEventListener('click', function (e) {
e.preventDefault();
  d3.selectAll('.show').remove();
  //debugger
  let input1 = document.getElementById("cat1").value;
  let input2 = document.getElementById("cat2").value;
  
  multiCountries(input1, input2);
});

function multiCountries(cat1="NewConfirmed", cat2= "NewRecovered") {
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
  //debugger

  d3.select('.outsite').append("svg").attr("id", "comparecases").attr("width", 1500).attr("height", 600);
  var svg = d3.select("#comparecases"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = svg.attr("width")-(margin.left + (2*margin.right)),
  height= svg.attr("height")-(1.5*margin.top + margin.bottom);
//debugger
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
     ////debugger
    //let dom = countries.filter(d=> { if (d.NewConfirmed> 2000) return d.NewConfirmed;});
    //debugger
    let dom =[];
    while (dom.length<8 ){
      let randCon = countries[Math.floor(Math.random() * countries.length)];
       if (randCon[`${cat1}`] !=0 && randCon[`${cat2}`] !=0 ){
         dom.push(randCon);
       }
      
    }
//debugger
    dom.forEach(c => {
      y.push(Math.log(c[`${cat1}`])).toFixed(4);
      ////debugger
      y.push(Math.log(c[`${cat2}`])).toFixed(4);}
     );
     
     dom.forEach(c => {
       let logsC1 = (Math.log(c[`${cat1}`])).toFixed(4);
       let logsC2 = (Math.log(c[`${cat2}`])).toFixed(4);
      //  if(logsC1 === Infinity){
      //    logsC1 = "None";
      //  }
      //  if(logsC2 === Infinity){
      //   logsC2 = "None";
      // }
       c.subs =[{name:cat1, value: logsC1
        //Math.log(c[`${cat1}`])
      },
        {name:cat2, value: logsC2 }];
          // Math.log(c[`${cat2}`])}]; 
         ////debugger
     });

  xScale.domain(dom.map(d=> { return d.Country;}));
  subcatsX.domain(subcatsnames).range([0, xScale.bandwidth()]);
  yScale.domain([0, d3.max(y)*1.5]);
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
    .attr("dy", "-4.1em")
    .attr("dx", "-19.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Log Number of Cases");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
// debugger
    var subsection = svg.selectAll(".subsection")
      .data(dom)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + xScale(d.Country) + ",0)"; });
      
      subsection.selectAll("rect")
      .data(function(c) { 
        return c.subs;})
      .enter().append("rect")
      .attr("width", subcatsX.bandwidth())
      .attr("x", function(c) {
         return subcatsX(c.name);})
      .attr("y", function(c) {return yScale(c.value);})
      .attr("height", function(c){return height-yScale(c.value);})
      .style("fill", function(c){ //debugger 
        return color(c.name);});

       ///debugger
        subsection.selectAll("rect")
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseleave", onMouseLeave);

        function onMouseOver(d, i){ //d is the info ex: country etc & i is if its the 1st or 2nd ...
           let dd= this; //debugger
          d3.select(this).attr('class', 'highlight');
          d3.select(this)
            .transition()
            .duration(500)
            .attr("width", subcatsX.bandwidth()+5)
            .attr("y", function(d) { 
              return yScale(d.value)-10;})
            .attr("height", function(d) { 
              return height-yScale(d.value) +10;});
         //debugger
         g.append("text")
          .attr('class', 'value')
          .attr('x', ()=>{ 
            //debugger/// subcats is grabbing 1st of category but not via the country
            //subcatsnames
          //  return event.clientX;
          return event.target.parentElement.transform.baseVal[0].matrix.e;
          })
          .attr('y', function(){
           // debugger
            return yScale(d.value)-15;})
          .text(function(){
          //  debugger
            return d.value;
          });
        }

        function onMouseLeave(d, i){
          d3.select(this).attr('class', 'bar');
          d3.select(this)
          .transition()
          .duration(500)
          .attr("width", subcatsX.bandwidth())
          .attr("x", function(c) { return subcatsX(c.name);})
          .attr("y", function(c) {return yScale(c.value);})
          .attr("height", function(c){return height-yScale(c.value)})
          d3.selectAll('.value')
          .remove();
        }
        //debugger
      var legend = svg.selectAll(".legend")
        .data(subcatsnames.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
        //  debugger
        legend.append("rect")
          .attr("x", width-30)
          .attr("width", 150)
          .attr("height", 18)
          .style("fill", color)
          .style("opacity", 0.7);

        legend.append("text")
          .attr("x", width-30)
          .attr("y", 9)
          .attr("dy", ".35em")
          .text(function(d){return d;});
 }

 export default multiCountries;