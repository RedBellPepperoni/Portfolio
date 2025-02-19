import { gsap } from "gsap";



document.addEventListener('mousemove', (e) => {
  // Get the mouse position relative to the viewport
  const mouseX = e.clientX + window.scrollX;
  const mouseY = e.clientY + window.scrollY;

  // Calculate percentage values based on the mouse position
  const xPercentage = (mouseX / window.innerWidth) * 100;
  const yPercentage = (mouseY / window.innerHeight) * 100;

  // Update the CSS variables for the mask's position
  document.documentElement.style.setProperty('--x', `${xPercentage}%`);
  document.documentElement.style.setProperty('--y', `${yPercentage}%`);
});

