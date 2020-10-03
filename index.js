var HTMLcanvas = document.getElementById("c");
HTMLcanvas.width = window.innerWidth;
HTMLcanvas.height = window.innerHeight - 50;

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
    opacityImage.set("opacity", newValue.target.value / 100);
    canvas.renderAll();
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
    opacityImage.set("opacity", 1 - opacityImage.opacity);
    canvas.renderAll();
  }, 300);
};

stopBlinkButton.onclick = () => {
  toggleButtons(blinkButton, stopBlinkButton);
  clearInterval(blinkInterval);
  opacityImage.set("opacity", input.value / 100);
  canvas.renderAll();
};
