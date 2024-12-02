const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/gsap', express.static(__dirname + '/node_modules/gsap/dist')); // redirect gsap

app.use(express.static("./"));

const port = 3000;

var overlayContent = {};
var charsets_available = [];
var chars = [];
var themes = [];

/* read directories in chars directory on startup */
fs.readdir(path.join(__dirname, "chars"), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        charsets_available = files;
    }
});

/* list theme directories for reference purposes*/

const findThemes = (dir, depth) => {
    fs.readdir(path.join(depth, dir), (err, dirContents) => {
        if (dirContents) {
            //console.log(dirContents);
            if (dirContents.includes("index.html")) {
                //console.log(path.join(depth, dir));
                themes.push(path.join(depth, dir).replace(__dirname, "http://localhost:" + port));
                //console.log(themes);
            }
            //if (dirContents.length > 0) {
                dirContents.forEach((item, i) => {
                    findThemes(item, path.join(depth, dir));
                });
            //}
        }

    });
};

findThemes("themes", __dirname);

fs.readFile("./data.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        overlayContent = JSON.parse(data);
        overlayContent.charsets_available = charsets_available;
        overlayContent.themes = themes;


        if (overlayContent.charset_selected != "off") {
            fs.readdir(path.join(__dirname, "chars", overlayContent.charset_selected), (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    chars = files;
                    overlayContent.chars = chars;
                }
            });
        }

    }
});

app.post("/submit", (req, res) => {
    /* read selected charset directory if not off*/
    if (req.body.charset_selected != "off") {
        fs.readdir(path.join(__dirname, "chars", req.body.charset_selected), (err, files) => {
            if (err) {
                console.log(err);
            } else {
                chars = files;
            }
        });
    } else {
        chars = [];
    }

    fs.writeFile("./data.json", JSON.stringify(req.body, null, 2), () => {
        overlayContent = req.body;
        overlayContent.charsets_available = charsets_available;
        overlayContent.chars = chars;
        overlayContent.themes = themes;
        console.log(overlayContent);
        res.redirect(req.headers.referer);
    });
});

app.get("/data", (req, res) => {
    res.send(JSON.stringify(overlayContent));
});

// use like this: /getchars/?charset=vf5
app.get("/getchars", (req, res) => {
    const charset = req.query.charset;
    fs.readdir(path.join(__dirname, "chars", charset), (err, files) => {
        if (err) {
            console.log(err);
            res.send(JSON.stringify([]));
        } else {
            res.send(JSON.stringify(files));
        }
    });

});

app.listen(port, () => {
    console.log("OVERLAY SERVER ACTIVE");
    console.log("http://localhost:" + port);
});
