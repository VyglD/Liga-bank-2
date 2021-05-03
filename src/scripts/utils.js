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

export {
  getFocusableElements,
  isEscKeyDown,
  getNextArrayIndex,
  getPreviousArrayIndex,
};
