const canvas = document.querySelector(".myCanvas");
const ctx = canvas.getContext("2d");

const height = (canvas.height = window.innerHeight);
const width = (canvas.width = window.innerWidth);

let painting = false;

class Draw {
  constructor(penColor, lineWidth, lineCap) {
    this.penColor = penColor || "black";
    this.lineWidth = lineWidth || 3;
    this.lineCap = lineCap || "round";
  }
  draw(e) {
    if (!painting) return;
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.getPaintColor;
    ctx.lineCap = this.lineCap;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}

let draw = new Draw('red');
draw.update('red')

canvas.addEventListener("mouseup", function () {
  painting = false;
  ctx.beginPath();
});
canvas.addEventListener("mousedown", function () {
  painting = true;
  ctx.beginPath();
});
canvas.addEventListener("mousemove", draw.draw);

window.addEventListener("resize", function (e) {
  const height = (canvas.height = window.innerHeight);
  const width = (canvas.width = window.innerWidth);
});

function create(elem) {
  switch (elem) {
    case "rect": {
      ctx.strokeRect(height / 2 - 50, width / 2 - 100, 100, 200);
      break;
    }
    case "square": {
      ctx.strokeRect(height / 2 - 100, width / 2 - 100, 200, 200);
      break;
    }
  }
}
