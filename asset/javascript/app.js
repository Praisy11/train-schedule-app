$(document).ready(function() {
// reference taken for employee databse solved in class activity and codepen(for firebase datainput and push used their variable names was getting a error with my code)
var tname;
var tdes;
var fttime;
var freq; 
//var nextArrival = "";
//var minutesAway = " "; 



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA57Ald5V2ubl1_lDvhMysN8wOGPy0KQO4",
    authDomain: "first-firebase-proj-a7d2a.firebaseapp.com",
    databaseURL: "https://first-firebase-proj-a7d2a.firebaseio.com",
    projectId: "first-firebase-proj-a7d2a",
    storageBucket: "first-firebase-proj-a7d2a.appspot.com",
    messagingSenderId: "113777479070"
  };
  firebase.initializeApp(config);


    // VARIABLES
    // --------------------------------------------------------------------------------

    var database = firebase.database();
    //var ref = database.ref("trainRecord");

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------
// takes in input from users on submit button click
// button to submit the user info
$("#trainInfoBtn").on("click", function(event) {
	event.preventDefault(); 

	//set user input values to variables
	var trainName = $("#name").val().trim();
	var destination = $("#dest").val().trim();

	//converts user input 
	var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");

	var frequency = $("#freq").val().trim();
	
	//current time
	var currentTime = moment();
	console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));




	//gathers together all our new train info
	var newTrain = {

		train: trainName,
		trainGoing: destination,
		trainComing: firstTime,
		everyXMin: frequency
	};


	//uploads newTrain to firebase
	database.ref().push(newTrain);
		$("#name").val("");
	$("#dest").val("");
	$("#firstTime").val("");
	$("#freq").val("");

		return false;

}); //end of onclick


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());
		//store in variables
		var trainName = childSnapshot.val().train;
		var destination =childSnapshot.val().trainGoing;
		var firstTime = childSnapshot.val().trainComing;
		var frequency = childSnapshot.val().everyXMin;


		//makes first train time neater
		var trainTime = moment.unix(firstTime).format("hh:mm");
		//calculate difference between times
		var difference =  moment().diff(moment(trainTime),"minutes");

		//time apart(remainder)
		var trainRemain = difference % frequency;

		//minutes until arrival
		var minUntil = frequency - trainRemain;

		//next arrival time
		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

		//updating html 
		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

   
});

//function(errorObject) {
  //console.log("The read failed: " + errorObject.code);
//}
});

