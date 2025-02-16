const round = document.querySelector('.round');

document.body.addEventListener('mousemove', (evt) => {
  let x = evt.clientX;
  let y = evt.clientY;
  
  document.body.style.setProperty('--x', `${x}px`);
  document.body.style.setProperty('--y', `${y}px`);
})
