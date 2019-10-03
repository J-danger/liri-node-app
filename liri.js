require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");
let request = require("request");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);

let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

// spotify API call
var spotifySong = function() {
    if (userQuery === undefined) {
      userQuery = "The Sign";
    }
    spotify.search(
      {
        type: "track",
        query: userQuery,
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

  function concertThis(){
    
    var queryURL = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp"

    request(queryURL, function(response){
      let array = JSON.parse();
    console.log("Venue: " + array.data[0].venue.name)
    if (region === ""){
      console.log("Location" + array.data[0].venue.city + "," + array.data.venue.country)
    } else {
      console.log("Location" + city + "," + region)
    }
    var eventDate = moment(array.data[0].datetime).format('MM/DD/YYYY');
    console.log("Date of the Event:", eventDate);

  })
}



// user input 
  var userinput = function(userInput, userQuery){
      switch (userInput) {
          case "spotify-this-song":
            spotifySong();
          break;
          case "concert-this":
            concertThis();
          break;
      }
  }

  userinput(userInput, userQuery)
  // var command = function(targetAPI, pickSong) {
  //   userinput(targetAPI, pickSong);
  // }
  
  //   command(process.argv[2], process.argv[3]);