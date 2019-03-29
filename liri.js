// required packages
require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
const chalk = require('chalk');
var moment = require('moment');

var action = process.argv[2];

// condition for if "concert-this" is entered (uses BandInTown API with axios)
if (action === "concert-this") {
    var band = process.argv.slice(3).join(" ");
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
        }
        );
}
else if (action === "spotify-this-song") {



}
// condition for if "movie-this" is entered (uses OMBI API with axios)
else if (action === "movie-this") {
    var movie = process.argv.slice(3).join(" ");
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
else if (action === "do-what-it-says") {




}



