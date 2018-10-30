require("dotenv").config();

const keys = require("./keys.js")
var request = require("request");
var moment = require('moment');
const Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify)



// console.log(spotify.spotify)
var action = process.argv[2];
var nodeArgs = process.argv;


switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotifyy();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        dwis();
        break;
}


function concert() {
    var artist = ""

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            artist = artist + "+" + nodeArgs[i];

        }

        else {

            artist += nodeArgs[i];

        }
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    request(queryURL, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            
            
            
            for (var j = 0; j < body.length; j++) {
                
                var res = JSON.parse(body)
     


                console.log("---------------")
                console.log("Venue Name: " + res[j].venue.name)
                console.log("Venue Location: " + res[j].venue.city + ", " + res[j].venue.region + ", " + res[j].venue.country)
                console.log("Date of event: " + moment(res[j].datetime).format("MM/DD/YYYY"))
               


            }


        }
    });

}

function movie() {
    var movieName = ""

    if (process.argv.length > 3) {

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    }

}

else {
    movieName = "Mr.nobody"
}


    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName

    request(queryURL, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            var res = JSON.parse(body)


            console.log("---------------")
            console.log("Title: " + res.Title)
            console.log("Year: " + res.Year)
            console.log("IMDB Rating: " + res.imdbRating)
            console.log("Rotten Tomatoes Rating: " + res.Ratings[1].Value)
            console.log("Country: " + res.Country)
            console.log("Language: " + res.Language)
            console.log("Plot: " + res.Plot)
            console.log("Actors: " + res.Actors)



        }
    });

}

function spotifyy() {

    var songName = ""
    var artist = ""

    if (process.argv.length > 3) {


        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                songName = songName + "+" + nodeArgs[i];

            }

            else {

                songName += nodeArgs[i];

            }
        }


            spotify
                .request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=1')
                .then(function (data) {

                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name)
                    console.log("Album Name: " + data.tracks.items[0].album.name)

                    console.log("Preview link: " + data.tracks.items[0].preview_url)
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                })
        
    }

    else {

        songName = "the sign"
        artist = "Ace of Base"

        spotify
            .request('https://api.spotify.com/v1/search?q=track:' + songName + '%20artist:' + artist + '&type=track&limit=1')
            .then(function (data) {

                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name)
                console.log("Album Name: " + data.tracks.items[0].album.name)

                console.log("Preview link: " + data.tracks.items[0].preview_url)
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }

}



function dwis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }


        var dataArr = data.split(",");

        spotify
            .request('https://api.spotify.com/v1/search?q=track:' + dataArr[1] + '&type=track&limit=1')
            .then(function (data) {

                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name)
                console.log("Album Name: " + data.tracks.items[0].album.name)

                console.log("Preview link: " + data.tracks.items[0].preview_url)
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });


    });
} 