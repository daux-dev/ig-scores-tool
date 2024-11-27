$( () => {
    $.getJSON("/data", data => {
        $("#p1_name").text(data.p1_name);
        $("#p2_name").text(data.p2_name);
        $("#p1_score").text(data.p1_score);
        $("#p2_score").text(data.p2_score);
        // Object.entries(data).forEach(keyValuePair => {
        //     $("#" + keyValuePair[0]).val(keyValuePair[1]);
        // });
    });
});

function p1Inc() {
    $.getJSON("/data", data => {
        data.p1_score = parseInt(data.p1_score, 10) + 1;
        $.post("/submit", data, () => {
            $("#p1_score").text(data.p1_score);
        })
    })
}

function p2Inc() {
    $.getJSON("/data", data => {
        data.p2_score = parseInt(data.p2_score, 10) + 1;
        $.post("/submit", data, () => {
            $("#p2_score").text(data.p2_score);
        })
    })
}

function p1Dec() {
    $.getJSON("/data", data => {
        data.p1_score = parseInt(data.p1_score, 10) - 1;
        $.post("/submit", data, () => {
            $("#p1_score").text(data.p1_score);
        })
    })
}

function p2Dec() {
    $.getJSON("/data", data => {
        data.p2_score = parseInt(data.p2_score, 10) - 1;
        $.post("/submit", data, () => {
            $("#p2_score").text(data.p2_score);
        })
    })
}


const elem = document.querySelector("body");

function toggleFullscreen() {
    if (document.fullscreenElement == null) {
        if (elem.requestFullscreen) {
        elem.requestFullscreen();
        }// else if (elem.webkitRequestFullscreen) { /* Safari */
        // elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) { /* IE11 */
        // elem.msRequestFullscreen();
        //}
    } else if (document.fullscreenElement != null){
        document.exitFullscreen();
    }
}
