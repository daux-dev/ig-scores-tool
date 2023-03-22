

$( () => {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          $("#msg").text("ENTER DISABLED, CLICK SUBMIT.").removeClass("ok").addClass("err").slideDown().delay(1500).slideUp();
          return false;
        }
      });

    $.getJSON("/data", data => {
        console.log(data);

        /* add charsets to selector */
        data.charsets_available.forEach(charset => {
            console.log(charset);
            $("#charset_selected").append($("<option>", {
                value: charset,
                text: charset
            }));
        });

        /* add characters to p1 and p2 char selector */
        data.chars.forEach(char => {
            const fileExtension = char.split(".")[char.split(".").length - 1];
            if (fileExtension == "png" || fileExtension == "jpg") { //only add if file extension is png/jpg to exclude quote.txt files     
                $(".chars").append($("<option>", {
                    value: char,
                    text: char.split(".")[0]
                }));
            }
        });

        Object.entries(data).forEach(keyValuePair => {
            $("#" + keyValuePair[0]).val(keyValuePair[1]);
        });

        /* read players.txt in root and add to dropdowns */
        $.get("/players.txt", function(txt) {
            // console.log(txt);
            const players = txt.split(/\r?\n/);
            console.log(players);
            players.forEach(player => {
                $(".playerSelect1").append($('<li><button type="button" onclick="setPlayer(this)" class="dropdown-item choiceP1">' + player + '</button></li>'));
                $(".playerSelect2").append($('<li><button type="button" onclick="setPlayer(this)" class="dropdown-item choiceP2">' + player + '</button></li>'));

            });
        }, 'text');

    });


    $("#next_btn").click(() => {
        if ($("#p1_next").val() && $("#p2_next").val()) {
            if (parseInt($("#p1_score").val()) >= parseInt($("#max_score").val()) || parseInt($("#p2_score").val()) >= parseInt($("#max_score").val())) {
                console.log(parseInt($("#p1_score").val())+parseInt($("#p1_score").val()));
                $("#p1_name").val($("#p1_next").val());
                $("#p2_name").val($("#p2_next").val());
                $("#p1_score").val(0);
                $("#p2_score").val(0);
                $("#p1_next").val("");
                $("#p2_next").val("");
                
                $("#msg").text("MATCH PREPARED").removeClass("err").addClass("ok").slideDown().delay(1500).slideUp();
            } else {
                $("#msg").text("WIN SCORE NOT REACHED.").removeClass("ok").addClass("err").slideDown().delay(1500).slideUp();
            }

        } else {
            $("#msg").text("NEXT PLAYERS NOT SET").removeClass("ok").addClass("err").slideDown().delay(1500).slideUp();
        }

    });

    $("#player_swap_btn").click(() => {
        let temp = $("#p1_name").val();
        $("#p1_name").val($("#p2_name").val());
        $("#p2_name").val(temp);

        temp = $("#p1_score").val();
        $("#p1_score").val($("#p2_score").val());
        $("#p2_score").val(temp);

        temp = $("#p1_char").val();
        $("#p1_char").val($("#p2_char").val());
        $("#p2_char").val(temp);
    });
});

function setPlayer(el) {
    console.log(el);
    if($(el).hasClass("choiceP1")) {
        $("#p1_name").val(el.innerText);
    } else if ($(el).hasClass("choiceP2")) {
        $("#p2_name").val(el.innerText);
    };
};