/* eslint-disable no-unused-vars */
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;
const width = 300;
const height = 300;
const colour = 'hotpink';
const radius = 5;
let mousedown = false;

// resize the canvas
canvas.width = width;
canvas.height = height;

function draw() {
  if (mousedown) {
    // set the colour
    c.fillStyle = colour;
    // start a path and paint a circle of 20 pixels at the mouse position
    c.beginPath();
    c.arc(mouseX, mouseY, radius, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
  }
}

function clear() {
  c.clearRect(0, 0, width, height);
}

// get the mouse position on the canvas (some browser trickery involved)
canvas.addEventListener(
  'mousemove',
  event => {
    if (event.offsetX) {
      mouseX = event.offsetX;
      mouseY = event.offsetY;
    } else {
      mouseX = event.pageX - event.target.offsetLeft;
      mouseY = event.pageY - event.target.offsetTop;
    }
    // call the draw function
    draw();
  },
  false
);

canvas.addEventListener(
  'mousedown',
  _event => {
    mousedown = true;
  },
  false
);
canvas.addEventListener(
  'mouseup',
  _event => {
    mousedown = false;
  },
  false
);

const downloadBtn = document.createElement('a');
downloadBtn.innerHTML = 'download';
downloadBtn.addEventListener(
  'click',
  _ev => {
    downloadBtn.href = canvas.toDataURL();
    downloadBtn.download = 'mypainting.png';
  },
  false
);
canvas.parentElement.appendChild(downloadBtn);

const clearBtn = document.createElement('a');
clearBtn.innerHTML = 'clear';
clearBtn.addEventListener(
  'click',
  _ev => {
    clear();
  },
  false
);
canvas.parentElement.appendChild(clearBtn);
