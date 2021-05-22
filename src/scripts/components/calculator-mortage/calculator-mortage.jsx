import React from "react";
import PropTypes from "prop-types";
import {Key} from "../../constants";

const REGEX_DIGITS = /^\d+$/;
const START_VALUE = 2_000_000;
const VALUE_STEP = 100_000;
const POSTFIX = ` рублей`;

const Value = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

const createNewValue = (newValue) => {
  return `${newValue}${POSTFIX}`;
};

const CalculatorMortage = (props) => {
  const {className = ``} = props;

  const inputRef = React.useRef();
  const errorLabelRef = React.useRef();

  const [currentValue, setCurrentValue] = React.useState(createNewValue(START_VALUE));

  const handleIncrease = React.useCallback(
      () => {
        setCurrentValue((value) => {
          const newValue = value + VALUE_STEP;

          if (newValue > Value.MAX) {
            // console.log(`invalid`);
            return value;
          }

          return createNewValue(newValue);
        });
      },
      []
  );

  const handleDecrease = React.useCallback(
      () => {
        setCurrentValue((value) => {
          const newValue = value - VALUE_STEP;

          if (newValue < Value.MIN) {
            // console.log(`invalid`);
            return value;
          }

          return createNewValue(newValue);
        });
      },
      []
  );

  const handleInput = React.useCallback(
      (evt) => {
        setCurrentValue(evt.target.value);
      },
      []
  );

  const handleKeydown = React.useCallback(
      (evt) => {
        if (
          !(REGEX_DIGITS.test(evt.key)
          || evt.key === Key.BACKSPACE
          || evt.key === Key.DELETE
          || evt.key === Key.LEFT
          || evt.key === Key.RIGHT
          || evt.key === Key.TAB
          || evt.key === Key.SHIFT)
        ) {
          evt.preventDefault();
          // console.log(`none`);
        }
      },
      []
  );

  const handleFocus = React.useCallback(
      () => {
        setCurrentValue((value) => {
          if (value.endsWith(POSTFIX)) {
            return value.replace(POSTFIX, ``);
          }

          return value;
        });
      },
      []
  );

  const handleBlur = React.useCallback(
      () => {
        setCurrentValue((value) => {
          if (REGEX_DIGITS.test(value)) {
            return createNewValue(value);
          }

          return value;
        });
      },
      []
  );

  return (
    <div className={`${className} calculator-mortage`}>
      <h3 className="calculator-mortage__title">
        Шаг 2. Введите параметры кредита
      </h3>
      <label className="calculator-mortage__label" htmlFor="estate-cost">
        Стоимость недвижимости
      </label>
      <div className="calculator-mortage__input-wrapper">
        <button
          className="calculator-mortage__input-button calculator-mortage__input-button--minus"
          type="button"
          onClick={handleDecrease}
        >
          Уменьшить стоимость
        </button>
        <p
          ref={errorLabelRef}
          className="calculator-mortage__input-error calculator-mortage__input-error--display"
        >
          Некорректное значение
        </p>
        <input
          ref={inputRef}
          className="calculator-mortage__input"
          type="text"
          value={currentValue}
          min={Value.MIN}
          max={Value.MAX}
          id="estate-cost"
          onKeyDown={handleKeydown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          className="calculator-mortage__input-button calculator-mortage__input-button--plus"
          onClick={handleIncrease}
          type="button"
        >
          Увеличить стоимость
        </button>
      </div>
      <p className="calculator-mortage__input-hint">
        От 1 200 000  до 25 000 000 рублей
      </p>
    </div>
  );
};

CalculatorMortage.propTypes = {
  className: PropTypes.string,
};

export default CalculatorMortage;