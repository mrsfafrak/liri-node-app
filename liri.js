// required packages
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
const chalk = require('chalk');
var moment = require('moment');
var fs = require("fs");

var action = process.argv[2];

var song;
var movie;
var band;

// condition for if "do-what-it-says" is entered
if (action === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var action = dataArr[0];

        if (action === "concert-this") {
            band = dataArr[1];
            bands();
        }
        else if (action === "spotify-this-song") {
            song = dataArr[1];
            spot();
        }
        else if (action === "movie-this") {
            movie = dataArr[1];
            ombd();
        }
    });
}
// condition for if "concert-this" is entered (uses BandInTown API with axios)
else if (action === "concert-this") {
    band = process.argv.slice(3).join(" ");
        bands();
}
// condition for if "spotify-this-song" is entered (uses Spotify API)
else if (action === "spotify-this-song") {
    song = process.argv.slice(3).join(" ");
    spot();
}
// condition for if "movie-this" is entered (uses OMBI API with axios)
else if (action === "movie-this") {
    movie = process.argv.slice(3).join(" ");
    ombd();
}

// FUNCTIONS USED ABOVE
function bands() {
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data == 'undefined' || response.data == "") {
                console.log(chalk.red("Sorry, no info on " + band))
            }
            else {
                console.log(chalk.bold.red(band + "'s upcoming shows: "));
                for (var i = 0; i < response.data.length; i++) {
                    var venueName = response.data[i].venue.name;
                    var venueLocationCity = response.data[i].venue.city;
                    var venueLocationCountry = response.data[i].venue.country;
                    var showTime = response.data[i].datetime;
                    var newShowTime = moment(showTime).format("MM/DD/YYYY");
                    console.log(chalk.bold.blue("====================================="));
                    console.log(chalk.bold("Venue name: ") + venueName);
                    console.log(chalk.bold("Venue location: ") + venueLocationCity + ", " + venueLocationCountry);
                    console.log(chalk.bold("Time & Date: ") + newShowTime);
                }
            };
        });
}
function spot() {
    if (song === "") {
        spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(chalk.red.bold("You didn't put in a song so here is a classic: "));
            console.log(chalk.bold.magenta("==================================="));
            console.log(chalk.bold("Artist: ") + data.tracks.items[9].artists[0].name);
            console.log(chalk.bold("Song Name: ") + chalk.italic(data.tracks.items[9].name));
            console.log(chalk.bold("Preview link: ") + data.tracks.items[9].preview_url);
            console.log(chalk.bold("Album Name: ") + data.tracks.items[9].album.name);
            console.log(chalk.bold.magenta("==================================="));
        });
    }
    else {
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log(chalk.bold.magenta("==================================="));
                if (data.tracks.items[i].artists.length > 0) {
                    var artist = "";
                    for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
                        artist += data.tracks.items[i].artists[j].name + ", "
                    }
                }
                else if (data.tracks.items[i].artists.length === 0) {
                    var artist = data.tracks.items[i].artists[0].name;
                }
                console.log(chalk.bold("Artist: ") + artist);
                console.log(chalk.bold("Song Name: ") + chalk.italic(data.tracks.items[i].name));
                console.log(chalk.bold("Preview link: ") + data.tracks.items[i].preview_url);
                console.log(chalk.bold("Album Name: ") + data.tracks.items[i].album.name);
            }
        });
    }
}
function ombd() {
    if (movie === "") {
        axios.get("http://www.omdbapi.com/?t=Mr._Nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                var title = response.data.Title;
                var year = response.data.Year;
                var imdbRating = response.data.Ratings[0].Value;
                var rottenRating = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;
                console.log(chalk.bold.red("====================================="));
                console.log(chalk.bold.red("You didn't enter a movie so here's some info on the movie Mr. Nobody:"));
                console.log(chalk.bold("Title: ") + title);
                console.log(chalk.bold("Year Released: ") + year);
                console.log(chalk.bold("IMDB Rating: ") + imdbRating);
                console.log(chalk.bold("Rotten Tomatoes Rating: ") + rottenRating);
                console.log(chalk.bold("Country: ") + country);
                console.log(chalk.bold("Language(s): ") + language);
                console.log(chalk.bold("Plot Summary: ") + plot);
                console.log(chalk.bold("Actors: ") + actors);
                console.log(chalk.bold.red("====================================="));
            }
            );
    }
    else {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                if (response.data.Error === "Movie not found!") {
                    console.log(chalk.bgRed.bold("Movie not found! Try again or check your spelling!"));
                }
                else {
                    var title = response.data.Title;
                    var year = response.data.Year;
                    var imdbRating = response.data.Ratings[0].Value;
                    var rottenRating = response.data.Ratings[1].Value;
                    var country = response.data.Country;
                    var language = response.data.Language;
                    var plot = response.data.Plot;
                    var actors = response.data.Actors;
                    console.log(chalk.bold.blue("====================================="));
                    console.log(chalk.bold.blue("Information on the movie you entered:"));
                    console.log(chalk.bold("Title: ") + title);
                    console.log(chalk.bold("Year Released: ") + year);
                    console.log(chalk.bold("IMDB Rating: ") + imdbRating);
                    console.log(chalk.bold("Rotten Tomatoes Rating: ") + rottenRating);
                    console.log(chalk.bold("Country: ") + country);
                    console.log(chalk.bold("Language(s): ") + language);
                    console.log(chalk.bold("Plot Summary: ") + plot);
                    console.log(chalk.bold("Actors: ") + actors);
                    console.log(chalk.bold.blue("====================================="));
                };
            }
            );
    };
}