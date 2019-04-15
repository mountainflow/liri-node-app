// All required node packages
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotfi = require("node-spotify-api");
// Spotify Keys from .env file
//var spotify = new Spotify(keys.spotify);
// Uses the fs package to run pre-set(in the keys.js file) commands
// var keys = require("./keys.js");

// process.argv
var nargs = process.argv;
var searchType = nargs[2];
var userInput = nargs[3];

// Choose which function runs based on the searchType
function switchCase() {
    switch (searchType) {
        case 'concert-this':
            bandsInTown(userInput);
            break;
        case 'spotify-this-song':
            spotifySong(userInput);
            break;
        case 'movie-this':
            omdbInfo(userInput);
            break;
        case 'do-what-it-says':
            getRandom();
            break;
        default:
            console.log("Just enter it in the way your supposed to!");
    }
};

// Bands in Town 
function bandsInTown() {
    var artist = "";
    // Able to use multiple words for userInput
    for (var i = 3; i < nargs.length; i++) {
        if (i > 3 && i < nargs.length) {
            artist = artist + "+" + nargs[i];
        } else {
            artist += nargs[i];
        }
    };
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function (response) {
            console.log("\nArtist: " + artist);
            for (i = 0; i < response.data.length; i++) {
                console.log("\n=================================================\n");
                console.log("Show Date: " + response.data[i].datetime);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            };
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

switchCase();