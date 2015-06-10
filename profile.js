var http = require("http");

function printMessage(username, badgeCount, points, totalpoints) {
  var message = username + " has " + badgeCount + " total badge(s), " + points + " points in Javascript and " + totalpoints + " total points";
  console.log(message);
};

function printError(error) {
  console.log("Got error: " + error.message);
};

function get(username) {
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
      response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript, profile.points.total);
        } catch(error) {
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      };
    });
  });
};

module.exports.get = get;