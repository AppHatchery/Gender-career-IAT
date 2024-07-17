define(["pipAPI"], function (APIConstructor) {
  let API = new APIConstructor();
  let global = API.getGlobal();
  let score = global.iat;

  API.addSettings("hooks", {
    endTask: function () {
      console.log("Task ended, starting score calculation...");
      // Get the global variable
      // var rawData = API.getGlobal().rawData;

      // Calculate the D-score here using rawData
      // var D_score = calculateDScore(rawData);
      // console.log('D-score calculated:', D_score);

      // Use a timeout to ensure the display happens after the final screen
      setTimeout(function () {
        displayScore(score);
      }, 500); // Adjust this timeout as needed
    },
  });

  return API.script;
});

function calculateDScore(rawData) {
  console.log("Calculating D-score with rawData:", rawData);
  // Filter rawData for the blocks you need to calculate the D-score
  var block1Data = rawData.filter((trial) => trial.block === "B1");
  var block2Data = rawData.filter((trial) => trial.block === "B2");

  // Extract response times
  var block1RTs = block1Data.map((trial) => trial.responseTime);
  var block2RTs = block2Data.map((trial) => trial.responseTime);

  // Calculate means and standard deviations
  var mean1 = average(block1RTs);
  var mean2 = average(block2RTs);
  var std1 = standardDeviation(block1RTs);
  var std2 = standardDeviation(block2RTs);

  // Calculate pooled standard deviation
  var stdPooled = Math.sqrt((std1 ** 2 + std2 ** 2) / 2);

  // Calculate D-score
  var D_score = (mean1 - mean2) / stdPooled;
  return D_score;
}

function average(data) {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function standardDeviation(data) {
  var avg = average(data);
  var squareDiffs = data.map((value) => (value - avg) ** 2);
  var avgSquareDiff = average(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

function displayScore(score) {
  console.log("Displaying D-score:", score);
  // Create an HTML element to display the D-score
  var scoreDisplay = document.createElement("div");
  scoreDisplay.innerText = "IAT D-score: " + score.d;
  scoreDisplay.style.position = "fixed";
  scoreDisplay.style.top = "50%";
  scoreDisplay.style.left = "50%";
  scoreDisplay.style.transform = "translate(-50%, -50%)";
  scoreDisplay.style.fontSize = "5em";
  scoreDisplay.style.color = "#000";
  scoreDisplay.style.textAlign = "center";
  scoreDisplay.style.zIndex = "9999";
  scoreDisplay.style.backgroundColor = "white"; // To ensure readability

  // Append the element to the body
  document.body.appendChild(scoreDisplay);

  // Can be removed if not needed
  var feedback = document.createElement("div");
  feedback.innerText = score.feedback;
  feedback.style.position = "fixed";
  feedback.style.top = "calc(50% + 3em)"; // Adjust the top position to be below the score display
  feedback.style.left = "50%";
  feedback.style.transform = "translate(-50%, -50%)";
  feedback.style.fontSize = "2em";
  feedback.style.color = "#000";
  feedback.style.textAlign = "center";
  feedback.style.zIndex = "9999";
  feedback.style.backgroundColor = "white"; // To ensure readability

  // Append the additional text element to the body
  document.body.appendChild(feedback);
}
