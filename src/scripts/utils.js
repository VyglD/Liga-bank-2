import {FOCUS_ELEMENTS, REGEX_DIGITS} from "./constants";

const getFocusableElements = (container) => {
  return Array.from(
      container.querySelectorAll(FOCUS_ELEMENTS)
  );
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

const getCleanDigit = (dirtyValue) => {
  if (typeof dirtyValue === `number`) {
    return dirtyValue;
  }

  const cleanDigit = parseInt(
      String(dirtyValue).split(``).filter((char) => REGEX_DIGITS.test(char)).join(``),
      10
  );

  if (isNaN(cleanDigit)) {
    return 0;
  }

  return cleanDigit;
};

const getFormatedDigitString = (value) => {
  if (typeof value === `string`) {
    value = getCleanDigit(value);
  }

  return value.toLocaleString();
};

const createFormatedValueString = (value, postfix) => {
  return `${getFormatedDigitString(value)}${postfix}`;
};

const hidePageScrollbar = () => {
  const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

  document.body.style.paddingRight = paddingOffset;
  document.body.style.overflow = `hidden`;
};

const displayPageScrollbar = () => {
  document.body.style.paddingRight = `0`;
  document.body.style.overflow = `auto`;
};

export {
  getFocusableElements,
  getNextArrayIndex,
  getPreviousArrayIndex,
  animate,
  trimClasses,
  getCleanDigit,
  getFormatedDigitString,
  createFormatedValueString,
  hidePageScrollbar,
  displayPageScrollbar,
};
