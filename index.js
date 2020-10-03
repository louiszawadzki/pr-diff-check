var canvas = document.getElementById("c");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

var canvas = new fabric.Canvas("c");
let opacityImage;

const urlParams = new URLSearchParams(window.location.search);
const baseUrl = urlParams.get("base");
const compareURL = urlParams.get("compare");

fabric.Image.fromURL(baseUrl, function (oImg) {
  canvas.add(oImg);
});
fabric.Image.fromURL(compareURL, function (oImg) {
  opacityImage = oImg;
  opacityImage.opacity = 0.5;
  canvas.add(oImg);
});

// Opacity change
const input = document.getElementById("input");
input.onchange = (newValue) => {
  if (opacityImage) {
    opacityImage.opacity = newValue.target.value / 100;
  }
};

// blinking
const blinkButton = document.getElementById("blink");
const stopBlinkButton = document.getElementById("stop-blink");

const toggleButtons = (buttonToShow, buttonToHide) => {
  buttonToShow.style.display = "";
  buttonToHide.style.display = "none";
};

let blinkInterval;

blinkButton.onclick = () => {
  toggleButtons(stopBlinkButton, blinkButton);
  opacityImage.opacity = 1;
  blinkInterval = setInterval(() => {
    opacityImage.opacity = 1 - opacityImage.opacity;
  }, 300);
};

stopBlinkButton.onclick = () => {
  toggleButtons(blinkButton, stopBlinkButton);
  clearInterval(blinkInterval);
  opacityImage.opacity = input.value;
};
