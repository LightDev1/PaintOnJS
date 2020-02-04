const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    palette = document.querySelector('.palette'),
    fillButton = document.querySelector('.fill'),
    input = document.querySelector('.numbers'),
    eraser = document.querySelector('.eraser'),
    currentColor = document.querySelector('.current__color'),
    pencil = document.querySelector('.pencil'),
    brush = document.querySelector('.brush');
    
let isMouseDown = false;
let color = 'black';
let isPressed = false;
let isCleanPressed = false;
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


document.addEventListener('keydown', (event) => {
  if (event.keyCode === 67) {
    clear();
  }
});

fillButton.addEventListener('click', () => {
  toFocus(fillButton, true);
  isPressed = true;
});

canvas.addEventListener('click', () => {
  if (isPressed) {
    fill();
    isPressed = false
  }
});

pencil.addEventListener('click', drawPencil);
brush.addEventListener('click', drawBrush);
eraser.addEventListener('click', toClean);