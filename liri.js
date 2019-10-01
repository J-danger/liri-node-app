





require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);

var callAPI = function(songName) {
    if (songName === undefined) {
      songName = "The Sign";
    }
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 3
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log("Artist: " + songs[i].artists[0].name);
          console.log("Song: " + songs[i].name);         
          console.log("Song Preview: " + songs[i].preview_url);
          console.log("Album: " + songs[i].album.name);                   
          console.log("----------------------------------------------------");
        }
      }
    );
  };

  var userinput = function(caseData, functionData){
      switch (caseData) {
          case "spotify-this-song":
          callAPI(functionData);
          break;
      }
  }
  var command = function(targetAPI, pickSong) {
    userinput(targetAPI, pickSong);
  }
  
    command(process.argv[2], process.argv[3]);
  