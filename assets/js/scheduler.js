// Materialize time function
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems);
});

// Initialize firebase
var config = {
  apiKey: "AIzaSyAxeKvOM--jIz3Gnp2tFmCpYc8EwMMPFyc",
  authDomain: "trainscheduler-258f5.firebaseapp.com",
  databaseURL: "https://trainscheduler-258f5.firebaseio.com",
  projectId: "trainscheduler-258f5",
  storageBucket: "",
  messagingSenderId: "61364328316"
};
firebase.initializeApp(config);

var database = firebase.database();


// button click to grab user input on form
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  console.log("button clicked")

  var trainName = $("#trainNameInput").val().trim();
  var trainDestination = $("#destinationInput").val().trim();
  var firstTrain = $("#firstTrainInput").val().trim();
  var trainFrequency = $("#frequencyInput").val().trim();

  var newTrain = {
    trainName: trainName,
    trainDestination: trainDestination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
  }

  console.log(newTrain)
  // push to firebase
  database.ref().push(newTrain);

  // clear form field
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

});

// firebase event: when new train is added to the database, this function will write the data on page
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var DBtrainName = childSnapshot.val().trainName;
  var DBtrainDestination = childSnapshot.val().trainDestination;
  var DBfirstTrain = childSnapshot.val().firstTrain;
  var DBtrainFrequency = childSnapshot.val().trainFrequency;

  var nextTrain;
  var minutesAway;




  console.log("DBfirstTrain: " + DBfirstTrain)
  // write on table
  var newRow = $("<tr>").append(
    $("<td>").text(DBtrainName),
    $("<td>").text(DBtrainDestination),
    $("<td>").text(DBtrainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
  );
  
  $("tbody").append(newRow)



});
