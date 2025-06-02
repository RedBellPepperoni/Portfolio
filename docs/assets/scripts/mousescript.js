console.clear();
const content = document.querySelector(".content");
const link = document.querySelector("a");
const linkIcon = document.querySelector(".btn-icon");
const maskSizeMin = 0.005;
const maskMultiplier = 27;

let linkAnimated = false;

let xTo = gsap.quickTo(".hidden-content", "--x", {
  duration: 0.2,
  ease: "power4.out"
}),
  yTo = gsap.quickTo(".hidden-content", "--y", {
    duration: 0.2,
    ease: "power4.out"
  });

function updateSize() {
  let size = window.innerWidth * maskSizeMin; 
  gsap.set(".hidden-content", { "--size": size });
  updateTimelineSize(size);
}

function updateTimelineSize(size) {
  tl.clear();
  tl.to(".hidden-content", {
    "--size": size * maskMultiplier, 
    duration: 0.75,
    ease: "back.out(1.7)"
  });
}

let tl = gsap.timeline({ paused: true });
updateTimelineSize(window.innerWidth * maskSizeMin); // Initial size based on 10% of the viewport width

let hoveringContent = gsap.utils.toArray(".hovertext", content);

hoveringContent.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    tl.tweenTo(0.75);
  });
  el.addEventListener("mouseleave", () => {
    tl.tweenTo(0);
  });
});

/***************************************
    Add Mask on First Mouse Movement
***************************************/
window.addEventListener("mousemove", onFirstMove);

function onFirstMove(e) {
  window.removeEventListener("mousemove", onFirstMove);
  gsap.set(".hidden-content", { autoAlpha: 1, "--x": e.pageX, "--y": e.pageY });

  window.addEventListener("mousemove", onMouseMove);
  
}

function onMouseMove(e){
  if (!linkAnimated) {
    yTo(e.pageY);
    xTo(e.pageX);
  }
}




window.addEventListener("resize", updateSize);
updateSize();

