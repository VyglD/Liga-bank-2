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
};

const STORAGE_KEY = `liga-bank-2`;

const Breakpoint = {
  DESKTOP: 1024,
  TABLET: 768,
};

export {
  FOCUS_ELEMENTS,
  Key,
  STORAGE_KEY,
  Breakpoint
};
