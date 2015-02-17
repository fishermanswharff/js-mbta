/* 'use strict'; is a javascript statement to declare we're using strict mode, 
which means you need semi-colons where they should go */
'use strict';

/* this is an anonymous function that will run as soon as the file is loaded and 
the javascript is compiled */
(function(){

  // alias for console.log
  function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}};

  // variables declared. they are undefined at this point
  var origin,dest,form;

  // the object that will hold all of the lines
  var MBTA = {
    redline: ["Alewife","Davis","Porter","Harvard","Central","Kendall/MIT","Charles/MGH","Park Street","Downtown Crossing","South Station"],
    orangeline: ["Oak Grove", "Malden Center", "Wellington", "Assembly","Sullivan Square", "Community College", "North Station","Haymarket","Park Street","State","Downtown Crossing"],
    greenline: ["North Station","Haymarket","Government Center","Park Street","Boylston","Arlington","Copley","Hynes Convention Center", "Kenmore"]
  };

  // when a user clicks the submit button, the form's event listeners call this code.
  var processForm = function(e) {
    // we're preventing default form submission here
    if (e.preventDefault) e.preventDefault();
    // get the origin from the input element
    origin = document.getElementById("origin").value;
    // get the destination from the input element
    dest = document.getElementById("dest").value;
    // call the `route` function, pass in the origin and destination
    route(origin, dest);
    // You must return false to prevent the default form behavior
    return false;
  };

  /*  route checks to make sure origin and destination exist and are more than empty strings
  then it loops through MBTA properties (which are arrays) and loops through each item in the array   */
  var route = function(origin,dest){
    // if the origin or destination are empty strings then throw an error
    if(origin === "" || dest === "") { throw new Error("Must submit an origin and destination"); }
    // loop through the MBTA properties
    for(var line in MBTA){
      // loop through the line's array
      MBTA[line].forEach(getStations);
    }
  };

  /*  getStations is the logic of the application. this function is taking the parameters
  passed by forEach (element,index,array) and doing something with them*/
  var getStations = function(element,index,array){
    // if the origin and destination are on the same line
    if(array.indexOf(origin) !== -1 && array.indexOf(dest) !== -1 ){
      // call the function for calculating the distance
      getDistanceFromSameLine(origin,dest,array);
    } else if(element === origin){
      getDistanceFromOrigin(element,index,array);
    } else if(element === dest) {
      getDistanceFromDest(element,index,array);
    }
  };

  var getDistanceFromSameLine = function(origin,destination,array){
    var distance = Math.abs(array.indexOf(origin) - array.indexOf(destination));
    var output = document.getElementById("origin-results");
    output.innerHTML = "<p>Get on @ " + origin + " and go " + distance + " stops.</p>";
  };

  var getDistanceFromOrigin = function(element,index,array){
    var distance = Math.abs(array.indexOf("Park Street") - array.indexOf(element));
    var output = document.getElementById("origin-results");
    output.innerHTML = "<p>Get on @ " + origin + " and go " + distance + " stops.</p>";
  };

  var getDistanceFromDest = function(element,index,array){
    var distance = Math.abs(array.indexOf("Park Street") - array.indexOf(element));
    var output = document.getElementById("dest-results");
    output.innerHTML = "<p>Change @ Park Street and go for " + distance + " stops.</p>";
  };

  var totalDistance = function(){
    debugger;
  };

  // get the form element, and add event listeners to it so we can prevent default submission
  form = document.getElementById('mbta');
  if (form.attachEvent) {
    form.attachEvent("submit", processForm);
  } else {
    form.addEventListener("submit", processForm);
  };

})();