const root = document.getElementById("root")!;
const smoothScrollConteiner = document.querySelector(".smooth-scroll-container") as HTMLDivElement;

const ARROW_SCROLL_PIXEL_DISTANCE = 40;
const WHEEL_SCROLL_PIXEL_DISTANCE = 100;

let currentScrollDistance = 0;

const setTranslateY = (pixelValue: number) => {
  currentScrollDistance = pixelValue;
  smoothScrollConteiner.style.transform = `translateY(${pixelValue}px)`;
};

const scrollSmoothly = (scrollingUp: boolean, scrollActionDist: number) => {
  const rect = smoothScrollConteiner.getBoundingClientRect();

  if (scrollingUp) {
    if (rect.bottom >= rect.height) {
      setTranslateY(0);
      return;
    }
    setTranslateY(currentScrollDistance + scrollActionDist);
  } else {
    if (-currentScrollDistance >= rect.height - window.innerHeight) {
      setTranslateY(-(rect.height - window.innerHeight));
      return;
    }
    setTranslateY(currentScrollDistance - scrollActionDist);
  }
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    scrollSmoothly(e.key === "ArrowUp", ARROW_SCROLL_PIXEL_DISTANCE);
  }
});

root.addEventListener("wheel", (e) => {
  scrollSmoothly(e.deltaY < 0, WHEEL_SCROLL_PIXEL_DISTANCE);
});