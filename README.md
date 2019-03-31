# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

# Usage
By entering specific commands in the command line, the user can employ the use of Spotify, Bands in Town and OMBD to conduct various searches.

Be sure to run "npm install" in command line before attempting the following prompts.

### Bands In Town
To look up the next concerts for a band or artist, use the following syntax in your command line:

node liri.js concert-this <artist/band name here>


### Spotify
To look up information on a song, use the following syntax in your command line:

node liri.js spotify-this-song <song name here>

Examples:
![artist example](/assets/images/concert-this_carrie.png)

![band example](/assets/images/concert-this_metallica.png)

### OMBD
To look up information on a movie, use the following syntax in your command line:

node liri.js movie-this <movie name here>


### Do What It Says
The syntax below will take in the text from the random.txt file and process it similiarly to the commands above:

node liri.js do-what-it-says






