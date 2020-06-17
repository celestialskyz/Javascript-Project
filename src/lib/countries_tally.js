//https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3 
// document.addEventListener("DOMContentLoaded", () => {
//   GetCountries();
// });
document.getElementById('countrytop').addEventListener('click', function (e) {
  e.preventDefault();
  debugger
    d3.selectAll('#newcases').remove();  
    debugger
    GetCountries("countrytop");
  });
document.getElementById('countrybottom').addEventListener('click', function (e) {
  debugger
  e.preventDefault();
  debugger
  d3.selectAll('#newcases').remove();  
  GetCountries("countrybottom");
});
document.getElementById('countryrandom').addEventListener('click', function (e) {
  e.preventDefault();
  debugger
    d3.selectAll('#newcases').remove();  
    GetCountries("countryrandom");
  });

function GetCountries(buttonchoice = "countryrandom") {
  const xhr = new XMLHttpRequest();
debugger
  // step 2 - specify path and verb
  xhr.open('GET', 'https://api.covid19api.com/summary');

  // step 3 - register a callback
  xhr.onload = function () {
    // console.log(xhr.status); //  for status info
    // console.log(xhr.responseType); //the type of data that was returned
    // console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
   if (xhr.status != 200){
    //debugger
    var x = document.getElementById("histogram");
    let p = document.createElement("p");
    p.setAttribute("class", "error");
    p.setAttribute("id", "prob");
    x.appendChild(p);
    var errorpic = document.createElement("img");
    errorpic.setAttribute("class", "error");
    errorpic.src = "./src/images/error.jpg";
    p.appendChild(errorpic);
   }
   else {
    const info = JSON.parse(xhr.response);
    const countries = info.Countries;
    graph(countries, buttonchoice);
    }
    //mapit(countries);
  };
  
////debugger
  // step 4 - send off the request with optional data
  xhr.send();
}
function sorter (el, pivot){
  if (el.NewConfirmed < pivot.NewConfirmed){ 
    return - 1;
  }
  return 1;
}

function sort(array){
  if (array.length < 2) return array;
  const pivot = array[0];
  let left = array.slice(1).filter((el) => sorter(el, pivot) === -1 && el.NewConfirmed !=0);
  let right = array.slice(1).filter((el) => sorter(el, pivot) !== -1 && el.NewConfirmed !=0);
  left = sort(left);
  right = sort(right);

  return left.concat([pivot]).concat(right);
}


  function graph(countries, buttonchoice){
    // console.log("JELLO");
    if (document.getElementById("prob")){
       var error=  document.getElementById("prob");
      error.remove();
    } 
    
    d3.select('#histogram').append("svg").attr("id", "newcases").attr("width", 900).attr("height", 600);
    var svg = d3.select("#newcases"),
    margin = 80,
    width = svg.attr("width")-(3*margin),
    height= svg.attr("height")-(1.5*margin);
    var xScale = d3.scaleBand().range([0, width]).padding(0.2);
    var yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate(100 ,100)");
    // var g = svg.append("g").attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")")
    let y =[];
    let sorted = sort(countries);
    let dom = [];
    let label = ["Log Number of Cases", "Number of Cases"];
    let x = 0;

  if (buttonchoice === "countrytop"){
     sorted.slice(-8).forEach(c => {
      dom.push(c);
      x++;
     });
  }
  else if (buttonchoice === "countrybottom"){
    sorted.slice(0,7).forEach(c => {
      dom.push(c);
     });
  }
  else {
  
    while (dom.length<8 ){
    
      let randCon = countries[Math.floor(Math.random() * countries.length)]
      if (randCon.NewConfirmed != 0){
        dom.push(randCon);
      }
    }
  }
  
  if (buttonchoice !== "countrybottom"){
    dom.forEach(c => {
      y.push(Math.log(c.NewConfirmed));
      c.NewConfirmed = (Math.log(c.NewConfirmed));
      
  });
    label.push("Graph of Log(x) Cases by Country");
  } else {
    dom.forEach(c => {
      y.push(c.NewConfirmed);
      c.NewConfirmed = c.NewConfirmed;
      debugger
    label.push("Graph of Cases by Country");
  });}
  
  var newDiv = document.createElement("div"); 
  
    debugger
    if(buttonchoice !== "countrybottom"){  
      debugger
      var newContent = document.createTextNode("Graph of Log(x) Cases by Country"); 
      newDiv.appendChild(newContent); 
      newDiv.setAttribute("id","newC");
      document.getElementById("newC").replaceWith(newDiv);
    }
    else {
      debugger
      var newContent = document.createTextNode("Graph of X Cases by Country"); 
      newDiv.appendChild(newContent); 
      newDiv.setAttribute("id","newC");
      document.getElementById("newC").replaceWith(newDiv);
    }
    xScale.domain(dom.map(d=> { return d.Country;}));
    
    yScale.domain([0, d3.max(y)]);
    
    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height )
    .attr("x", width)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Countries");
    // //debugger;

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
    .text(`${label[x]}`);

    g.selectAll(".bar")
    .data(dom)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.Country); })
    .attr("y", function(d) { return yScale((d.NewConfirmed).toFixed(4)); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale((d.NewConfirmed).toFixed(4)); });
    // //debugger
  //   svg.append("text")
  //  .attr("transform", "translate(100,0)")
  //  .attr("x", 50)
  //  .attr("y", 50)
  //  .attr("font-size", "24px")
  //  .text("New Confirmed Cases")
  //  .attr("height", function(d) { return height ; });
   
   g.selectAll(".bar")
    .on("mouseover", onMouseOver) //Add listener for the mouseover event
    .on("mouseleave", onMouseLeave);

    function onMouseOver(d, i){ //d is the info ex: country etc & i is if its the 1st or 2nd ...
      //debugger
      d3.select(this).attr('class', 'highlight');
      d3.select(this)
        .transition()
        .duration(500)
        .attr("width", xScale.bandwidth()+5)
        .attr("y", function(d) { return yScale((d.NewConfirmed).toFixed(4))-10; })
        .attr("height", function(d) { return height - yScale((d.NewConfirmed).toFixed(4)) +10; });
     //  debugger
      g.append("text")
      .attr('class', 'value')
      .attr('x', function(){return xScale(d.Country)+20})
      .attr('y', function(){return yScale((d.NewConfirmed).toFixed(4))-15;})
      .text(function(){
        return (d.NewConfirmed).toFixed(4);
      });
    }
//debugger
    function onMouseLeave(d, i){
      d3.select(this).attr('class', 'bar');
      d3.select(this)
      .transition()
      .duration(500)
      .attr("width", xScale.bandwidth())
      .attr("y", function(d) { return yScale((d.NewConfirmed).toFixed(4)); })
      .attr("height", function(d) { return height - yScale((d.NewConfirmed).toFixed(4)); });
      d3.selectAll('.value')
      .remove();
    }
    

  }
  function mapit(countries){
 // //debugger
      var width = 1000;
      var height = 580;
    //  //debugger
    //   // Create SVG
      var svg = d3.select('#mapgraph')
          .append( "svg" )
          .attr( "width", width )
          .attr( "height", height )
          .attr("class", "map");
      
      
      var g = svg.append( "g" );
      var projection = d3.geoMercator()
     .translate([width/2, height/2]);
    
      var data = d3.map();
      // //debugger
      var colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[8]);
      
      

      countries.forEach(country => {
        data.set(country.CountryCode, +country.TotalRecovered);
      });
      // function(d) { data.set(d.code, +d.pop);
    
      var path = d3.geoPath().projection(projection);
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(error, topology) {
        ////debugger 
          g.selectAll("path")
          .data(topology.features)
          .enter()
          .append("path")
          .attr("d", path);
          
      });

      // g.selectAll("path")
      // .attr("fill",)

  }
  // function (d) {
  //   d.total = data.get(d.id) || 0;
  //   return colorScale(d.total);
  // });

  export default GetCountries;