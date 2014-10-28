(function(){

  function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}};

  var origin,dest,form;

  var MBTA = {
    "redline": ["Alewife","Davis","Porter","Harvard","Central","Kendall/MIT","Charles/MGH","Park Street","Downtown Crossing","South Station"],
    "orangeline": ["Oak Grove", "Malden Center", "Wellington", "Assembly","Sullivan Square", "Community College", "North Station","Haymarket","Park Street","State","Downtown Crossing"],
    "greenline": ["North Station","Haymarket","Government Center","Park Street","Boylston","Arlington","Copley","Hynes Convention Center", "Kenmore"]
  }

  function processForm(e) {
      if (e.preventDefault) e.preventDefault();
      origin = document.getElementById("origin").value;
      dest = document.getElementById("dest").value;
      route(origin, dest);
      // You must return false to prevent the default form behavior
      return false;
  }

  function route(origin,dest){
    if(origin === "" || dest === "") { throw new Error("Must submit an origin and destination"); }
    for(line in MBTA){
      MBTA[line].forEach(getLines);
    }
  }

  function getLines(element,index,array){
    if(element == origin){
      getDistanceFromOrigin(element,index,array);
    } else if(element == dest) {
      getDistanceFromDest(element,index,array);
    }
  }

  function getDistanceFromOrigin(element,index,array){
    var distance = Math.abs(array.indexOf("Park Street") - array.indexOf(element));
    var output = document.getElementById("origin-results");
    output.innerHTML = "<p>Get on @ " + origin + " and go " + distance + " stops.</p>";
  }

  function getDistanceFromDest(element,index,array){
    var distance = Math.abs(array.indexOf("Park Street") - array.indexOf(element));
    var output = document.getElementById("dest-results");
    output.innerHTML = "<p>Change @ Park Street and go for " + distance + " stops.</p>";
  }


  form = document.getElementById('mbta');
  if (form.attachEvent) {
      form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  }

})();