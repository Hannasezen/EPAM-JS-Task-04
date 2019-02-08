;(function() {
'use strict'

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

function Shape () {
  // random color for shape
  this.color = `rgba(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, .8)`;
  // shape`s start position
  this.startX = 0;
  this.startY = 0;
  // shape`s move step
  this.x = 5;
  this.y = 5;
}
// Circle constructor
function Circle(num) {
  // adding Shape`s properties
  Shape.call(this);
  this.number = num;
  this.radius = parseInt(Math.random() * 20 + 20);  
  this.startX = this.radius;
  this.startY = this.radius;  
  this.draw = function () {
      // drawing the circle
      context.beginPath();
      context.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
      context.fillStyle = this.color;
      context.fill();      
  };
  this.addText = function () {
    context.fillStyle = 'black';
      context.font = `${this.radius}px Arial`;
      context.fillText(`${this.number}`, this.startX - this.radius / 2, this.startY + this.radius / 5);
  };
  this.move = function () {
    this.draw();
    this.addText();
    // moving the circle
    this.startX += this.x;
    this.startY += this.y;
    // if circle crossing the edges
    if(this.startY + this.radius > canvas.height || this.startY - this.radius < 0) {
      this.y = -this.y;
    }
    if(this.startX + this.radius> canvas.width || this.startX - this.radius < 0) {
      this.x = -this.x;
    }
  }
};

//Square constructor
function Square (num) {
  Shape.call(this);
  this.number = num;
  this.size = parseInt(Math.random() * 40 + 30);
  this.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.rect(this.startX, this.startY, this.size, this.size);
    context.fill();
  };
  this.addText = function () {
    context.fillStyle = 'black';
    context.font = `${this.size / 2}px Arial`;
    context.fillText(`${this.number}`, this.startX + this.size / 4, this.startY + this.size * 3/4);
  };
  this.move = function () {
    this.draw();
    this.addText();
    // moving the square
    this.startX += this.x;
    this.startY += this.y;
    // if square crossing the edges
    if(this.startY + this.size >= canvas.height || this.startY <= 0) {
      this.y = -this.y;
    }
    if(this.startX + this.size >= canvas.width || this.startX <= 0) {
      this.x = -this.x;
    }
  }
}

// array for circles and squares storage
let shapes = [];
let count = 1;
shapes.push(new Circle(count));
setInterval(() => {
  if (count % 2 !== 0 && count < 20) {
    count++;
    shapes.push(new Square(count));    
  }
  else if (count % 2 === 0 && count < 20) {
    count++;
    shapes.push(new Circle(count));
  }
}, 2000);

// animation canvas: clear and draw again every 30ms
setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move();
  }
}, 30);

// mousemove event for canvas: shapes following the pointer
canvas.addEventListener('mousemove', function(e) {
  for (let shape of shapes) {  
    shape.startX = e.offsetX;
    shape.startY = e.offsetY;
  }
});
})()