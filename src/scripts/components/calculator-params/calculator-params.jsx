import React from "react";
import PropTypes from "prop-types";
import {Key} from "../../constants";

const REGEX_DIGITS = /^\d+$/;
const START_VALUE = 2_000_000;
const VALUE_STEP = 100_000;
const POSTFIX = ` рублей`;

const WRAPPER_CLASS = `calculator-params__input-wrapper`;

const CustomClass = {
  WRAPPER: WRAPPER_CLASS,
  WRAPPER_INVALID: `${WRAPPER_CLASS}--invalid`,
};

const Value = {
  MIN: 1_200_000,
  MAX: 25_000_000,
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

const getFormatedValue = (value) => {
  if (typeof value === `string`) {
    value = getCleanDigit(value);
  }

  return value.toLocaleString();
};

const createNewValue = (newValue) => {
  return `${getFormatedValue(newValue)}${POSTFIX}`;
};

const isValueInvalid = (value) => {
  return value < Value.MIN || value > Value.MAX;
};

const CalculatorParams = (props) => {
  const {className = ``} = props;

  const inputWrapperRef = React.useRef();
  const inputRef = React.useRef();

  const [currentValue, setCurrentValue] = React.useState(createNewValue(START_VALUE));

  const handleNewValue = React.useCallback(
      (newValue) => {
        const digitValue = getCleanDigit(newValue);

        if (isValueInvalid(digitValue)) {
          if (!inputWrapperRef.current.classList.contains(CustomClass.WRAPPER_INVALID)) {
            inputWrapperRef.current.classList.add(CustomClass.WRAPPER_INVALID);
          }

          if (digitValue < 0) {
            return 0;
          }
        } else if (inputWrapperRef.current.classList.contains(CustomClass.WRAPPER_INVALID)) {
          inputWrapperRef.current.classList.remove(CustomClass.WRAPPER_INVALID);
        }

        return newValue;
      },
      []
  );

  const handleIncrease = React.useCallback(
      () => {
        setCurrentValue((value) => {
          value = getCleanDigit(value);
          const newValue = value + VALUE_STEP;

          return createNewValue(handleNewValue(newValue));
        });
      },
      [handleNewValue]
  );

  const handleDecrease = React.useCallback(
      () => {
        setCurrentValue((value) => {
          value = getCleanDigit(value);
          const newValue = value - VALUE_STEP;

          return createNewValue(handleNewValue(newValue));
        });
      },
      [handleNewValue]
  );

  const handleInput = React.useCallback(
      (evt) => {
        setCurrentValue(handleNewValue(evt.target.value));
      },
      [handleNewValue]
  );

  const handleKeydown = React.useCallback(
      (evt) => {
        if (
          !(REGEX_DIGITS.test(evt.key)
          || evt.key === Key.SPACE
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
          return getFormatedValue(value);
        });
      },
      []
  );

  const handleBlur = React.useCallback(
      () => {
        setCurrentValue((value) => {
          return createNewValue(value);
        });
      },
      []
  );

  return (
    <div className={`${className} calculator-params`}>
      <h3 className="calculator-params__title">
        Шаг 2. Введите параметры кредита
      </h3>
      <label className="calculator-params__label" htmlFor="estate-cost">
        Стоимость недвижимости
      </label>
      <div
        ref={inputWrapperRef}
        className={CustomClass.WRAPPER}
      >
        <button
          className="calculator-params__input-button calculator-params__input-button--minus"
          type="button"
          onClick={handleDecrease}
        >
          Уменьшить стоимость
        </button>
        <p className="calculator-params__input-error">Некорректное значение</p>
        <input
          ref={inputRef}
          className="calculator-params__input"
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
          className="calculator-params__input-button calculator-params__input-button--plus"
          onClick={handleIncrease}
          type="button"
        >
          Увеличить стоимость
        </button>
      </div>
      <p className="calculator-params__input-hint">
        От 1 200 000  до 25 000 000 рублей
      </p>
    </div>
  );
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
};

export default CalculatorParams;
