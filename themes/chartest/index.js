$( () => {

    const getWinnerImg = (data) => {
        if (data.p1_score >= data.p2_score) {
            return "chars/" + data.charset_selected + "/" + data.p1_char;
        } else {
            return "chars/" + data.charset_selected + "/" + data.p2_char;
        }
}

    /* FIRST DATA LOAD */
    $.getJSON("/data", data => {       
        // console.log(getWinnerImg(data));
        $("#img_winner_char").css("background-image", "url(/" + getWinnerImg(data) + ")");






        const max_score = parseInt(data.max_score);

        Object.entries(data).forEach(keyValuePair => {
            console.log(keyValuePair);
            $("."+keyValuePair[0]).text(keyValuePair[1]);
        });

        const result = getResults(data.p1_score, data.p2_score, data.p1_name, data.p2_name);
        $(".winner").text(result.winner[0]);
        $(".loser").text(result.loser[0]);
        $(".winner").css("color", (result.winner[0] === data.p1_name) ? "red" : "blue");
        $(".loser").css("color", (result.loser[0] === data.p1_name) ? "red" : "blue");
        $(".resultsHeading").text(result.winner[1] >= max_score ? "WINNER" : "GAME IN PROGRESS");
        $(".resultsHeading").css("font-size", result.winner[1] >= max_score ? "72px" : "62px");
        
        $(".p1").text(data.p1_name);
        $(".p2").text(data.p2_name);

        if (data.p1_next === "" && data.p2_next === "") {
            $(".vsnext").text("");
        }

        if (parseInt(data.p1_score) >= parseInt(data.max_score)) {
            $(".p1_score").addClass("win");
            $(".p1_name").addClass("win");

            $(".verdict").text("Aftermath");
        } else {
            $(".verdict").text("Mad struggle");
        }
        if (parseInt(data.p2_score) >= parseInt(data.max_score)) {
            $(".p2_score").addClass("win");
            $(".p2_name").addClass("win");

            $(".verdict").text("Aftermath");
        } else {
            $(".verdict").text("Mad struggle");
        }

        $(".format_name").text("FIRST TO " + data.max_score);
    });

    /* DATA UPDATE POLLING */
    setInterval(() => {
        $.getJSON("/data", data => {
            /* change background image if  */
            if ($("#img_winner_char").css("background-image") != 'url("http://localhost:3000/' + getWinnerImg(data) + '")') {
                $("#img_winner_char").css("background-image", "url(/" + getWinnerImg(data) + ")");
            }



            /* const max_score = parseInt(data.max_score)

            if ($(".p1_name").text() !== data.p1_name) {
                animFadeLeft(".p1_name", data.p1_name);
            }
            if ($(".p2_name").text() !== data.p2_name) {
                animFadeRight(".p2_name", data.p2_name);
            }
            if ($(".p1_next").text() !== data.p1_next) {
                animFadeLeft(".p1_next", data.p1_next);
            }
            if ($(".p2_next").text() !== data.p2_next) {
                animFadeRight(".p2_next", data.p2_next);
            }
            if ($(".p1_score").text() !== data.p1_score) {
                animFadeDown(".p1_score", data.p1_score);
            }
            if ($(".p2_score").text() !== data.p2_score) {
                animFadeDown(".p2_score", data.p2_score);
            }
            if ($(".commentary").text() !== data.commentary) {
                animFadeRight(".commentary", data.commentary);
            }
            if (data.p1_next === "" && data.p2_next === "" && $(".vsnext").text() !== "") {
                animFadeDown(".vsnext", "");
            } else if (data.p1_next !== "" && data.p2_next !== "" && $(".vsnext").text() !== " vs ") {
                animFadeDown(".vsnext", " vs ");
            }
            
            const result = getResults(data.p1_score, data.p2_score, data.p1_name, data.p2_name);

            if (parseInt(data.p1_score) >= parseInt(data.max_score)) {
                $(".p1_score").addClass("win");
                $(".p1_name").addClass("win");
            } else {
                $(".p1_score").removeClass("win");
                $(".p1_name").removeClass("win");
            }
            if (parseInt(data.p2_score) >= parseInt(data.max_score)) {
                $(".p2_score").addClass("win");
                $(".p2_name").addClass("win");
            } else {
                $(".p2_score").removeClass("win");
                $(".p2_name").removeClass("win");
            }

            if (parseInt(data.p2_score) >= parseInt(data.max_score) || parseInt(data.p1_score) >= parseInt(data.max_score)) {
                if ($(".verdict").text() !== "Aftermath") {
                    animFadeLeft(".verdict", "Aftermath");
                }
            } else {
                if ($(".verdict").text() !== "Mad struggle") {
                    animFadeLeft(".verdict", "Mad struggle");
                }
            } */

            /* if ($(".format_name").text() !== "FIRST TO " + data.max_score) {
                animFadeDown(".format_name", "FIRST TO " + data.max_score);
            } */
        });
    }, 2000);
});

    /* UPDATE TEXT AS A FUNCTION */
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