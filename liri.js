





require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);

 spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
     if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
   });

