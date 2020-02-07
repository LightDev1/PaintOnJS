const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    palette = document.querySelector('.palette'),
    fillButton = document.querySelector('.fill'),
    input = document.querySelector('.numbers'),
    eraser = document.querySelector('.eraser'),
    currentColor = document.querySelector('.current__color'),
    pencil = document.querySelector('.pencil'),
    brush = document.querySelector('.brush'),
    text = document.querySelector('.text'),
    toolbar = document.querySelector('.toolbar'),
    textInput = document.querySelector('.text__input'),
    acceptBtn = document.querySelector('.accept'),
    circle = document.querySelector('.circle'),
    squart = document.querySelector('.squart'),
    triangle = document.querySelector('.triangle'),
    settings = document.querySelector('.settings'),
    width = document.querySelector('.width'),
    height = document.querySelector('.height');

    
let isMouseDown = false;
let color = 'black';
let isPressed = false;
let isCleanPressed = false;
let isTextPressed = false;
let isCirclePressed = false;
let isSquartPressed = false;
let isTrianglePressed = false;
let cleanColor = 'white';
let prevElement;

canvas.width = 1100;
canvas.height = 555;

const toFocus = (elem, condition) => {
    if (condition) {
        elem.style.backgroundColor = '#FFC45D';
        elem.style.border = '1px solid #FFC45D';
    }

    
    if (prevElement && !(elem === prevElement)) {
      prevElement.style.backgroundColor = '';
      prevElement.style.border = '';
    }

    prevElement = elem;

}

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
}); 

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  ctx.beginPath();
}); 

const showCurrentColor = () => {
  currentColor.style.backgroundColor = color;
};

palette.addEventListener('click', (event) => {
    let target = event.target;
    
    if (target.id === undefined) {
        return;
    }

    let elemColor = target.id;
    color = `${elemColor}`;
    ctx.fillStyle = color;
    showCurrentColor();

});

const fill = () => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
  
    ctx.beginPath();
    ctx.fillStyle = color;
    isCleanPressed = false;
};

const toClean = () =>  {
  input.value = 5;
  isCleanPressed = true;
  showCurrentColor();
  toFocus(eraser, true);
};


const drawPencil = () => {
  toFocus(pencil, true);
  input.value = 1;
  isCleanPressed = false;
};

const drawBrush = () => {
  input.value = 5;
  toFocus(brush, true);
  isCleanPressed = false;
};

canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {

    let radius = input.value;
    ctx.lineWidth = radius * 2;
  
    ctx.fillStyle =  (isCleanPressed) ? 'white' : color;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = (isCleanPressed) ? 'white' : color;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(event.offsetX, event.offsetY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  }
});

const clear = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0 , canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = color;
};

const saveValue = () => {
  if (textInput.value) {
    let value = textInput.value;
    textInput.style.display = '';
    acceptBtn.style.display = '';
    return value; 
  }

  textInput.style.display = '';
  acceptBtn.style.display = '';
};

const showText = () =>  {
   textInput.style.display = 'block';
   acceptBtn.style.display = 'block';
   input.value = 16;
};

const renderText = (event) => {

    let value = saveValue();
    let radius = input.value;

    if (value) {
      ctx.fillStyle = color;
      ctx.font = `${radius}px Arial`;
      ctx.fillText(value, event.offsetX, event.offsetY);
    }
};

const showSettings = () => {
  settings.style.display = 'block';
};

const drawCircle = (event) => {
  isCleanPressed = false;

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(event.offsetX, event.offsetY, input.value, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
};

const drawSquart = (event) => {
  isCleanPressed = false;

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.strokeRect(event.offsetX, event.offsetY, width.value, height.value);
  ctx.beginPath();
};

const drawTriangle = (event) => {
  isCleanPressed = false;

  let radius = input.value;

  console.log(event.offsetX);
  console.log(event.offsetY);

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.lineTo(event.offsetX - radius * radius, event.offsetY + radius * radius);
  ctx.lineTo(event.offsetX + radius * radius,  event.offsetY + radius * radius);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 67) {
    clear();
  }
});

fillButton.addEventListener('click', () => {
  toFocus(fillButton, true);
  isPressed = true;
});

text.addEventListener('click', () => {
  toFocus(text, true);
  isTextPressed = true;
  isCleanPressed = false;
  showText();
});

circle.addEventListener('click', () => {
  toFocus(circle, true);
  isCirclePressed = true;
});

squart.addEventListener('click', () => {
  toFocus(squart, true);
  showSettings();
  isSquartPressed = true;
});

triangle.addEventListener('click', () => {
  toFocus(triangle, true);
  isTrianglePressed = true;
});

canvas.addEventListener('click', (event) => {
  if (isPressed) {
    fill();
    isPressed = false;
  }

  if (isTextPressed) {
    renderText(event);
    isTextPressed = false;
  }

  if (isCirclePressed) {
    drawCircle(event);
    isCirclePressed = false;
  }

  if (isSquartPressed) {
    drawSquart(event);
    isSquartPressed = false;
    settings.style.display = '';
  }

  if (isTrianglePressed) {
    drawTriangle(event);
    isTrianglePressed = false;
  }

});

pencil.addEventListener('click', drawPencil);
brush.addEventListener('click', drawBrush);
eraser.addEventListener('click', toClean);
acceptBtn.addEventListener('click', saveValue);