'use strict';

const express = require("express");
const fs = require("fs");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/gsap', express.static(__dirname + '/node_modules/gsap/dist')); // redirect gsap

app.use(express.static("./"));

var overlayContent = {};

fs.readFile("./data.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        overlayContent = JSON.parse(data);
    }
});

app.post("/submit", (req, res) => {
    fs.writeFile("./data.json", JSON.stringify(req.body, null, 2), () => {
        console.log("DATA: " + JSON.stringify(req.body, null, 2));
        console.log("REFERER: " + req.headers.referer);
        overlayContent = req.body;
        res.redirect(req.headers.referer);
    });
});

app.get("/data", (req, res) => {
    res.send(JSON.stringify(overlayContent));
});

app.listen(3000, () => {
    console.log("Overlay server running on port 3000");
});