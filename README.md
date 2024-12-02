# ig-scores-tool
tool for controlling names, scores etc. during fighting game live streams made for **Insert Game**.

setup:
1. install nodejs
2. unpack archive
3. run `npm install` in root directory

run `node app.js` in root directory to start the server

Usage example once the server is running:
- Visit `http://localhost:3000` for an overview of themes, control panels and other stuff.
- Add `http://localhost:3000/themes/generic/scores` as a 1920x1080 browser source in OBS
- Visit `http://localhost:300/controls/default` to control what is shown on stream.
- Check out other control panels and themes in `themes/` and `controls/`
