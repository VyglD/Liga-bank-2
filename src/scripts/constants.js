const FOCUS_ELEMENTS = [
  `a[href]`,
  `input:not([disabled])`,
  `button:not([disabled])`,
  `select`,
  `textarea`,
  `[tabindex]`
];

const Key = {
  ENTER: `Enter`,
  ESC: `Escape`,
  SPACE: ` `,
  TAB: `Tab`,
  SHIFT: `Shift`,
  UP: `ArrowUp`,
  DOWN: `ArrowDown`,
  LEFT: `ArrowLeft`,
  RIGHT: `ArrowRight`,
  BACKSPACE: `Backspace`,
  DELETE: `Delete`,
};

const STORAGE_KEY = `liga-bank-2`;

const Breakpoint = {
  DESKTOP: 1024,
  TABLET: 768,
};

const REGEX_DIGITS = /^\d+$/;

const CreditType = {
  MORTAGE: `Ипотечное кредитование`,
  AUTO: `Автомобильное кредитование`,
};

const Postfix = {
  RUB: ` рублей`,
  PERCENT: `%`,
  DURATION: ` лет`,
};

const Percentage = {
  NULL: 0,
  ENTIRE: 100,
};

export {
  FOCUS_ELEMENTS,
  Key,
  STORAGE_KEY,
  Breakpoint,
  REGEX_DIGITS,
  CreditType,
  Postfix,
  Percentage,
};
