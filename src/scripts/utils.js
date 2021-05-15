import {FOCUS_ELEMENTS, Key} from "./constants";

const getFocusableElements = (container) => {
  return Array.from(
      container.querySelectorAll(FOCUS_ELEMENTS)
  );
};

const isEscKeyDown = (evt) => {
  return evt.key === Key.ESC;
};

const getNextArrayIndex = (currentIndex, arr) => {
  return (currentIndex + 1) % arr.length;
};

const getPreviousArrayIndex = (currentIndex, arr) => {
  return (currentIndex + (arr.length - 1)) % arr.length;
};

const animate = ({timing, draw, duration}) => {
  const start = performance.now();

  const animateFraction = (time) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animateFraction);
    }
  };

  requestAnimationFrame(animateFraction);
};

const trimClasses = (classes) => {
  return classes.reduce(
      (result, className) => [result, className].join(` `).trim(),
      ``
  );
};

export {
  getFocusableElements,
  isEscKeyDown,
  getNextArrayIndex,
  getPreviousArrayIndex,
  animate,
  trimClasses,
};
