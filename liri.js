// All required node packages
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
// Spotify Keys from .env file
var spotify = new Spotify(keys.spotify);
// process.argv
var nargs = process.argv;
var searchType = nargs[2];
var userInput = nargs[3];

// Choose which function runs based on the searchType
function switchCase() {
    switch (searchType) {
        case "concert-this":
            concertThis(userInput);
            break;
        case "spotify-this-song":
            spotifyThisSong(userInput);
            break;
        case "movie-this":
            movieThis(userInput);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Just enter it in the way your supposed to!");
    }
};

// Bands in Town 
function concertThis() {
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
                console.log("Show Date: " + moment(response.data[i].datetime).format("MM/DD/YY"));
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            };
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

// Spotify
var songName = "";
if (userInput === undefined) {
    songName = "ace of base, the sign";
} else {
    for (var i = 3; i < nargs.length; i++) {
        if (i > 3 && i < nargs.length) {
            songName = songName + "+" + nargs[i];
        } else {
            songName += nargs[i];
        }
    }
};
function spotifyThisSong() {
    spotify.search({
        type: "track",
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        // console.log(data.tracks.items);
        console.log("\n=================================================\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[3].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n=================================================\n");
    });
};

//OMDB
function movieThis() {
    var movie = "";
    if (userInput === undefined) {
        movie = "Mr. Nobody";
    } else {
        for (var i = 3; i < nargs.length; i++) {
            if (i > 3 && i < nargs.length) {
                movie = movie + "+" + nargs[i];
            } else {
                movie += nargs[i];
            }
        }
    };
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function (response) {
            console.log("\n=================================================\n");
            console.log("Title: " + response.data.Title);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("\n=================================================\n");
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

//Do what it says
function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            console.log(error);
        };
        var dataArr = data.split(",");
        // if (dataArr[0] === "spotify-this-song") {
            var randomSong = dataArr[1].slice(1, -1);
            songName = randomSong;
            spotifyThisSong(randomSong);
        // }
    });
};

// Run the switch case function
switchCase();