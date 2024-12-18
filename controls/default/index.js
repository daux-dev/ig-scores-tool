$( () => {
    setupAll();
    $(".p1DecBtn").on("click", () => {p1Dec()});
    $(".p2DecBtn").on("click", () => {p2Dec()});
    $(".p1Side").on("click", () => {p1Inc()});
    $(".p2Side").on("click", () => {p2Inc()});
    $(".menuBtn").on("click", () => {openMenu()});
    $(".fullscreenBtn").on("click", () => {toggleFullscreen()});
    $(".updateBtn").on("click", () => {sendAll()});
    $(".closeBtn").on("click", () => {closeMenu()});
    $(".p1SelBtn").on("click", () => {openP1List()});
    $(".p2SelBtn").on("click", () => {openP2List()});
    $(".p1Name").on("input", () => {animateUpdate(true)});
    $(".p2Name").on("input", () => {animateUpdate(true)});
    $(".firstToBtn").on("click", () => {setMaxScore()});
    $(".zeroScoresBtn").on("click", () => {zeroScores()});
    $(".closePlayerSelectBtn").on("click", () => {closePlayerSelect()});
});

function setupAll() {
    $.getJSON("/data", data => {
        $(".p1Name").val(data.p1_name);
        $(".p2Name").val(data.p2_name);
        $(".p1NameDisplay").text(data.p1_name);
        $(".p2NameDisplay").text(data.p2_name);
        $(".p1Score").text(data.p1_score);
        $(".p2Score").text(data.p2_score);
        $(".firstToBtn").text("FT" + data.max_score);
        $(".zeroScoresBtn").text(data.p1_score + ":" + data.p2_score + "➡0:0");
        if ($(".zeroScoresBtn").text() == "0:0➡0:0") {
            $(".zeroScoresBtn").text("0:0");
        }
    });
}

function p1Inc() {
    $.getJSON("/data", data => {
        data.p1_score = parseInt(data.p1_score, 10) + 1;
        $.post("/submit", data, () => {
            $(".p1Score").text(data.p1_score);
        })
    })
}

function p2Inc() {
    $.getJSON("/data", data => {
        data.p2_score = parseInt(data.p2_score, 10) + 1;
        $.post("/submit", data, () => {
            $(".p2Score").text(data.p2_score);
        })
    })
}

function p1Dec() {
    $.getJSON("/data", data => {
        data.p1_score = parseInt(data.p1_score, 10) - 1;
        $.post("/submit", data, () => {
            $(".p1Score").text(data.p1_score);
        })
    })
}

function p2Dec() {
    $.getJSON("/data", data => {
        data.p2_score = parseInt(data.p2_score, 10) - 1;
        $.post("/submit", data, () => {
            $(".p2Score").text(data.p2_score);
        })
    })
}

function sendAll() {
    animateUpdate(false);
    $.getJSON("/data", data => {
        data.p1_name = $(".p1Name").val();
        data.p2_name = $(".p2Name").val();
        data.p1_score = $(".p1Score").text();
        data.p2_score = $(".p2Score").text();
        data.max_score = parseInt($(".firstToBtn").text().split("FT")[1]);
        $.post("/submit", data, () => {
            closeMenu();
            $(".p1NameDisplay").text(data.p1_name);
            $(".p2NameDisplay").text(data.p2_name);
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

const mainMenuBackground = document.querySelector(".mainMenuBackground");

function openMenu() {
    mainMenuBackground.style.display = "block";
    setupAll();
}
openMenu();

function closeMenu() {
    mainMenuBackground.style.display = "none";
    animateUpdate(false);
    setupAll();
}

function closePlayerSelect() {
    $(".playerSelectBackground").hide();
    $(".p1SelectMenu").hide();
    $(".p2SelectMenu").hide();
}

window.onclick = function(event) {
    if (event.target == mainMenuBackground) {
        mainMenuBackground.style.display = "none";
        animateUpdate(false);
        setupAll();
    }

    if (event.target == document.querySelector(".playerSelectBackground")) {
        document.querySelector(".playerSelectBackground").style.display = "none";
    }
}

function openP1List() {
    $(".playerSelectBackground").show();
    $(".p1SelectMenu").show();
}

function openP2List() {
    $(".playerSelectBackground").show();
    $(".p2SelectMenu").show();
}

function setMaxScore() {
    animateUpdate(true);
    const current_score = parseInt($(".firstToBtn").text().split("FT")[1]); // get current max_score value from button text
    const scores = [1,2,3,4,5,10,20]; //list of allowed max_score values
    const current_index = scores.findIndex(i => {return i == current_score});
    if (current_index >= scores.length - 1) {
        $(".firstToBtn").text("FT" + 1);
    } else {
        $(".firstToBtn").text("FT" + scores[current_index + 1]);
    }

}

function animateUpdate(bool) {
    if (bool) {
        $(".updateBtn").css("animation", "pulse 1s infinite");
        $(".closeBtn").html("close <span class='supersmall'>(reset changes)</span>");
    } else if (!bool) {
        $(".updateBtn").css("animation", "none");
        $(".closeBtn").text("close");
    }
}

function zeroScores() {
    $(".p1Score").text(0);
    $(".p2Score").text(0);
    $(".reset-scores-btn").text("0:0")
    animateUpdate(true);
}

/* read /players.txt, split line by line and add players to lists */
$.get("/players.txt", (txt) => {
    const players = txt.split(/\r?\n/);
    players.forEach(player => {
        if (player.length > 0) {
            $(".playerList1").append($('<button type="button" class="choiceP1" onclick="setPlayer(this)">' + player + '</button>'));
            $(".playerList2").append($('<button type="button" class="choiceP2" onclick="setPlayer(this)">' + player + '</button>'));
        }
    });
}, 'text');

function setPlayer(el) {
    console.log(el);
    if($(el).hasClass("choiceP1")) {
        $(".p1Name").val(el.innerText);
    } else if ($(el).hasClass("choiceP2")) {
        $(".p2Name").val(el.innerText);
    };
    $(".playerSelectBackground").hide();
    $(".p1SelectMenu").hide();
    $(".p2SelectMenu").hide();
    animateUpdate(true);
};

function messageShow(text) {
        if (!text) {
            $(".message").html("<span style='color: lime'>[SEND]</span> to \
                 apply changes. <span style='color: red'>[close]</span> to \
                 revert changes.");
        } else {
            $(".message").html(text);
        }
    $(".message").show().delay(4000).fadeOut(0);
}
