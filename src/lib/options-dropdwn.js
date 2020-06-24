//console.log("JELLO");

function createdropdown() {
  var select = document.getElementById("cat1");  
  var options = ["NewConfirmed","TotalConfirmed","NewDeaths", "TotalDeaths", "NewRecovered", "TotalRecovered"]; 
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
  console.log(options);

  var s = document.getElementById("cat2"); 
      var flip = options[0];
      options[0]= options[1];
      options[1] = flip;
      console.log(options);
    for (var i2 = 0; i2 < options.length; i2++) {
        var opt2 = options[i2];
        var el2 = document.createElement("option");
        el2.textContent = opt2;
        el2.value = opt2;
        s.appendChild(el2);}
}

export default createdropdown;
