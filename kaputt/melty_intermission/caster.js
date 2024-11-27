$( () => {

    /* FIRST DATA LOAD */
    $.getJSON("/data", data => {
        // Object.entries(data).forEach(keyValuePair => {
        //     console.log(keyValuePair);
        //     $("."+keyValuePair[0]).text(keyValuePair[1]);
        // });

        $(".caster1").text(data.scroller.split("&")[0]);
        $(".caster2").text(data.scroller.split("&")[1]);
    });

    /* DATA UPDATE POLLING */
    setInterval(() => {
        $.getJSON("/data", data => {
            if ($(".caster1").text() !== data.scroller.split("&")[0]) {
                animFadeLeft(".caster1", data.scroller.split("&")[0]);
            }
            if ($(".caster2").text() !== data.scroller.split("&")[1]) {
                animFadeRight(".caster2", data.scroller.split("&")[1]);
            }
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