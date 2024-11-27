$( () => {

    /* FIRST DATA LOAD */
    $.getJSON("/data", data => {
        $(".p1_name").text(data.p1_name);
        $(".p2_name").text(data.p2_name);
        $(".p1_score").text(data.p1_score);
        $(".p2_score").text(data.p2_score);
        $(".format").text("FT" + data.max_score);
    });

    /* DATA UPDATE POLLING */
    setInterval(() => {
        $.getJSON("/data", data => {
            if ($(".p1_name").text() !== data.p1_name) {
                animFadeLeft(".p1_name", data.p1_name);
            }
            if ($(".p2_name").text() !== data.p2_name) {
                animFadeRight(".p2_name", data.p2_name);
            }
            if ($(".p1_score").text() !== data.p1_score) {
                animFadeDown(".p1_score", data.p1_score);
            }
            if ($(".p2_score").text() !== data.p2_score) {
                animFadeDown(".p2_score", data.p2_score);
            }
            if ($(".format").text() !== "FT" + data.max_score) {
                animFadeDown(".format", "FT" + data.max_score);
            }
        });
    }, 2000)
});

    /* UPDATE TEXT AS A FUNCTION */
function updateText(el, text) {
    $(el).text(text);
    console.log(el + " updated to " + text);
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