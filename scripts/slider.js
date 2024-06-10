const dotsNav = document.querySelector(".slider__nav");
const dotsArray = Array.from(dotsNav.children);
const line = document.querySelector(".slider__line");
const slides = Array.from(line.children);
const SLIDE_WIDTH = 700;
let slidesLength = slides.length;
const backButton = document.querySelector(".slider__button_left");
const nextButton = document.querySelector(".slider__button_right");
const lastSlide = slides[slidesLength - 1].cloneNode(true);
let changePosition = false;
let current = 0;
let currentPixels = 0;
const firstSlide = slides[0].cloneNode(true);
line.appendChild(firstSlide);

slidesLength++;

function updateDots() {
  dotsArray.forEach((dot, index) => {
    dot.classList.remove("current-slide");
    if (index === current % (slidesLength - 1)) {
      dot.classList.add("current-slide");
    }
    dot.removeEventListener("click", changeDotByClick);
    dot.addEventListener("click", changeDotByClick);
  });
}

function changeDotByClick(event) {
  const targetDot = event.target;
  const targetIndex = dotsArray.indexOf(targetDot);
  if (targetIndex !== current) {
    changeSlide(targetIndex);
  }
}

function changeSlide(targetIndex) {
  if (changePosition) return;
  changePosition = true;
  blockEvents();

  const targetPixels = -targetIndex * SLIDE_WIDTH;
  const step = (targetPixels - currentPixels) / 50;

  const timer = setInterval(() => {
    const currentLeft = parseInt(line.style.left || "0", 10);
    if (
      (step < 0 && currentLeft <= targetPixels) ||
      (step > 0 && currentLeft >= targetPixels)
    ) {
      clearInterval(timer);
      line.style.left = `${targetPixels}px`;
      current = targetIndex;
      currentPixels = targetPixels;
      updateDots();
      unBlockEvents();
      changePosition = false;
    } else {
      line.style.left = `${currentLeft + step}px`;
    }
  }, 10);
}

function shiftRight() {
  if (changePosition) return;
  changePosition = true;
  blockEvents();
  current++;
  if (current >= slidesLength) {
    current = 0;
    currentPixels = 0;
  } else {
    currentPixels -= SLIDE_WIDTH;
  }

  const path = currentPixels;

  const timer = setInterval(() => {
    const currentLeft = parseInt(line.style.left || "0", 10);
    if (currentLeft <= path) {
      clearInterval(timer);
      line.style.left = `${path}px`;
      if (current === slidesLength - 1) {
        setTimeout(() => {
          line.style.left = "0px";
          currentPixels = 0;
          current = 0;
          updateDots();
        }, 0);
      } else {
        updateDots();
      }
      unBlockEvents();
      changePosition = false;
    } else {
      line.style.left = `${currentLeft - 10}px`;
    }
  }, 5);
  console.log(path);
}

function shiftLeft() {
  if (changePosition) return;
  changePosition = true;
  blockEvents();
  current--;
  if (current < 0) {
    current = slidesLength - 1;
    currentPixels = -SLIDE_WIDTH * (slidesLength - 1);
    line.style.left = `${currentPixels}px`;
  } else {
    currentPixels += SLIDE_WIDTH;
  }

  const path = currentPixels;

  const timer = setInterval(() => {
    const currentLeft = parseInt(line.style.left || "0", 10);
    if (currentLeft >= path) {
      clearInterval(timer);
      line.style.left = `${path}px`;
      updateDots();
      unBlockEvents();
      changePosition = false;
    } else {
      line.style.left = `${currentLeft + 10}px`;
    }
  }, 5);
  console.log(path);
}

const blockEvents = () => {
  nextButton.removeEventListener("click", shiftRight);
  backButton.removeEventListener("click", shiftLeft);
  dotsArray.forEach((dot) =>
    dot.removeEventListener("click", changeDotByClick)
  );
};

const unBlockEvents = () => {
  nextButton.addEventListener("click", shiftRight);
  backButton.addEventListener("click", shiftLeft);
  dotsArray.forEach((dot) => dot.addEventListener("click", changeDotByClick));
};

nextButton.addEventListener("click", shiftRight);
backButton.addEventListener("click", shiftLeft);

updateDots();
