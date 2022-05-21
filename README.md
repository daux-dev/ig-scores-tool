# ig-scores-tool
Simple tool I made for use at a local arcade gaming club to display easily updateable scoreboards and other info during a livestream.

Starts a HTTP server on port 3000. The interface at `localhost:3000/admin` is used to change player and commentator names aswell as scores and other settings on the server.

`localhost:3000/themes/scores` and `localhost:3000/themes/intermission` will poll the server and update accordingly. They are to be used as browser-sources in OBS at a resolution of 1920x1080.

This lets me create stream overlays with scoreboards and other info that can easily be updated from any device in the local network.

Example stream vods where this was used with different themes and graphics:

https://www.youtube.com/playlist?list=PLwdsFw5xWion05SGcIgVuFJnbSwIqj74x

Included in this repo are only 2 example themes without any graphics. One example for intermission info and one for a scoreboard.
