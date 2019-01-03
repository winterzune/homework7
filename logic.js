<script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDuF4m4A6mIwO2SyQeA2D_VE6HVoPOEExA",
      authDomain: "train-e7300.firebaseapp.com",
      databaseURL: "https://train-e7300.firebaseio.com",
      projectId: "train-e7300",
      storageBucket: "",
      messagingSenderId: "1022816176764"
    };
    firebase.initializeApp(config);

    var trainData = firebase.database();

    $("#add-train-btn").on("click", function() {

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
      
       
        var newTrain = {
      
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
        };
      
    
        trainData.ref().push(newTrain);
      
        // Alert
        alert("Train successfully added");
      
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
      
       
        return false;
      });
      
      trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
      
        console.log(childSnapshot.val());
      
       
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tFirstTrain = childSnapshot.val().firstTrain;
      
        var timeArr = tFirstTrain.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
        var maxMoment = moment.max(moment(), trainTime);
        var tMinutes;
        var tArrival;
      
       
        if (maxMoment === trainTime) {
          tArrival = trainTime.format("hh:mm A");
          tMinutes = trainTime.diff(moment(), "minutes");
        } else {
      
        
          var differenceTimes = moment().diff(trainTime, "minutes");
          var tRemainder = differenceTimes % tFrequency;
          tMinutes = tFrequency - tRemainder;
          
          tArrival = moment().add(tMinutes, "m").format("hh:mm A");
        }
        console.log("tMinutes:", tMinutes);
        console.log("tArrival:", tArrival);
      
        
        $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
                tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
      });