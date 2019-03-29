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
        console.log("Mr. Nobody");
        // fill in data
    }
    else {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var title = response.data[i].Title;
                    var year =response.data[i].Year;
                    var imdbRating =response.data[i].Ratings[0].Value;
                    var rottenRating =response.data[i].Ratings[1].Value;
                    var country =response.data[i].Country;
                    var language =response.data[i].Language;
                    var plot =response.data[i].plot;
                    var actors =response.data[i].Actors;
                    console.log(title + year+ imbdRating+rottenRating+country+language+plot+actors);
                }
                // console.log("The movie's rating is: " + response.data.imdbRating);
            }
            );
    }
}
else if (action === "do-what-it-says") {




}



