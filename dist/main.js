/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_multibar_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/multibar_map */ "./src/lib/multibar_map.js");
/* harmony import */ var _lib_options_dropdwn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/options-dropdwn */ "./src/lib/options-dropdwn.js");
/* harmony import */ var _lib_countries_tally__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/countries_tally */ "./src/lib/countries_tally.js");




window.addEventListener("DOMContentLoaded", function () {
  Object(_lib_countries_tally__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_lib_multibar_map__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_lib_options_dropdwn__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./src/lib/countries_tally.js":
/*!************************************!*\
  !*** ./src/lib/countries_tally.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3 
// document.addEventListener("DOMContentLoaded", () => {
//   GetCountries();
// });
function GetCountries() {
  var xhr = new XMLHttpRequest(); // step 2 - specify path and verb

  xhr.open('GET', 'https://api.covid19api.com/summary'); // step 3 - register a callback

  xhr.onload = function () {
    // console.log(xhr.status); //  for status info
    // console.log(xhr.responseType); //the type of data that was returned
    // console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
    var info = JSON.parse(xhr.response);
    var countries = info.Countries;
    graph(countries); //mapit(countries);
  }; ////debugger
  // step 4 - send off the request with optional data


  xhr.send();
}

function graph(countries) {
  // console.log("JELLO");
  var svg = d3.select("#newcases"),
      margin = 80,
      width = svg.attr("width") - 3 * margin,
      height = svg.attr("height") - 1.5 * margin; // //debugger
  // var svg = d3.select("svg");

  var xScale = d3.scaleBand().range([0, width]).padding(0.2);
  var yScale = d3.scaleLinear().range([height, 0]);
  var g = svg.append("g").attr("transform", "translate(100 ,100)");
  var y = [];
  var dom = [];

  while (dom.length < 8) {
    var randCon = countries[Math.floor(Math.random() * countries.length)];

    if (randCon.NewConfirmed != 0) {
      dom.push(randCon);
    }
  }

  dom.forEach(function (c) {
    y.push(Math.log(c.NewConfirmed));
  }); //debugger

  xScale.domain(dom.map(function (d) {
    return d.Country;
  }));
  yScale.domain([0, d3.max(y)]); // //debugger

  g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale)).append("text").attr("y", height).attr("x", width).attr("text-anchor", "end").attr("stroke", "black").text("Countries"); // //debugger;

  g.append("g").call(d3.axisLeft(yScale).tickFormat(function (d) {
    return d;
  }).ticks(15)).append("text").attr("transform", "rotate(-90)").attr("y", 1).attr("dy", "-5.1em").attr("dx", "-19.1em").attr("text-anchor", "end").attr("stroke", "black").text("Log Number of Cases");
  g.selectAll(".bar").data(dom).enter().append("rect").attr("class", "bar").attr("x", function (d) {
    return xScale(d.Country);
  }).attr("y", function (d) {
    return yScale(Math.log(d.NewConfirmed).toFixed(4));
  }).attr("width", xScale.bandwidth()).attr("height", function (d) {
    return height - yScale(Math.log(d.NewConfirmed).toFixed(4));
  }); // //debugger
  //   svg.append("text")
  //  .attr("transform", "translate(100,0)")
  //  .attr("x", 50)
  //  .attr("y", 50)
  //  .attr("font-size", "24px")
  //  .text("New Confirmed Cases")
  //  .attr("height", function(d) { return height ; });

  g.selectAll(".bar").on("mouseover", onMouseOver) //Add listener for the mouseover event
  .on("mouseleave", onMouseLeave);

  function onMouseOver(d, i) {
    //d is the info ex: country etc & i is if its the 1st or 2nd ...
    //debugger
    d3.select(this).attr('class', 'highlight');
    d3.select(this).transition().duration(500).attr("width", xScale.bandwidth() + 5).attr("y", function (d) {
      return yScale(Math.log(d.NewConfirmed).toFixed(4)) - 10;
    }).attr("height", function (d) {
      return height - yScale(Math.log(d.NewConfirmed).toFixed(4)) + 10;
    }); //  debugger

    g.append("text").attr('class', 'value').attr('x', function () {
      return xScale(d.Country) + 20;
    }).attr('y', function () {
      return yScale(Math.log(d.NewConfirmed).toFixed(4)) - 15;
    }).text(function () {
      return Math.log(d.NewConfirmed).toFixed(4);
    });
  } //debugger


  function onMouseLeave(d, i) {
    d3.select(this).attr('class', 'bar');
    d3.select(this).transition().duration(500).attr("width", xScale.bandwidth()).attr("y", function (d) {
      return yScale(Math.log(d.NewConfirmed).toFixed(4));
    }).attr("height", function (d) {
      return height - yScale(Math.log(d.NewConfirmed).toFixed(4));
    });
    d3.selectAll('.value').remove();
  }
}

function mapit(countries) {
  // //debugger
  var width = 1000;
  var height = 580; //  //debugger
  //   // Create SVG

  var svg = d3.select('#mapgraph').append("svg").attr("width", width).attr("height", height).attr("class", "map");
  var g = svg.append("g");
  var projection = d3.geoMercator().translate([width / 2, height / 2]);
  var data = d3.map(); // //debugger

  var colorScale = d3.scaleThreshold().domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000]).range(d3.schemeBlues[8]);
  countries.forEach(function (country) {
    data.set(country.CountryCode, +country.TotalRecovered);
  }); // function(d) { data.set(d.code, +d.pop);

  var path = d3.geoPath().projection(projection);
  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (error, topology) {
    ////debugger 
    g.selectAll("path").data(topology.features).enter().append("path").attr("d", path);
  }); // g.selectAll("path")
  // .attr("fill",)
} // function (d) {
//   d.total = data.get(d.id) || 0;
//   return colorScale(d.total);
// });


/* harmony default export */ __webpack_exports__["default"] = (GetCountries);

/***/ }),

/***/ "./src/lib/multibar_map.js":
/*!*********************************!*\
  !*** ./src/lib/multibar_map.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// document.addEventListener("DOMContentLoaded", () => {
//   multiCountries();
// });
document.getElementById('buttt').addEventListener('click', function (e) {
  e.preventDefault();
  d3.selectAll('.show').remove(); //debugger

  var input1 = document.getElementById("cat1").value;
  var input2 = document.getElementById("cat2").value;
  multiCountries(input1, input2);
});

function multiCountries() {
  var cat1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "NewConfirmed";
  var cat2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "NewRecovered";
  var xhr = new XMLHttpRequest(); // step 2 - specify path and verb

  xhr.open('GET', 'https://api.covid19api.com/summary'); // step 3 - register a callback

  xhr.onload = function () {
    var info = JSON.parse(xhr.response);
    var countries = info.Countries;
    makebarsg(countries, cat1, cat2);
  }; ////debugger
  // step 4 - send off the request with optional data


  xhr.send();
}

function makebarsg(countries, cat1, cat2) {
  //debugger
  d3.select('.outsite').append("svg").attr("id", "comparecases").attr("width", 1500).attr("height", 600);
  var svg = d3.select("#comparecases"),
      margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
      width = svg.attr("width") - (margin.left + 2 * margin.right),
      height = svg.attr("height") - (1.5 * margin.top + margin.bottom); //debugger

  svg.attr('class', 'show');
  var xScale = d3.scaleBand().rangeRound([20, width]).padding(0.2);
  var subcatsX = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height, 10]);
  var color = d3.scaleOrdinal().range(["#002ec5", "#2ed0db"]);
  var xAxis = d3.axisBottom(xScale).tickSize(0); //d3.axisBottom(xScale)
  // var yAxis = d3.axisLeft(yScale);
  // let subcats = new Object();
  // let subcatsnames = ["TotalConfirmed","NewRecovered", "TotalRecovered"];

  var subcatsnames = [cat1, cat2]; ////debugger

  var y = []; ////debugger
  //let dom = countries.filter(d=> { if (d.NewConfirmed> 2000) return d.NewConfirmed;});
  //debugger

  var dom = [];

  while (dom.length < 8) {
    var randCon = countries[Math.floor(Math.random() * countries.length)];

    if (randCon["".concat(cat1)] != 0 && randCon["".concat(cat2)] != 0) {
      dom.push(randCon);
    }
  } //debugger


  dom.forEach(function (c) {
    y.push(Math.log(c["".concat(cat1)])).toFixed(4); ////debugger

    y.push(Math.log(c["".concat(cat2)])).toFixed(4);
  });
  dom.forEach(function (c) {
    var logsC1 = Math.log(c["".concat(cat1)]).toFixed(4);
    var logsC2 = Math.log(c["".concat(cat2)]).toFixed(4); //  if(logsC1 === Infinity){
    //    logsC1 = "None";
    //  }
    //  if(logsC2 === Infinity){
    //   logsC2 = "None";
    // }

    c.subs = [{
      name: cat1,
      value: logsC1 //Math.log(c[`${cat1}`])

    }, {
      name: cat2,
      value: logsC2
    }]; // Math.log(c[`${cat2}`])}]; 
    ////debugger
  });
  xScale.domain(dom.map(function (d) {
    return d.Country;
  }));
  subcatsX.domain(subcatsnames).range([0, xScale.bandwidth()]);
  yScale.domain([0, d3.max(y) * 1.5]); //var g = svg.append("g").attr("transform", "translate(100 ,0)");

  var g = svg.append("g");
  g.append("g").attr("class", "xaxis").attr("transform", "translate(20," + height + ")").call(xAxis);
  g.append("g").attr("class", "y axis").call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")).ticks(15)).attr("transform", "translate(50,0)").append("text").attr("transform", "rotate(-90)").attr("y", 1).attr("dy", "-4.1em").attr("dx", "-19.1em").attr("text-anchor", "end").attr("stroke", "black").text("Log Number of Cases");
  svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1'); // debugger

  var subsection = svg.selectAll(".subsection").data(dom).enter().append("g").attr("class", "g").attr("transform", function (d) {
    return "translate(" + xScale(d.Country) + ",0)";
  });
  subsection.selectAll("rect").data(function (c) {
    return c.subs;
  }).enter().append("rect").attr("width", subcatsX.bandwidth()).attr("x", function (c) {
    return subcatsX(c.name);
  }).attr("y", function (c) {
    return yScale(c.value);
  }).attr("height", function (c) {
    return height - yScale(c.value);
  }).style("fill", function (c) {
    //debugger 
    return color(c.name);
  }); ///debugger

  subsection.selectAll("rect").on("mouseover", onMouseOver) //Add listener for the mouseover event
  .on("mouseleave", onMouseLeave);

  function onMouseOver(d, i) {
    //d is the info ex: country etc & i is if its the 1st or 2nd ...
    var dd = this; //debugger

    d3.select(this).attr('class', 'highlight');
    d3.select(this).transition().duration(500).attr("width", subcatsX.bandwidth() + 5).attr("y", function (d) {
      return yScale(d.value) - 10;
    }).attr("height", function (d) {
      return height - yScale(d.value) + 10;
    }); //debugger

    g.append("text").attr('class', 'value').attr('x', function () {
      //debugger/// subcats is grabbing 1st of category but not via the country
      //subcatsnames
      //  return event.clientX;
      return event.target.parentElement.transform.baseVal[0].matrix.e;
    }).attr('y', function () {
      // debugger
      return yScale(d.value) - 15;
    }).text(function () {
      //  debugger
      return d.value;
    });
  }

  function onMouseLeave(d, i) {
    d3.select(this).attr('class', 'bar');
    d3.select(this).transition().duration(500).attr("width", subcatsX.bandwidth()).attr("x", function (c) {
      return subcatsX(c.name);
    }).attr("y", function (c) {
      return yScale(c.value);
    }).attr("height", function (c) {
      return height - yScale(c.value);
    });
    d3.selectAll('.value').remove();
  } //debugger


  var legend = svg.selectAll(".legend").data(subcatsnames.slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
    return "translate(0," + i * 20 + ")";
  }); //  debugger

  legend.append("rect").attr("x", width - 30).attr("width", 150).attr("height", 18).style("fill", color).style("opacity", 0.7);
  legend.append("text").attr("x", width - 30).attr("y", 9).attr("dy", ".35em").text(function (d) {
    return d;
  });
}

/* harmony default export */ __webpack_exports__["default"] = (multiCountries);

/***/ }),

/***/ "./src/lib/options-dropdwn.js":
/*!************************************!*\
  !*** ./src/lib/options-dropdwn.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//console.log("JELLO");
function createdropdown() {
  var select = document.getElementById("cat1");
  var options = ["NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths", "NewRecovered", "TotalRecovered"];

  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

  var s = document.getElementById("cat2"); ////debugger

  for (var i2 = 0; i2 < options.length; i2++) {
    var opt2 = options[i2];
    var el2 = document.createElement("option");
    el2.textContent = opt2; //  //debugger

    el2.value = opt2;
    s.appendChild(el2);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (createdropdown);

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvY291bnRyaWVzX3RhbGx5LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvbXVsdGliYXJfbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvb3B0aW9ucy1kcm9wZHduLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiR2V0Q291bnRyaWVzIiwibXVsdGlDb3VudHJpZXMiLCJjcmVhdGVkcm9wZG93biIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsImluZm8iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsImNvdW50cmllcyIsIkNvdW50cmllcyIsImdyYXBoIiwic2VuZCIsInN2ZyIsImQzIiwic2VsZWN0IiwibWFyZ2luIiwid2lkdGgiLCJhdHRyIiwiaGVpZ2h0IiwieFNjYWxlIiwic2NhbGVCYW5kIiwicmFuZ2UiLCJwYWRkaW5nIiwieVNjYWxlIiwic2NhbGVMaW5lYXIiLCJnIiwiYXBwZW5kIiwieSIsImRvbSIsImxlbmd0aCIsInJhbmRDb24iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJOZXdDb25maXJtZWQiLCJwdXNoIiwiZm9yRWFjaCIsImMiLCJsb2ciLCJkb21haW4iLCJtYXAiLCJkIiwiQ291bnRyeSIsIm1heCIsImNhbGwiLCJheGlzQm90dG9tIiwidGV4dCIsImF4aXNMZWZ0IiwidGlja0Zvcm1hdCIsInRpY2tzIiwic2VsZWN0QWxsIiwiZGF0YSIsImVudGVyIiwidG9GaXhlZCIsImJhbmR3aWR0aCIsIm9uIiwib25Nb3VzZU92ZXIiLCJvbk1vdXNlTGVhdmUiLCJpIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwicmVtb3ZlIiwibWFwaXQiLCJwcm9qZWN0aW9uIiwiZ2VvTWVyY2F0b3IiLCJ0cmFuc2xhdGUiLCJjb2xvclNjYWxlIiwic2NhbGVUaHJlc2hvbGQiLCJzY2hlbWVCbHVlcyIsImNvdW50cnkiLCJzZXQiLCJDb3VudHJ5Q29kZSIsIlRvdGFsUmVjb3ZlcmVkIiwicGF0aCIsImdlb1BhdGgiLCJqc29uIiwiZXJyb3IiLCJ0b3BvbG9neSIsImZlYXR1cmVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0MSIsInZhbHVlIiwiaW5wdXQyIiwiY2F0MSIsImNhdDIiLCJtYWtlYmFyc2ciLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJyYW5nZVJvdW5kIiwic3ViY2F0c1giLCJjb2xvciIsInNjYWxlT3JkaW5hbCIsInhBeGlzIiwidGlja1NpemUiLCJzdWJjYXRzbmFtZXMiLCJsb2dzQzEiLCJsb2dzQzIiLCJzdWJzIiwibmFtZSIsImZvcm1hdCIsImRlbGF5Iiwic3R5bGUiLCJzdWJzZWN0aW9uIiwiZGQiLCJldmVudCIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibWF0cml4IiwibGVnZW5kIiwic2xpY2UiLCJyZXZlcnNlIiwib3B0aW9ucyIsIm9wdCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJzIiwiaTIiLCJvcHQyIiwiZWwyIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FB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R0FBakI7QUFDQUMsTUFBRSxDQUFDcEMsS0FBSCxHQUFXbUMsR0FBWDtBQUNBekcsVUFBTSxDQUFDNkcsV0FBUCxDQUFtQkgsRUFBbkI7QUFBd0I7O0FBRTdCLE1BQUlJLENBQUMsR0FBRzdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUFSLENBWnlCLENBYXpCOztBQUNDLE9BQUssSUFBSTZDLEVBQUUsR0FBRyxDQUFkLEVBQWlCQSxFQUFFLEdBQUdQLE9BQU8sQ0FBQ3pGLE1BQTlCLEVBQXNDZ0csRUFBRSxFQUF4QyxFQUE0QztBQUN4QyxRQUFJQyxJQUFJLEdBQUdSLE9BQU8sQ0FBQ08sRUFBRCxDQUFsQjtBQUNBLFFBQUlFLEdBQUcsR0FBR2hELFFBQVEsQ0FBQzBDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVjtBQUNBTSxPQUFHLENBQUNMLFdBQUosR0FBa0JJLElBQWxCLENBSHdDLENBSTFDOztBQUNFQyxPQUFHLENBQUMzQyxLQUFKLEdBQVkwQyxJQUFaO0FBQ0FGLEtBQUMsQ0FBQ0QsV0FBRixDQUFjSSxHQUFkO0FBQW9CO0FBR3pCOztBQUVjaEksNkVBQWYsRTs7Ozs7Ozs7Ozs7QUMzQkEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IG11bHRpQ291bnRyaWVzIGZyb20gXCIuL2xpYi9tdWx0aWJhcl9tYXBcIjtcbmltcG9ydCBjcmVhdGVkcm9wZG93biBmcm9tIFwiLi9saWIvb3B0aW9ucy1kcm9wZHduXCI7XG5pbXBvcnQgR2V0Q291bnRyaWVzIGZyb20gXCIuL2xpYi9jb3VudHJpZXNfdGFsbHlcIjtcblxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIEdldENvdW50cmllcygpO1xuICBtdWx0aUNvdW50cmllcygpO1xuICBjcmVhdGVkcm9wZG93bigpO1xufSk7XG4iLCIvL2h0dHBzOi8vb2JzZXJ2YWJsZWhxLmNvbS9AZDMvbGVhcm4tZDMtYnktZXhhbXBsZT9jb2xsZWN0aW9uPUBkMy9sZWFybi1kMyBcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbi8vICAgR2V0Q291bnRyaWVzKCk7XG4vLyB9KTtcblxuZnVuY3Rpb24gR2V0Q291bnRyaWVzKCkge1xuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAvLyBzdGVwIDIgLSBzcGVjaWZ5IHBhdGggYW5kIHZlcmJcbiAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5jb3ZpZDE5YXBpLmNvbS9zdW1tYXJ5Jyk7XG5cbiAgLy8gc3RlcCAzIC0gcmVnaXN0ZXIgYSBjYWxsYmFja1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKHhoci5zdGF0dXMpOyAvLyAgZm9yIHN0YXR1cyBpbmZvXG4gICAgLy8gY29uc29sZS5sb2coeGhyLnJlc3BvbnNlVHlwZSk7IC8vdGhlIHR5cGUgb2YgZGF0YSB0aGF0IHdhcyByZXR1cm5lZFxuICAgIC8vIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZSkgLy90aGUgYWN0dWFsIHJlc3BvbnNlLiBGb3IgSlNPTiBhcGkgY2FsbHMsIHRoaXMgd2lsbCBiZSBhIEpTT04gc3RyaW5nXG4gICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcbiAgICBjb25zdCBjb3VudHJpZXMgPSBpbmZvLkNvdW50cmllcztcbiAgICBncmFwaChjb3VudHJpZXMpO1xuICAgIFxuICAgIC8vbWFwaXQoY291bnRyaWVzKTtcbiAgfTtcbi8vLy9kZWJ1Z2dlclxuICAvLyBzdGVwIDQgLSBzZW5kIG9mZiB0aGUgcmVxdWVzdCB3aXRoIG9wdGlvbmFsIGRhdGFcbiAgeGhyLnNlbmQoKTtcbn1cblxuICBmdW5jdGlvbiBncmFwaChjb3VudHJpZXMpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiSkVMTE9cIik7XG4gICAgICB2YXIgc3ZnID0gZDMuc2VsZWN0KFwiI25ld2Nhc2VzXCIpLFxuICAgICAgbWFyZ2luID0gODAsXG4gICAgICB3aWR0aCA9IHN2Zy5hdHRyKFwid2lkdGhcIiktKDMqbWFyZ2luKSxcbiAgICAgIGhlaWdodD0gc3ZnLmF0dHIoXCJoZWlnaHRcIiktKDEuNSptYXJnaW4pO1xuICAvLyAvL2RlYnVnZ2VyXG4gIC8vIHZhciBzdmcgPSBkMy5zZWxlY3QoXCJzdmdcIik7XG5cbiAgICB2YXIgeFNjYWxlID0gZDMuc2NhbGVCYW5kKCkucmFuZ2UoWzAsIHdpZHRoXSkucGFkZGluZygwLjIpO1xuICAgIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAgIHZhciBnID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgxMDAgLDEwMClcIik7XG4gICAgbGV0IHkgPVtdO1xuICAgIGxldCBkb20gPSBbXTtcbiAgICB3aGlsZSAoZG9tLmxlbmd0aDw4ICl7XG4gICAgICBsZXQgcmFuZENvbiA9IGNvdW50cmllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudHJpZXMubGVuZ3RoKV1cbiAgICAgIGlmIChyYW5kQ29uLk5ld0NvbmZpcm1lZCAhPSAwKXtcbiAgICAgICAgZG9tLnB1c2gocmFuZENvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGRvbS5mb3JFYWNoKGMgPT4ge1xuICAgICAgeS5wdXNoKE1hdGgubG9nKGMuTmV3Q29uZmlybWVkKSk7XG4gICAgfSk7XG5cbiAgICAvL2RlYnVnZ2VyXG4gIFxuICAgIHhTY2FsZS5kb21haW4oZG9tLm1hcChkPT4geyByZXR1cm4gZC5Db3VudHJ5O30pKTtcbiAgICB5U2NhbGUuZG9tYWluKFswLCBkMy5tYXgoeSldKTtcbiAgICAvLyAvL2RlYnVnZ2VyXG4gICAgZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgIC5jYWxsKGQzLmF4aXNCb3R0b20oeFNjYWxlKSlcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKVxuICAgIC5hdHRyKFwieFwiLCB3aWR0aClcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpXG4gICAgLmF0dHIoXCJzdHJva2VcIiwgXCJibGFja1wiKVxuICAgIC50ZXh0KFwiQ291bnRyaWVzXCIpO1xuICAgIC8vIC8vZGVidWdnZXI7XG5cbiAgICBnLmFwcGVuZChcImdcIikuY2FsbChkMy5heGlzTGVmdCh5U2NhbGUpLnRpY2tGb3JtYXQoZnVuY3Rpb24oZCl7XG4gICAgICByZXR1cm4gZDtcbiAgICB9KS50aWNrcygxNSkpXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLmF0dHIoXCJ5XCIsIDEpXG4gICAgLmF0dHIoXCJkeVwiLCBcIi01LjFlbVwiKVxuICAgIC5hdHRyKFwiZHhcIiwgXCItMTkuMWVtXCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcbiAgICAudGV4dChcIkxvZyBOdW1iZXIgb2YgQ2FzZXNcIik7XG5cbiAgICBnLnNlbGVjdEFsbChcIi5iYXJcIilcbiAgICAuZGF0YShkb20pXG4gICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJiYXJcIilcbiAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4geFNjYWxlKGQuQ291bnRyeSk7IH0pXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHlTY2FsZShNYXRoLmxvZyhkLk5ld0NvbmZpcm1lZCkudG9GaXhlZCg0KSk7IH0pXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB4U2NhbGUuYmFuZHdpZHRoKCkpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKE1hdGgubG9nKGQuTmV3Q29uZmlybWVkKS50b0ZpeGVkKDQpKTsgfSk7XG4gICAgLy8gLy9kZWJ1Z2dlclxuICAvLyAgIHN2Zy5hcHBlbmQoXCJ0ZXh0XCIpXG4gIC8vICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgxMDAsMClcIilcbiAgLy8gIC5hdHRyKFwieFwiLCA1MClcbiAgLy8gIC5hdHRyKFwieVwiLCA1MClcbiAgLy8gIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMjRweFwiKVxuICAvLyAgLnRleHQoXCJOZXcgQ29uZmlybWVkIENhc2VzXCIpXG4gIC8vICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBoZWlnaHQgOyB9KTtcbiAgIFxuICAgZy5zZWxlY3RBbGwoXCIuYmFyXCIpXG4gICAub24oXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpIC8vQWRkIGxpc3RlbmVyIGZvciB0aGUgbW91c2VvdmVyIGV2ZW50XG4gLm9uKFwibW91c2VsZWF2ZVwiLCBvbk1vdXNlTGVhdmUpO1xuXG4gICAgZnVuY3Rpb24gb25Nb3VzZU92ZXIoZCwgaSl7IC8vZCBpcyB0aGUgaW5mbyBleDogY291bnRyeSBldGMgJiBpIGlzIGlmIGl0cyB0aGUgMXN0IG9yIDJuZCAuLi5cbiAgICAgIC8vZGVidWdnZXJcbiAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdjbGFzcycsICdoaWdobGlnaHQnKTtcbiAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgeFNjYWxlLmJhbmR3aWR0aCgpKzUpXG4gICAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiB5U2NhbGUoTWF0aC5sb2coZC5OZXdDb25maXJtZWQpLnRvRml4ZWQoNCkpLTEwOyB9KVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBoZWlnaHQgLSB5U2NhbGUoTWF0aC5sb2coZC5OZXdDb25maXJtZWQpLnRvRml4ZWQoNCkpICsxMDsgfSk7XG4gICAgIC8vICBkZWJ1Z2dlclxuICAgICAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAuYXR0cignY2xhc3MnLCAndmFsdWUnKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbigpe3JldHVybiB4U2NhbGUoZC5Db3VudHJ5KSsyMH0pXG4gICAgICAuYXR0cigneScsIGZ1bmN0aW9uKCl7cmV0dXJuIHlTY2FsZShNYXRoLmxvZyhkLk5ld0NvbmZpcm1lZCkudG9GaXhlZCg0KSktMTU7fSlcbiAgICAgIC50ZXh0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBNYXRoLmxvZyhkLk5ld0NvbmZpcm1lZCkudG9GaXhlZCg0KTtcbiAgICAgIH0pO1xuICAgIH1cbi8vZGVidWdnZXJcbiAgICBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoZCwgaSl7XG4gICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCAnYmFyJyk7XG4gICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHhTY2FsZS5iYW5kd2lkdGgoKSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiB5U2NhbGUoTWF0aC5sb2coZC5OZXdDb25maXJtZWQpLnRvRml4ZWQoNCkpOyB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gaGVpZ2h0IC0geVNjYWxlKE1hdGgubG9nKGQuTmV3Q29uZmlybWVkKS50b0ZpeGVkKDQpKTsgfSk7XG4gICAgICBkMy5zZWxlY3RBbGwoJy52YWx1ZScpXG4gICAgICAucmVtb3ZlKCk7XG4gICAgfVxuICAgIFxuXG4gIH1cbiAgZnVuY3Rpb24gbWFwaXQoY291bnRyaWVzKXtcbiAvLyAvL2RlYnVnZ2VyXG4gICAgICB2YXIgd2lkdGggPSAxMDAwO1xuICAgICAgdmFyIGhlaWdodCA9IDU4MDtcbiAgICAvLyAgLy9kZWJ1Z2dlclxuICAgIC8vICAgLy8gQ3JlYXRlIFNWR1xuICAgICAgdmFyIHN2ZyA9IGQzLnNlbGVjdCgnI21hcGdyYXBoJylcbiAgICAgICAgICAuYXBwZW5kKCBcInN2Z1wiIClcbiAgICAgICAgICAuYXR0ciggXCJ3aWR0aFwiLCB3aWR0aCApXG4gICAgICAgICAgLmF0dHIoIFwiaGVpZ2h0XCIsIGhlaWdodCApXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm1hcFwiKTtcbiAgICAgIFxuICAgICAgXG4gICAgICB2YXIgZyA9IHN2Zy5hcHBlbmQoIFwiZ1wiICk7XG4gICAgICB2YXIgcHJvamVjdGlvbiA9IGQzLmdlb01lcmNhdG9yKClcbiAgICAgLnRyYW5zbGF0ZShbd2lkdGgvMiwgaGVpZ2h0LzJdKTtcbiAgICBcbiAgICAgIHZhciBkYXRhID0gZDMubWFwKCk7XG4gICAgICAvLyAvL2RlYnVnZ2VyXG4gICAgICB2YXIgY29sb3JTY2FsZSA9IGQzLnNjYWxlVGhyZXNob2xkKClcbiAgICAgIC5kb21haW4oWzEwMDAwMCwgMTAwMDAwMCwgMTAwMDAwMDAsIDMwMDAwMDAwLCAxMDAwMDAwMDAsIDUwMDAwMDAwMF0pXG4gICAgICAucmFuZ2UoZDMuc2NoZW1lQmx1ZXNbOF0pO1xuICAgICAgXG4gICAgICBcblxuICAgICAgY291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgIGRhdGEuc2V0KGNvdW50cnkuQ291bnRyeUNvZGUsICtjb3VudHJ5LlRvdGFsUmVjb3ZlcmVkKTtcbiAgICAgIH0pO1xuICAgICAgLy8gZnVuY3Rpb24oZCkgeyBkYXRhLnNldChkLmNvZGUsICtkLnBvcCk7XG4gICAgXG4gICAgICB2YXIgcGF0aCA9IGQzLmdlb1BhdGgoKS5wcm9qZWN0aW9uKHByb2plY3Rpb24pO1xuICAgICAgZDMuanNvbihcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9ob2x0enkvRDMtZ3JhcGgtZ2FsbGVyeS9tYXN0ZXIvREFUQS93b3JsZC5nZW9qc29uXCIsIGZ1bmN0aW9uKGVycm9yLCB0b3BvbG9neSkge1xuICAgICAgICAvLy8vZGVidWdnZXIgXG4gICAgICAgICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgLmRhdGEodG9wb2xvZ3kuZmVhdHVyZXMpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgIC5hdHRyKFwiZFwiLCBwYXRoKTtcbiAgICAgICAgICBcbiAgICAgIH0pO1xuXG4gICAgICAvLyBnLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC8vIC5hdHRyKFwiZmlsbFwiLClcblxuICB9XG4gIC8vIGZ1bmN0aW9uIChkKSB7XG4gIC8vICAgZC50b3RhbCA9IGRhdGEuZ2V0KGQuaWQpIHx8IDA7XG4gIC8vICAgcmV0dXJuIGNvbG9yU2NhbGUoZC50b3RhbCk7XG4gIC8vIH0pO1xuXG4gIGV4cG9ydCBkZWZhdWx0IEdldENvdW50cmllczsiLCIvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4vLyAgIG11bHRpQ291bnRyaWVzKCk7XG4vLyB9KTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbmUucHJldmVudERlZmF1bHQoKTtcbiAgZDMuc2VsZWN0QWxsKCcuc2hvdycpLnJlbW92ZSgpO1xuICAvL2RlYnVnZ2VyXG4gIGxldCBpbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhdDFcIikudmFsdWU7XG4gIGxldCBpbnB1dDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhdDJcIikudmFsdWU7XG4gIFxuICBtdWx0aUNvdW50cmllcyhpbnB1dDEsIGlucHV0Mik7XG59KTtcblxuZnVuY3Rpb24gbXVsdGlDb3VudHJpZXMoY2F0MT1cIk5ld0NvbmZpcm1lZFwiLCBjYXQyPSBcIk5ld1JlY292ZXJlZFwiKSB7XG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIC8vIHN0ZXAgMiAtIHNwZWNpZnkgcGF0aCBhbmQgdmVyYlxuICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmNvdmlkMTlhcGkuY29tL3N1bW1hcnknKTtcblxuICAvLyBzdGVwIDMgLSByZWdpc3RlciBhIGNhbGxiYWNrXG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW5mbyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcbiAgICBjb25zdCBjb3VudHJpZXMgPSBpbmZvLkNvdW50cmllcztcbiAgICBtYWtlYmFyc2coY291bnRyaWVzLCBjYXQxLCBjYXQyKTtcbiAgfTtcbi8vLy9kZWJ1Z2dlclxuICAvLyBzdGVwIDQgLSBzZW5kIG9mZiB0aGUgcmVxdWVzdCB3aXRoIG9wdGlvbmFsIGRhdGFcbiAgeGhyLnNlbmQoKTtcbn1cblxuZnVuY3Rpb24gbWFrZWJhcnNnKGNvdW50cmllcywgY2F0MSwgY2F0Mil7XG4gIC8vZGVidWdnZXJcblxuICBkMy5zZWxlY3QoJy5vdXRzaXRlJykuYXBwZW5kKFwic3ZnXCIpLmF0dHIoXCJpZFwiLCBcImNvbXBhcmVjYXNlc1wiKS5hdHRyKFwid2lkdGhcIiwgMTUwMCkuYXR0cihcImhlaWdodFwiLCA2MDApO1xuICB2YXIgc3ZnID0gZDMuc2VsZWN0KFwiI2NvbXBhcmVjYXNlc1wiKSxcbiAgbWFyZ2luID0ge3RvcDogMjAsIHJpZ2h0OiAyMCwgYm90dG9tOiAzMCwgbGVmdDogNDB9LFxuICB3aWR0aCA9IHN2Zy5hdHRyKFwid2lkdGhcIiktKG1hcmdpbi5sZWZ0ICsgKDIqbWFyZ2luLnJpZ2h0KSksXG4gIGhlaWdodD0gc3ZnLmF0dHIoXCJoZWlnaHRcIiktKDEuNSptYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSk7XG4vL2RlYnVnZ2VyXG4gIHN2Zy5hdHRyKCdjbGFzcycsICdzaG93Jyk7XG5cbiAgdmFyIHhTY2FsZSA9IGQzLnNjYWxlQmFuZCgpLnJhbmdlUm91bmQoWzIwLCB3aWR0aF0pLnBhZGRpbmcoMC4yKTtcbiAgdmFyIHN1YmNhdHNYID0gZDMuc2NhbGVCYW5kKCk7XG4gIHZhciB5U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDEwXSk7XG5cbiAgdmFyIGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKClcbiAgLnJhbmdlKFtcIiMwMDJlYzVcIixcIiMyZWQwZGJcIl0pO1xuXG4gIHZhciB4QXhpcyA9IGQzLmF4aXNCb3R0b20oeFNjYWxlKVxuICAudGlja1NpemUoMCk7XG4gIC8vZDMuYXhpc0JvdHRvbSh4U2NhbGUpXG4gIC8vIHZhciB5QXhpcyA9IGQzLmF4aXNMZWZ0KHlTY2FsZSk7XG5cbiAgLy8gbGV0IHN1YmNhdHMgPSBuZXcgT2JqZWN0KCk7XG4gIC8vIGxldCBzdWJjYXRzbmFtZXMgPSBbXCJUb3RhbENvbmZpcm1lZFwiLFwiTmV3UmVjb3ZlcmVkXCIsIFwiVG90YWxSZWNvdmVyZWRcIl07XG4gICBsZXQgc3ViY2F0c25hbWVzID0gW2NhdDEsIGNhdDJdO1xuXG4gIC8vLy9kZWJ1Z2dlclxuICBsZXQgeSA9W107XG4gICAgIC8vLy9kZWJ1Z2dlclxuICAgIC8vbGV0IGRvbSA9IGNvdW50cmllcy5maWx0ZXIoZD0+IHsgaWYgKGQuTmV3Q29uZmlybWVkPiAyMDAwKSByZXR1cm4gZC5OZXdDb25maXJtZWQ7fSk7XG4gICAgLy9kZWJ1Z2dlclxuICAgIGxldCBkb20gPVtdO1xuICAgIHdoaWxlIChkb20ubGVuZ3RoPDggKXtcbiAgICAgIGxldCByYW5kQ29uID0gY291bnRyaWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvdW50cmllcy5sZW5ndGgpXTtcbiAgICAgICBpZiAocmFuZENvbltgJHtjYXQxfWBdICE9MCAmJiByYW5kQ29uW2Ake2NhdDJ9YF0gIT0wICl7XG4gICAgICAgICBkb20ucHVzaChyYW5kQ29uKTtcbiAgICAgICB9XG4gICAgICBcbiAgICB9XG4vL2RlYnVnZ2VyXG4gICAgZG9tLmZvckVhY2goYyA9PiB7XG4gICAgICB5LnB1c2goTWF0aC5sb2coY1tgJHtjYXQxfWBdKSkudG9GaXhlZCg0KTtcbiAgICAgIC8vLy9kZWJ1Z2dlclxuICAgICAgeS5wdXNoKE1hdGgubG9nKGNbYCR7Y2F0Mn1gXSkpLnRvRml4ZWQoNCk7fVxuICAgICApO1xuICAgICBcbiAgICAgZG9tLmZvckVhY2goYyA9PiB7XG4gICAgICAgbGV0IGxvZ3NDMSA9IChNYXRoLmxvZyhjW2Ake2NhdDF9YF0pKS50b0ZpeGVkKDQpO1xuICAgICAgIGxldCBsb2dzQzIgPSAoTWF0aC5sb2coY1tgJHtjYXQyfWBdKSkudG9GaXhlZCg0KTtcbiAgICAgIC8vICBpZihsb2dzQzEgPT09IEluZmluaXR5KXtcbiAgICAgIC8vICAgIGxvZ3NDMSA9IFwiTm9uZVwiO1xuICAgICAgLy8gIH1cbiAgICAgIC8vICBpZihsb2dzQzIgPT09IEluZmluaXR5KXtcbiAgICAgIC8vICAgbG9nc0MyID0gXCJOb25lXCI7XG4gICAgICAvLyB9XG4gICAgICAgYy5zdWJzID1be25hbWU6Y2F0MSwgdmFsdWU6IGxvZ3NDMVxuICAgICAgICAvL01hdGgubG9nKGNbYCR7Y2F0MX1gXSlcbiAgICAgIH0sXG4gICAgICAgIHtuYW1lOmNhdDIsIHZhbHVlOiBsb2dzQzIgfV07XG4gICAgICAgICAgLy8gTWF0aC5sb2coY1tgJHtjYXQyfWBdKX1dOyBcbiAgICAgICAgIC8vLy9kZWJ1Z2dlclxuICAgICB9KTtcblxuICB4U2NhbGUuZG9tYWluKGRvbS5tYXAoZD0+IHsgcmV0dXJuIGQuQ291bnRyeTt9KSk7XG4gIHN1YmNhdHNYLmRvbWFpbihzdWJjYXRzbmFtZXMpLnJhbmdlKFswLCB4U2NhbGUuYmFuZHdpZHRoKCldKTtcbiAgeVNjYWxlLmRvbWFpbihbMCwgZDMubWF4KHkpKjEuNV0pO1xuICAvL3ZhciBnID0gc3ZnLmFwcGVuZChcImdcIikuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgxMDAgLDApXCIpO1xuICBcbiAgICB2YXIgZyA9IHN2Zy5hcHBlbmQoXCJnXCIpO1xuICAgIGcuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInhheGlzXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgyMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgLmNhbGwoeEF4aXMpO1xuXG4gICAgZy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcInkgYXhpc1wiKVxuICAgIC5jYWxsKGQzLmF4aXNMZWZ0KHlTY2FsZSkudGlja0Zvcm1hdChkMy5mb3JtYXQoXCIuMnNcIikpXG4gICAgLnRpY2tzKDE1KSkuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSg1MCwwKVwiKVxuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgIC5hdHRyKFwieVwiLCAxKVxuICAgIC5hdHRyKFwiZHlcIiwgXCItNC4xZW1cIilcbiAgICAuYXR0cihcImR4XCIsIFwiLTE5LjFlbVwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAuYXR0cihcInN0cm9rZVwiLCBcImJsYWNrXCIpXG4gICAgLnRleHQoXCJMb2cgTnVtYmVyIG9mIENhc2VzXCIpO1xuXG4gICAgc3ZnLnNlbGVjdCgnLnknKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oNTAwKS5kZWxheSgxMzAwKS5zdHlsZSgnb3BhY2l0eScsJzEnKTtcbi8vIGRlYnVnZ2VyXG4gICAgdmFyIHN1YnNlY3Rpb24gPSBzdmcuc2VsZWN0QWxsKFwiLnN1YnNlY3Rpb25cIilcbiAgICAgIC5kYXRhKGRvbSlcbiAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJnXCIpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLGZ1bmN0aW9uKGQpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeFNjYWxlKGQuQ291bnRyeSkgKyBcIiwwKVwiOyB9KTtcbiAgICAgIFxuICAgICAgc3Vic2VjdGlvbi5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAuZGF0YShmdW5jdGlvbihjKSB7IFxuICAgICAgICByZXR1cm4gYy5zdWJzO30pXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHN1YmNhdHNYLmJhbmR3aWR0aCgpKVxuICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgIHJldHVybiBzdWJjYXRzWChjLm5hbWUpO30pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oYykge3JldHVybiB5U2NhbGUoYy52YWx1ZSk7fSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGMpe3JldHVybiBoZWlnaHQteVNjYWxlKGMudmFsdWUpO30pXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIGZ1bmN0aW9uKGMpeyAvL2RlYnVnZ2VyIFxuICAgICAgICByZXR1cm4gY29sb3IoYy5uYW1lKTt9KTtcblxuICAgICAgIC8vL2RlYnVnZ2VyXG4gICAgICAgIHN1YnNlY3Rpb24uc2VsZWN0QWxsKFwicmVjdFwiKVxuICAgICAgICAub24oXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpIC8vQWRkIGxpc3RlbmVyIGZvciB0aGUgbW91c2VvdmVyIGV2ZW50XG4gICAgICAgIC5vbihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNlT3ZlcihkLCBpKXsgLy9kIGlzIHRoZSBpbmZvIGV4OiBjb3VudHJ5IGV0YyAmIGkgaXMgaWYgaXRzIHRoZSAxc3Qgb3IgMm5kIC4uLlxuICAgICAgICAgICBsZXQgZGQ9IHRoaXM7IC8vZGVidWdnZXJcbiAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCAnaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBzdWJjYXRzWC5iYW5kd2lkdGgoKSs1KVxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSktMTA7fSlcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKGQpIHsgXG4gICAgICAgICAgICAgIHJldHVybiBoZWlnaHQteVNjYWxlKGQudmFsdWUpICsxMDt9KTtcbiAgICAgICAgIC8vZGVidWdnZXJcbiAgICAgICAgIGcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2YWx1ZScpXG4gICAgICAgICAgLmF0dHIoJ3gnLCAoKT0+eyBcbiAgICAgICAgICAgIC8vZGVidWdnZXIvLy8gc3ViY2F0cyBpcyBncmFiYmluZyAxc3Qgb2YgY2F0ZWdvcnkgYnV0IG5vdCB2aWEgdGhlIGNvdW50cnlcbiAgICAgICAgICAgIC8vc3ViY2F0c25hbWVzXG4gICAgICAgICAgLy8gIHJldHVybiBldmVudC5jbGllbnRYO1xuICAgICAgICAgIHJldHVybiBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC50cmFuc2Zvcm0uYmFzZVZhbFswXS5tYXRyaXguZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIHJldHVybiB5U2NhbGUoZC52YWx1ZSktMTU7fSlcbiAgICAgICAgICAudGV4dChmdW5jdGlvbigpe1xuICAgICAgICAgIC8vICBkZWJ1Z2dlclxuICAgICAgICAgICAgcmV0dXJuIGQudmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbk1vdXNlTGVhdmUoZCwgaSl7XG4gICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2NsYXNzJywgJ2JhcicpO1xuICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgc3ViY2F0c1guYmFuZHdpZHRoKCkpXG4gICAgICAgICAgLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGMpIHsgcmV0dXJuIHN1YmNhdHNYKGMubmFtZSk7fSlcbiAgICAgICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24oYykge3JldHVybiB5U2NhbGUoYy52YWx1ZSk7fSlcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBmdW5jdGlvbihjKXtyZXR1cm4gaGVpZ2h0LXlTY2FsZShjLnZhbHVlKX0pXG4gICAgICAgICAgZDMuc2VsZWN0QWxsKCcudmFsdWUnKVxuICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICAvL2RlYnVnZ2VyXG4gICAgICB2YXIgbGVnZW5kID0gc3ZnLnNlbGVjdEFsbChcIi5sZWdlbmRcIilcbiAgICAgICAgLmRhdGEoc3ViY2F0c25hbWVzLnNsaWNlKCkucmV2ZXJzZSgpKVxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpXG4gICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZFwiKVxuICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQsIGkpIHsgcmV0dXJuIFwidHJhbnNsYXRlKDAsXCIgKyBpICogMjAgKyBcIilcIjsgfSk7XG4gICAgICAgIC8vICBkZWJ1Z2dlclxuICAgICAgICBsZWdlbmQuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgIC5hdHRyKFwieFwiLCB3aWR0aC0zMClcbiAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIDE1MClcbiAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCAxOClcbiAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIGNvbG9yKVxuICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC43KTtcblxuICAgICAgICBsZWdlbmQuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgIC5hdHRyKFwieFwiLCB3aWR0aC0zMClcbiAgICAgICAgICAuYXR0cihcInlcIiwgOSlcbiAgICAgICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIilcbiAgICAgICAgICAudGV4dChmdW5jdGlvbihkKXtyZXR1cm4gZDt9KTtcbiB9XG5cbiBleHBvcnQgZGVmYXVsdCBtdWx0aUNvdW50cmllczsiLCIvL2NvbnNvbGUubG9nKFwiSkVMTE9cIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZWRyb3Bkb3duKCkge1xuICAgXG52YXIgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXQxXCIpOyAgXG5cbnZhciBvcHRpb25zID0gW1wiTmV3Q29uZmlybWVkXCIsXCJUb3RhbENvbmZpcm1lZFwiLFwiTmV3RGVhdGhzXCIsIFwiVG90YWxEZWF0aHNcIiwgXCJOZXdSZWNvdmVyZWRcIiwgXCJUb3RhbFJlY292ZXJlZFwiIF07IFxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvcHQgPSBvcHRpb25zW2ldO1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gb3B0O1xuICAgICAgZWwudmFsdWUgPSBvcHQ7XG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoZWwpO31cblxuIHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXQyXCIpOyAgXG4gLy8vL2RlYnVnZ2VyXG4gIGZvciAodmFyIGkyID0gMDsgaTIgPCBvcHRpb25zLmxlbmd0aDsgaTIrKykge1xuICAgICAgdmFyIG9wdDIgPSBvcHRpb25zW2kyXTtcbiAgICAgIHZhciBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgZWwyLnRleHRDb250ZW50ID0gb3B0MjtcbiAgICAvLyAgLy9kZWJ1Z2dlclxuICAgICAgZWwyLnZhbHVlID0gb3B0MjtcbiAgICAgIHMuYXBwZW5kQ2hpbGQoZWwyKTt9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVkcm9wZG93bjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9