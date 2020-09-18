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
fabric.Image.fromURL(compare, function (oImg) {
  opacityImage = oImg;
  opacityImage.opacity = 0.5;
  canvas.add(oImg);
});

const input = document.getElementById("input");
input.onchange = (newValue) => {
  if (opacityImage) {
    opacityImage.opacity = newValue.target.value / 100;
  }
};
