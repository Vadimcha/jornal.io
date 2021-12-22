function t() {
    if (document.querySelector(".nadpic_dont").id == "not_active") {
        $('.analitics1').css('display', 'table');
        document.querySelector(".nadpic_dont").id = "active";
    } else {
        $('.analitics1').css('display', 'none');
        document.querySelector(".nadpic_dont").id = "not_active";
    }
}

function r() {
    if (document.querySelector(".nadpic_dont_2").id == "not_active") {
        $('.analitics2').css('display', 'table');
        document.querySelector(".nadpic_dont_2").id = "active";
    } else {
        $('.analitics2').css('display', 'none');
        document.querySelector(".nadpic_dont_2").id = "not_active";
    }
}