$( () => {

    /* returns path to winning player character */
    const getWinnerImg = (data) => {
        if (data.p1_score >= data.p2_score) {
            return "chars/" + data.charset_selected + "/" + data.p1_char;
        } else {
            return "chars/" + data.charset_selected + "/" + data.p2_char;
        }
    }

    const getWinnerName = (data) => {
        if (data.p1_score >= data.p2_score) {
            return data.p1_name;
        } else {
            return data.p2_name;
        }
    }

    /* INITIAL DATA LOAD */
    $.getJSON("/data", data => {       
        /* change image to that of winning player character */
        $("#img_winner_char").css("background-image", "url(/" + getWinnerImg(data) + ")");

        /* read text file with character quotes based on image file name e.g. millia.png => millia.png.txt */
        $.get("/" + getWinnerImg(data) + ".txt", function(txt) {
            const quotes = txt.split(/\r?\n/);                                      //split txt by newline into quotes array
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];  //select a random quote
            $("#char_quote").text(randomQuote);                                     //changing character quote to random quote from the text file
            console.log(txt.split(/\r?\n/));
        }, 'text');

        $(".playername").text(getWinnerName(data));

        /* update classes that match keys in requested data */
        Object.entries(data).forEach(keyValuePair => {
            // console.log(keyValuePair);
            $("."+keyValuePair[0]).text(keyValuePair[1]);
        });

        // const desc1 = data.stage_desc.split("&")[0].trim();
        // const desc2 = data.stage_desc.split("&")[1].trim();
        // $(".stage_desc1").text(desc1);
        $(".stage_desc2").text(data.stage_desc);

        if (data.p1_score >= data.p2_score) {
            $(".winscore").text(data.p1_score + ":" + data.p2_score);
        } else {
            $(".winscore").text(data.p2_score + ":" + data.p1_score);
        }

    });

    /* DATA UPDATE POLLING */
    setInterval(() => {
        $.getJSON("/data", data => {
            /* change character image and quote if change is detected  */
            if ($("#img_winner_char").css("background-image") != 'url("http://localhost:3000/' + getWinnerImg(data) + '")') {
                $("#img_winner_char").css("background-image", "url(/" + getWinnerImg(data) + ")");

                /* remove previous character quote in case no new quote file is found or available */
                $("#char_quote").text("");

                /* reading text file containing character quotes based on image file name e.g. millia.png => millia.png.txt */
                $.get("/" + getWinnerImg(data) + ".txt", function(txt) {
                    const quotes = txt.split(/\r?\n/);                                      //split txt by newline into quotes array
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];  //select a random quote
                    $("#char_quote").text(randomQuote);                                     //changing character quote to random quote from the text file
                }, 'text');
            }
            if ($(".playername").text() != getWinnerName(data)) {
                $(".playername").text(getWinnerName(data));
            }

            // const desc1 = data.stage_desc.split("&")[0].trim();
            // const desc2 = data.stage_desc.split("&")[1].trim();
            // if ($(".stage_desc1").text() !== desc1) {
            //     animFadeDown(".stage_desc1", desc1);
            // }
            if ($(".stage_desc2").text() !== data.stage_desc) {
                animFadeDown(".stage_desc2", data.stage_desc);
            }
            if (data.p1_score >= data.p2_score) {
                $(".winscore").text(data.p1_score + ":" + data.p2_score);
            } else {
                $(".winscore").text(data.p2_score + ":" + data.p1_score);
            }
        });
    }, 2000);
});

    /* UPDATE TEXT FUNCTION FOR GSAP CALLBACKS*/
function updateText(el, text) {
    $(el).text(text);
    console.log(el + " updated to " + text);
}

    /* DETERMINE WINNER AND LOSER */
function getResults(p1score, p2score, p1name, p2name) {
    return {
        winner: (parseInt(p1score) > parseInt(p2score)) ? [p1name, p1score] : [p2name, p2score],
        loser: (parseInt(p1score) < parseInt(p2score)) ? [p1name, p1score] : [p2name, p2score],
    }
}

    /* CONTENT UPDATE ANIMATIONS */
function animScaleY(el, text) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {scaleY: 0, onComplete: updateText, onCompleteParams: [el, text]})
        .to(el, {scaleY: 1, onComplete: () => {},}, "+=0.5");
}

function animFadeDown(el, text) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {opacity: 0, y: 5, onComplete: updateText, onCompleteParams: [el, text]})
        .set(el, {y: -5})
        .to(el, {opacity: 1, y: 0, onComplete: () => {},}, "+=0.5");
}

function animFadeRight(el, text) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {opacity: 0, x: 5, onComplete: updateText, onCompleteParams: [el, text]})
        .set(el, {x: -5})
        .to(el, {opacity: 1, x: 0, onComplete: () => {},}, "+=0.5");
}

function animFadeLeft(el, text) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {opacity: 0, x: -5, onComplete: updateText, onCompleteParams: [el, text]})
        .set(el, {x: 5})
        .to(el, {opacity: 1, x: 0, onComplete: () => {},}, "+=0.5");
}

function animFadeLeftColor(el, text, result, data) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {opacity: 0, x: -5, onComplete: updateText, onCompleteParams: [el, text]})
        .set(el, {x: 5})
        .set(el, {color: result.winner[0] === data.p1_name ? "red" : "blue"})
        .to(el, {opacity: 1, x: 0, onComplete: () => {},}, "+=0.5");
}

function animFadeLeftFontSize(el, text, size) {
    gsap.timeline({defaults: {duration: 0.5}})
        .to(el, {opacity: 0, x: -5, onComplete: updateText, onCompleteParams: [el, text]})
        .set(el, {x: 5})
        .set(el, {fontSize: size})
        .to(el, {opacity: 1, x: 0, onComplete: () => {},}, "+=0.5");
}