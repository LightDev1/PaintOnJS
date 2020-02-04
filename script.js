const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    palette = document.querySelector('.palette'),
    fillButton = document.querySelector('.fill');

let isMouseDown = false;
let coords = [];
let radius = 5;
let color = 'black';

canvas.width = 1100;
canvas.height = 550;

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
}); 

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  ctx.beginPath();
  coords.push('mouseup');
}); 

palette.addEventListener('click', (event) => {
    let target = event.target;
    
    if (target.id === undefined) {
        return;
    }

    let elemColor = target.id;
    color = `${elemColor}`;
    ctx.fillStyle = color;

});

const fill = () => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0 , canvas.width, canvas.height);
  
    ctx.beginPath();
    ctx.fillStyle = color;
};

ctx.lineWidth = radius * 2;

canvas.addEventListener('mousemove', (event) => {
  if (isMouseDown) {

    coords.push([event.clientX, event.clientY]);
   
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(event.offsetX, event.offsetY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  }
});

const save = () => {
    localStorage.setItem('coords', JSON.stringify(coords));
};

const clear = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0 , canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = color;
};

const replay = () => {
  let timer = setInterval(() => {
    if (!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }

    let crd = coords.shift();
    let event = {
      offsetX: crd[0],
      offsetY: crd[1]
    };

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(event.offsetX, event.offsetY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);

  }, 30)

};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 83) {
    save();
    
    console.log('Saved');
  }

  if (event.keyCode === 82) {
    console.log('Replaying...');

    coords = JSON.parse(localStorage.getItem('coords'));
    clear();
    replay();
  }

  if (event.keyCode === 67) {
      clear();
      console.log('Cleared');
  }
});

fillButton.addEventListener('click', fill)


