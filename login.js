$(document).ready(function () {
  $(".navbar-toggler").click(function () {
    $(".nav-item-close").show();
  });

  $(".nav-item-close").click(function () {
    $(".nav-toggler").click();
  });

  function initSlick() {
    $(".carousel").slick({
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
    });
  }

  // Function to destroy Slick slider
  function destroySlick() {
    // If Slick is initialized, destroy it
    if ($(".carousel").hasClass("slick-initialized")) {
      $(".carousel").slick("unslick");
    }
  }

  // Function to handle the Slick slider based on window width
  function handleSlick() {
    var windowWidth = $(window).width();

    // If window width is 767 pixels or less, destroy Slick
    if (windowWidth <= 767) {
      destroySlick();
    } else {
      // If window width is greater than or equal to 768 pixels, initialize or reinitialize Slick
      initSlick();
    }
  }

  // Initial setup
  handleSlick();

  // Handle window resize event
  $(window).on("resize", handleSlick);
});

// final captcha text
var captcha_text = "";

// button to refresh captcha
var btnRefresh = document.getElementById("refreshButton");

// list of chars to include in captcha
var alpha = new Array(
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
);

// 2d context, used to write text as image
var tCtx = document.getElementById("textCanvas").getContext("2d");

// image element to show captcha
var imageElem = document.getElementById("image");

// font for captcha text, included in html file
var font = '270 27px "Cutive Mono"';

Captcha();

// 'refresh' button onclick, calls generate captcha method to refresh
btnRefresh.onclick = function () {
  Captcha();
};

// generates captcha text and converts it to image
function Captcha() {
  for (var i = 0; i < 6; i++) {
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
    var g = alpha[Math.floor(Math.random() * alpha.length)];
  }
  captcha_text =
    a + " " + b + " " + " " + c + " " + d + " " + e + " " + f + " " + g;

  document.fonts.load(font).then(function () {
    tCtx.font = font;
    tCtx.canvas.width = tCtx.measureText(captcha_text).width;
    tCtx.canvas.height = 40;
    tCtx.font = font;
    tCtx.fillStyle = "#444";
    tCtx.fillText(captcha_text, 0, 20);

    var c = document.getElementById("textCanvas");
    var ctx = c.getContext("2d");
    // Draw lines
    for (var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(c.width * Math.random(), c.height * Math.random());
      ctx.lineTo(c.width * Math.random(), c.height * Math.random());
      ctx.strokeStyle =
        "rgb(" +
        Math.round(256 * Math.random()) +
        "," +
        Math.round(256 * Math.random()) +
        "," +
        Math.round(256 * Math.random()) +
        ")";
      ctx.stroke();
    }

    imageElem.src = tCtx.canvas.toDataURL();
  });
}

// checks user input
function ValidCaptcha() {
  var string1 = removeSpaces(captcha_text);
  var string2 = removeSpaces(document.getElementById("txtInput").value);
  console.log(string1 + " " + string2);
  if (string1 === string2) {
    return true;
  } else {
    return false;
  }
}

// to improve the visibility of the text in the picture, spaces are added
// between the characters. This function removes spaces to compare captcha with user input
function removeSpaces(string) {
  return string.split(" ").join("");
}

// reference to the form
var myForm = document.getElementById("myForm");

// 'Submit' button onclick, validates captcha before form submission
myForm.onsubmit = function (event) {
  if (ValidCaptcha()) {
    // If captcha is valid, continue with form submission
    window.alert("Correct! Form will be submitted.");
  } else {
    // If captcha is invalid, prevent the form from submitting
    window.alert("Wrong... Captcha validation failed.");
    event.preventDefault();
  }
};
