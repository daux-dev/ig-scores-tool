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

var overlayContent = {};
var charsets_available = []; 
var chars = [];

fs.readdir(path.join(__dirname, "chars"), (err, files) => {
    if (err) {
        console.log(err);
    } else {
        charsets_available = files;
    }
});

fs.readFile("./data.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        overlayContent = JSON.parse(data);
        overlayContent.charsets_available = charsets_available;

        fs.readdir(path.join(__dirname, "chars", overlayContent.charset_selected), (err, files) => {
            if (err) {
                console.log(err);
            } else {
                chars = files;
                overlayContent.chars = chars;
                // console.log(files);
            }
        });

    }
});



app.post("/submit", (req, res) => {

    fs.readdir(path.join(__dirname, "chars", req.body.charset_selected), (err, files) => {
        if (err) {
            console.log(err);
        } else {
            chars = files;
            // console.log(files);
        }
    });

    fs.writeFile("./data.json", JSON.stringify(req.body, null, 2), () => {
        console.log("DATA: " + JSON.stringify(req.body, null, 2));
        console.log("REFERER: " + req.headers.referer);
        overlayContent = req.body;
        overlayContent.charsets_available = charsets_available;
        overlayContent.chars = chars;
        res.redirect(req.headers.referer);
    });
});

app.get("/data", (req, res) => {
    res.send(JSON.stringify(overlayContent));
});

app.listen(3000, () => {
    console.log("Overlay server running on port 3000");
});