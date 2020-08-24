let currentPage = 'first';
let autoScrolling = false;
let firstOffset = $('.first').offset().top;
let secondOffset = $('.second').offset().top;
let thirdOffset = $('.third').offset().top

$(document).scroll(e => {
    let scrolled = $(window).scrollTop();
    if (!autoScrolling) {
        switch (true) {
            case scrolled > 1 && currentPage == 'first':
                scrollTo(secondOffset, 'second');
                break;
            case scrolled > secondOffset && currentPage == 'second':
                scrollTo(thirdOffset, 'third');
                break;
            case scrolled < thirdOffset && currentPage == 'third':
                scrollTo(secondOffset, 'second');
                break
            case scrolled < secondOffset && currentPage == 'second':
                scrollTo(firstOffset, 'first');
                break
        }
    }

    function scrollTo(nextOffset, page) {
        currentPage = page;
        autoScrolling = true;
        $('body,html').animate({ scrollTop: nextOffset }, 600, () => {
            autoScrolling = false;
        });
    }
})

let caruselSlide = 0;

$("#left").click((e) => { moveCarusel(e) })

$("#right").click((e) => { moveCarusel(e) })

function moveCarusel(e) {
    let pos = $(document).width();
    if ($(e.target).attr("id") == "left") {
        if (caruselSlide == 0) {
            $(".carusel-items").animate({ left: `${-pos * 2}` }, 50);
            caruselSlide = 2;
        } else if (caruselSlide == 2) {
            $(".carusel-items").animate({ left: `${-pos}` }, 50)
            caruselSlide = 1;
        } else {
            $(".carusel-items").animate({ left: `${0}` }, 50)
            caruselSlide = 0
        }
        checkSelect("select", ".navigation", caruselSlide)
        return
    }
    if (caruselSlide == 0) {
        $(".carusel-items").animate({ left: `${-pos}` }, 50);
        caruselSlide = 1;
    } else if (caruselSlide == 1) {
        $(".carusel-items").animate({ left: `${-pos * 2}` }, 50);
        caruselSlide = 2;
    } else {
        $(".carusel-items").animate({ left: `${0}` }, 50);
        caruselSlide = 0;
    }
    checkSelect("select", ".navigation", caruselSlide)
}

function checkSelect(addClass, perents, caruselSlide) {
    $(`.${addClass}`).removeClass(addClass)
    $(`${perents} div:nth-child(${caruselSlide + 1})`).addClass(addClass)
}

$(".first-block").click(() => {
    $(".carusel-items").animate({ left: `${0}` }, 50)
    caruselSlide = 0
    checkSelect("select", ".navigation", caruselSlide)
})

$(".second-block").click(() => {
    $(".carusel-items").animate({ left: `${-$(document).width()}` }, 50)
    caruselSlide = 1;
    checkSelect("select", ".navigation", caruselSlide)
})

$(".third-block").click(() => {
    $(".carusel-items").animate({ left: `${-$(document).width() * 2}` }, 50);
    caruselSlide = 2;
    checkSelect("select", ".navigation", caruselSlide)
})

$(".second").mousemove(() => {
    moveStars(15)
})

function moveStars(speed) {
    let x = Math.floor((event.clientX - $(window).width() / 2) / speed) + "px";
    let y = Math.floor((event.clientY - $(window).height() / 2) / speed) + "px";
    $(".second img").css("transform", `translate(${x},${y})`)
}

let validationState = {
    name: false,
    email: false,
    message: false
}

$("#name").change(() => {
    validationInput("name", "email", /(^[а-яёА-ЯЁ]{2,15}$|^[a-zA-Z]{2,15}$)/g, "Name must contain only letters!")
})

$("#email").change(() => {
    validationInput("email", "name", /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/m, "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'!")
})

function validationInput(firstElemets, secondElements, regexp, errorText) {
    if (!$(`#${firstElemets}`).val().search(regexp)) {
        validationState[firstElemets] = true;
        $(`.error-message.${firstElemets}`).attr("data-show", "hidden")
        $(`#${firstElemets}`).css({ border: "1px solid green" })
        $(`.${firstElemets}`).css({ transform: "translate(-50%, 10%)" })
        if ($(`.error-message.${secondElements}`).attr("data-show") == "show") {
            $(`.error-message.${secondElements}`).css({ transform: "translate(-50%, -110%)" })
        }
    } else {
        validationState[firstElemets] = false;
        $(`.error-message.${firstElemets}`).attr("data-show", "show")
        $(`.error-message.${firstElemets} p`).html(errorText)
        $(`#${firstElemets}`).css({ border: "1px solid crimson" })
        $(`.error-message.${firstElemets}`).css({ transform: "translate(-50%, -110%)" })
        if ($(`.error-message.${secondElements}`).attr("data-show") == "show") {
            $(`.error-message.${secondElements}`).css({ transform: "translate(-50%, -220%)" })
        }
    }
}

$("#message").change(() => {
    if ($("#message").val().trim() == "") {
        validationState.message = false;
        $("#message").css({ border: "1px solid crimson" })
    } else {
        validationState.message = true;
        $("#message").css({ border: "1px solid green" })
    }
})

$("#send").click((e) => {
    e.preventDefault()
    for (let val in validationState) {
        if (!validationState[val]) {
            shakeInvalidForm(val)
            return
        }
    }
    sendForm()
})

function shakeInvalidForm(element) {
    $(`#${element}`).css("transform", "translate(2%,0)"),
    setTimeout(() => $(`#${element}`).css("transform", "translate(-2%,0)"), 200);
    setTimeout(() => $(`#${element}`).css("transform", "translate(0,0)"), 400);
    $(`#${element}`).css({ border: "1px solid crimson" })
}

function sendForm() {
    $(".form-wraper").css("transform", "translate(0,100vh)")
    $(".modal").css("transform", "translate(0,0)")
}

$(".modal button").click(() => {
    $(".form-wraper").css("transform", "translate(0,0)")
    $(".modal").css("transform", "translate(0,-70vh)")
    formRest()
})

function formRest() {
    validationState.name = false;
    validationState.email = false;
    validationState.message = false;
    $("#name,#email,#message").css({ border: "none" })
    $("form")[0].reset()
}
