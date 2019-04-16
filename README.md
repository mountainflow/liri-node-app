# LIRI Bot

## Search for concerts, songs, and movies!

Liri is a CLI app that uses the Bands In Town API, Spotify, and OMDB to search for your favorite media.

Use these commands for it to work:

* **node liri.js concert-this `<artist/band name here>`**
    * Get upcoming concert information from Bands In Town including:
        * Venue name
        * Location
        * Date
* **node liri.js spotify-this-song `<song name here>`**
    * Get information on any song including:
        * Artist
        * Song name
        * A preview link of the song from Spotify
        * The album that the song is from
    * If no song is provided then the program will default to "The Sign" by Ace of Base
* **node liri.js movie-this `<movie name here>`**
    * Get information on any movie including:
        * Title of the movie
        * Year the movie came out
        * IMDB Rating of the movie
        * Rotten Tomatoes Rating of the movie
        * Country where the movie was produced
        * Language of the movie
        * Plot of the movie
        * Actors in the movie
    * If no title is provided, the program will default to "Mr. Nobody"
* **node liri.js do-what-it-says**
    * runs `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

## Here's a quick video on how it works:


![](liri.gif)



