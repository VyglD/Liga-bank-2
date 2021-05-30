import React from "react";
import PropTypes from "prop-types";
import {
  getCleanDigit,
  getFormatedDigitString,
  createFormatedValueString
} from "../../utils";
import {Key, REGEX_DIGITS} from "../../constants";

const WRAPPER_CLASS = `calculator-params__input-wrapper`;

const CustomClass = {
  WRAPPER: WRAPPER_CLASS,
  WRAPPER_INVALID: `${WRAPPER_CLASS}--invalid`,
};

const getDefaultStepValue = (min, max) => {
  return parseInt((max - min) / 10, 10);
};

const CalculatorInput = (props) => {
  const {
    labelClassName,
    labelText,
    inputClassName,
    inputId,
    minValue,
    maxValue,
    stepValue = getDefaultStepValue(minValue, maxValue),
    currentValue,
    onCurrentValueChange,
    postfix,
    controls,
    hint,
    strict,
    minStrict,
    maxStrict,
    onValidStatusChange,
  } = props;

  const inputWrapperRef = React.useRef();
  const inputRef = React.useRef();

  const handleNewValue = React.useCallback(
      (newValue) => {
        const digitValue = getCleanDigit(newValue);
        const isLess = digitValue < minValue;
        const isBigger = digitValue > maxValue;
        const isInaccurate = !(strict || minStrict || maxStrict);

        if (isInaccurate && (isLess || isBigger)) {
          if (!inputWrapperRef.current.classList.contains(CustomClass.WRAPPER_INVALID)) {
            inputWrapperRef.current.classList.add(CustomClass.WRAPPER_INVALID);

            onValidStatusChange(false);
          }

          if (digitValue < 0) {
            return 0;
          }
        } else if (inputWrapperRef.current.classList.contains(CustomClass.WRAPPER_INVALID)) {
          inputWrapperRef.current.classList.remove(CustomClass.WRAPPER_INVALID);

          onValidStatusChange(true);
        }

        return newValue;
      },
      [strict, minStrict, maxStrict, minValue, maxValue, onValidStatusChange]
  );

  const handleIncrease = React.useCallback(
      () => {
        onCurrentValueChange((value) => {
          value = getCleanDigit(value);
          const newValue = value + stepValue;

          return createFormatedValueString(handleNewValue(newValue), postfix);
        });
      },
      [onCurrentValueChange, stepValue, handleNewValue, postfix]
  );

  const handleDecrease = React.useCallback(
      () => {
        onCurrentValueChange((value) => {
          value = getCleanDigit(value);
          const newValue = value - stepValue;

          return createFormatedValueString(handleNewValue(newValue), postfix);
        });
      },
      [onCurrentValueChange, stepValue, handleNewValue, postfix]
  );

  const handleInput = React.useCallback(
      (evt) => {
        onCurrentValueChange(handleNewValue(evt.target.value));
      },
      [onCurrentValueChange, handleNewValue]
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
        }
      },
      []
  );

  const handleFocus = React.useCallback(
      () => {
        onCurrentValueChange((value) => {

          return getFormatedDigitString(value);
        });
      },
      [onCurrentValueChange]
  );

  const handleBlur = React.useCallback(
      () => {
        onCurrentValueChange((value) => {
          let newValue = getCleanDigit(value);
          const isLess = newValue < minValue;
          const isBigger = newValue > maxValue;

          if (isLess && (strict || minStrict)) {
            newValue = minValue;
          } else if (isBigger && (strict || maxStrict)) {
            newValue = maxValue;
          }

          return createFormatedValueString(newValue, postfix);
        });
      },
      [strict, minStrict, maxStrict, minValue, maxValue, onCurrentValueChange, postfix]
  );

  return (
    <React.Fragment>
      {
        labelText && (
          <label className={labelClassName} htmlFor={inputId}>
            {labelText}
          </label>
        )
      }
      <div
        ref={inputWrapperRef}
        className={CustomClass.WRAPPER}
      >
        {
          controls && (
            <button
              className="calculator-params__input-button calculator-params__input-button--minus"
              type="button"
              onClick={handleDecrease}
            >
              Уменьшить
            </button>
          )
        }
        <p className="calculator-params__input-error">Некорректное значение</p>
        <input
          ref={inputRef}
          className={inputClassName}
          type="text"
          value={currentValue}
          min={minValue}
          max={maxValue}
          id={inputId}
          onKeyDown={handleKeydown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {
          controls && (
            <button
              className="calculator-params__input-button calculator-params__input-button--plus"
              onClick={handleIncrease}
              type="button"
            >
              Увеличить
            </button>
          )
        }
      </div>
      {
        hint && (
          <p className="calculator-params__input-hint">
            От {getFormatedDigitString(minValue)} до {createFormatedValueString(maxValue, postfix)}
          </p>
        )
      }
    </React.Fragment>
  );
};

CalculatorInput.defaultProps = {
  labelClassName: `calculator-params__label`,
  labelText: ``,
  inputClassName: `calculator-params__input`,
  postfix: ``,
  controls: false,
  strict: false,
  minStrict: false,
  maxStrict: false,
  hint: false,
  onValidStatusChange: () => {},
};

CalculatorInput.propTypes = {
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  inputClassName: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  stepValue: PropTypes.number,
  currentValue: PropTypes.string.isRequired,
  onCurrentValueChange: PropTypes.func.isRequired,
  postfix: PropTypes.string,
  controls: PropTypes.bool,
  strict: PropTypes.bool,
  minStrict: PropTypes.bool,
  maxStrict: PropTypes.bool,
  hint: PropTypes.bool,
  onValidStatusChange: PropTypes.func,
};

export default CalculatorInput;
