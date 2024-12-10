$( () => {
    setupAll();
});

function setupAll() {
    $.getJSON("/data", data => {
        $("#p1_name_d").text(data.p1_name);
        $("#p2_name_d").text(data.p2_name);
        $("#p1_score").text(data.p1_score);
        $("#p2_score").text(data.p2_score);
        $(".ft-btn").text("FT" + data.max_score);
        $(".reset-scores-btn").text(data.p1_score + ":" + data.p2_score + "➡0:0");
        if ($(".reset-scores-btn").text() == "0:0➡0:0") {
            $(".reset-scores-btn").text("0:0");
        }
        Object.entries(data).forEach(keyValuePair => {
            $("#" + keyValuePair[0]).val(keyValuePair[1]);
        });
    });
}

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

function sendAll() {
    animateUpdate(false);
    $.getJSON("/data", data => {
        data.p1_name = $("#p1_name").val();
        data.p2_name = $("#p2_name").val();
        data.p1_score = $("#p1_score").text();
        data.p2_score = $("#p2_score").text();
        data.max_score = parseInt($(".ft-btn").text().split("FT")[1]);
        closeMenu();
        $.post("/submit", data, () => {
            $("#p1_name_d").text(data.p1_name);
            $("#p2_name_d").text(data.p2_name);
            // $("#p1_score").text(data.p1_score)
            // $("#p2_score").text(data.p2_score)
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

const menu = document.querySelector(".menu");

function openMenu() {
    menu.style.display = "block";
    setupAll();
}
openMenu();

function closeMenu() {
    menu.style.display = "none";
    animateUpdate(false);
    setupAll();
}

function closePlayerSelect() {
    $(".playerSelectDark").hide();
    $(".playerSelect1").hide();
    $(".playerSelect2").hide();
}

window.onclick = function(event) {
    if (event.target == menu) {
        menu.style.display = "none";
        animateUpdate(false);
        setupAll();
    }

    if (event.target == document.querySelector(".playerSelectDark")) {
        document.querySelector(".playerSelectDark").style.display = "none";
    }
}

function openP1List() {
    $(".playerSelectDark").show();
    $(".playerSelect1").show();
}

function openP2List() {
    $(".playerSelectDark").show();
    $(".playerSelect2").show();
}

function setMaxScore() {
    animateUpdate(true);
    const current_score = parseInt($(".ft-btn").text().split("FT")[1]); // get current max_score value from button text
    const scores = [1,2,3,4,5,10,20]; //list of allowed max_score values
    const current_index = scores.findIndex(i => {return i == current_score});
    if (current_index >= scores.length - 1) {
        $(".ft-btn").text("FT" + 1);
    } else {
        $(".ft-btn").text("FT" + scores[current_index + 1]);
    }

}

function animateUpdate(bool) {
    if (bool) {
        $(".updateButton").css("animation", "pulse 1s infinite");
        $(".closeButton").html("close <span class='supersmall'>(reset changes)</span>");
    } else if (!bool) {
        $(".updateButton").css("animation", "none");
        $(".closeButton").text("close");
    }
}

function resetScores() {
    $("#p1_score").text(0);
    $("#p2_score").text(0);
    $(".reset-scores-btn").text("0:0")
    animateUpdate(true);
}

/* read players.txt in root and add to dropdowns */
$.get("/players.txt", function(txt) {
    // console.log(txt);
    const players = txt.split(/\r?\n/);
    console.log(players);
    players.forEach(player => {
        if (player.length > 0) {
            $(".namesList1").append($('<button type="button" onclick="setPlayer(this)" class="choiceP1">' + player + '</button>'));
            $(".namesList2").append($('<button type="button" onclick="setPlayer(this)" class="choiceP2">' + player + '</button>'));
        }
    });
}, 'text');

function setPlayer(el) {
    console.log(el);
    if($(el).hasClass("choiceP1")) {
        $("#p1_name").val(el.innerText);
    } else if ($(el).hasClass("choiceP2")) {
        $("#p2_name").val(el.innerText);
    };
    $(".playerSelectDark").hide();
    $(".playerSelect1").hide();
    $(".playerSelect2").hide();
    animateUpdate(true);
};

function consoleShow(text) {
        if (!text) {
            $(".console").html("<span style='color: lime'>[SEND]</span> to \
                 apply changes. <span style='color: red'>[close]</span> to \
                 revert changes.");
        } else {
            $(".console").html(text);
        }
    $(".console").show().delay(4000).fadeOut(0);
}
