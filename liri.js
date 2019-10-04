require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");

var axios = require("axios");
var fs = require("fs");
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
    
    var concertURL = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp"

    axios.get(concertURL).then(function (response){
      // var array = JSON.stringify(response)      
          console.log(response.data[1].venue.name)
          console.log(response.data[1].venue.city)
          var date = (response.data[1].datetime)
          console.log(date)
          // console.log("Location" + response.data[0].venue.city + "," + response.data.venue.country)
    })  
}

function omdbAPI(){
  if (userQuery === undefined) {
    userQuery = "Mr. nobody";
  };
  var omdbURL = "http://www.omdbapi.com/?t=" + userQuery + "&apikey=2c69a114"
  axios.get(omdbURL).then(function (response){
    console.log(response.data.Title)
    console.log(response.data.Released)
    console.log(response.data.imdbRating)
    console.log(response.data.Ratings[1])
    console.log(response.data.Language)
    console.log(response.data.Plot)
    console.log(response.data.Actors)
})
}

function doWhat() { 
  fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
          return console.log(error);      }
    
      var data = data.split(",");     
      userInput = data[0];
      userQuery = data[1];     
      userinput(userInput, userQuery);
  });
};



// user input 
  var userinput = function(userInput){
      switch (userInput) {
          case "spotify-this-song":
            spotifySong();
          break;
          case "concert-this":
            concertThis();
          break;
          case "movie-this":
            omdbAPI();
          break;
          case "do-what-it-says":
            doWhat();
          break;

          default:
    console.log(`I'm sorry!`)
}
      }
  userinput(userInput, userQuery)
 