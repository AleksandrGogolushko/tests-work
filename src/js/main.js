let currentLocation = 'firstPage';
let autoScrolling = false;
let firstHeight = $('.first').offset().top;
let secondHeight = $('.second').offset().top;
let thirdHeight = $('.third').offset().top

$(document).scroll(e => {
    let scrolled = $(window).scrollTop();
    if (!autoScrolling) {
        if (scrolled > 1 && currentLocation == 'firstPage') {
            scrollPage(secondHeight, 'secondPage');
        } else if (scrolled > secondHeight && currentLocation == 'secondPage') {
            scrollPage(thirdHeight, 'thirdPage');
        } else if (scrolled < thirdHeight && currentLocation == 'thirdPage') {
            scrollPage(secondHeight, 'secondPage');
        } else if (scrolled < secondHeight && currentLocation == 'secondPage') {
            scrollPage(firstHeight, 'firstPage');
        }
    }

    function scrollPage(nextHeight, page) {
        currentLocation = page;
        autoScrolling = true;
        $('body,html').animate({ scrollTop: nextHeight }, 600, () => {
            autoScrolling = false;
        });
    }
})

$(".left").click((e) => { moveCarusel(e) })
$(".right").click((e) => { moveCarusel(e) })

function moveCarusel(e) {
    let pos = $(document).width();
    let position = $(".carusel-items").css("left")
    if (e.target.classList[1] == "left") {
        if (position != "0px") {
            if (position == `${-pos * 2}px`) {
                $(".carusel-items").animate({ left: `${(position.slice(0, -2)) / 2}` }, 100)
            } else {
                $(".carusel-items").animate({ left: `${0}` }, 100)
            }
        }
    } else {
        if (position == "0px") {
            $(".carusel-items").animate({ left: `${-pos}` }, 100)
        } else {
            $(".carusel-items").animate({ left: `${-pos * 2}` }, 100)
        }
    }
}

$(".second").mousemove(() => {
    moveStars(15)
})

function moveStars(speed) {
    let x = Math.floor((event.clientX - $(window).width() / 2) / speed) + "px";
    let y = Math.floor((event.clientY - $(window).height() / 2) / speed) + "px";
    $(".second img").css("transform", `translate(${x},${y})`)
}

let validationProgress = {
    name: false,
    email: false,
    message: false
}

$("#name").change(() => {
    if (!$("#name").val().search(/[a-z]*[a-zA-Z][^\W*\d]{1,15}$/g)) {
        validationProgress.name = true;
        $("#name").css({ border: "1px solid green" })
    } else {
        validationProgress.name = false;
        $("#name").css({ border: "1px solid crimson" })
    }
})

$("#email").change(() => {
    if (!$("#email").val().search(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/m)) {
        validationProgress.email = true;
        $("#email").css({ border: "1px solid green" })
    } else {
        validationProgress.email = false;
        $("#email").css({ border: "1px solid crimson" })
    }
})

$("#message").change(() => {
    if ($("#message").val().trim() == "") {
        validationProgress.message = false;
    } else {
        validationProgress.message = true;
    }
})

$("#send").click((e) => {
    e.preventDefault()
    for (let val in validationProgress) {
        if (validationProgress[val] == false) {
            $(`#${val}`).css("transform", "translate(2%,0)"),
                setTimeout(() => {
                    $(`#${val}`).css("transform", "translate(-2%,0)")
                }, 200);
            setTimeout(() => {
                $(`#${val}`).css("transform", "translate(0,0)")
            }, 400);
            return
        }
    }
    $(".form-wraper").css("transform", "translate(0,100vh)")
    $(".modal").css("transform", "translate(0,0)")
})

$(".modal button").click(() => {
    $(".form-wraper").css("transform", "translate(0,0)")
    $(".modal").css("transform", "translate(0,-70vh)")
    formRest()
})

function formRest() {
    validationProgress.name = false;
    validationProgress.email = false;
    validationProgress.message = false;
    $("#name,#email,#message").css({ border: "none" })
    $("form")[0].reset()
}
