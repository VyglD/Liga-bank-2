import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import {
  createFormatedValueString,
  getCleanDigit,
  isLeftKey,
  isRightKey
} from "../../utils";

const RANGE_OFFSET = `--line-progress`;

const applyOffsetBorders = (offset) => {
  if (offset < 0) {
    offset = 0;
  }

  if (offset > 100) {
    offset = 100;
  }

  return offset;
};

const CalculatorRange = (props) => {
  const {
    maxValue,
    onCurrentValueChange,
    postfix,
    minRangeValue,
    maxRangeValue,
    initRangePosition,
    currentRangeValue,
    rangePostfix,
    moving,
    onCurrentRangeValueChange,
    stepRangeValue,
  } = props;

  const rangeRef = React.useRef();
  const rangePointRef = React.useRef();

  const currentOffset = React.useRef(initRangePosition);
  const fraction = React.useRef(
      (getCleanDigit(maxRangeValue) - getCleanDigit(minRangeValue)) / 100
  );
  const minRangeDigit = React.useRef(getCleanDigit(minRangeValue));
  const initOffset = React.useRef(getCleanDigit(minRangeValue));

  const calculateOffset = React.useCallback(
      (x) => {
        let offset = x - rangeRef.current.getBoundingClientRect().left;
        offset = offset < 0 ? 0 : offset;
        offset = offset > rangeRef.current.offsetWidth
          ? rangeRef.current.offsetWidth
          : offset;

        return applyOffsetBorders(offset / rangeRef.current.offsetWidth * 100);
      },
      []
  );

  const setOffset = React.useCallback(
      (offset) => {
        const roundOffset = Math.round(applyOffsetBorders(offset) / stepRangeValue) * stepRangeValue;
        currentOffset.current = roundOffset;

        rangeRef.current.style.setProperty(RANGE_OFFSET, `${roundOffset}%`);

        const percent = Math.round(initOffset.current + fraction.current * roundOffset);
        const roundPercent = Math.round(percent / stepRangeValue) * stepRangeValue;

        onCurrentRangeValueChange(roundPercent);
      },
      [stepRangeValue, onCurrentRangeValueChange]
  );

  const setNewRangeValue = React.useCallback(
      (offset) => {
        const percent = (initOffset.current + fraction.current * offset) / 100;
        const roundPercent = Math.round(percent * 100 / stepRangeValue) * stepRangeValue / 100;
        const newValue = Math.round(getCleanDigit(maxValue) * roundPercent);

        onCurrentValueChange(createFormatedValueString(newValue, postfix));

        setOffset(offset);
      },
      [stepRangeValue, maxValue, postfix, onCurrentValueChange, setOffset]
  );

  const handleInputChange = React.useCallback(
      (value) => {
        if (typeof value === `string`) {
          const percent = (getCleanDigit(value) / getCleanDigit(maxValue) * 100);
          const offset = (percent - minRangeDigit.current) / fraction.current;

          setOffset(offset);
        }

        onCurrentValueChange(value);
      },
      [setOffset, maxValue, onCurrentValueChange]
  );

  const handleMouseMove = React.useCallback(
      (moveEvt) => {
        const offset = calculateOffset(moveEvt.clientX);

        setNewRangeValue(offset);
      },
      [calculateOffset, setNewRangeValue]
  );

  const handleMouseUp = React.useCallback(
      (upEvt) => {
        const offset = calculateOffset(upEvt.clientX);

        setNewRangeValue(offset);

        document.removeEventListener(`mousemove`, handleMouseMove);
        document.removeEventListener(`mouseup`, handleMouseUp);
      },
      [calculateOffset, setNewRangeValue, handleMouseMove]
  );

  const handleMouseDown = React.useCallback(
      (downEvt) => {
        document.addEventListener(`mousemove`, handleMouseMove);
        document.addEventListener(`mouseup`, handleMouseUp);

        const offset = calculateOffset(downEvt.clientX);

        setNewRangeValue(offset);
      },
      [handleMouseMove, handleMouseUp, calculateOffset, setNewRangeValue]
  );

  const handleTouchMove = React.useCallback(
      (moveEvt) => {
        const offset = calculateOffset(moveEvt.touches[0].pageX);

        setNewRangeValue(offset);
      },
      [calculateOffset, setNewRangeValue]
  );

  const handleTouchEnd = React.useCallback(
      (endEvt) => {
        const offset = calculateOffset(endEvt.changedTouches[0].clientX);

        setNewRangeValue(offset);

        document.removeEventListener(`touchmove`, handleTouchMove);
        document.removeEventListener(`touchend`, handleTouchEnd);
      },
      [calculateOffset, handleTouchMove, setNewRangeValue]
  );

  const handleTouchStart = React.useCallback(
      (startEvt) => {
        const offset = calculateOffset(startEvt.touches[0].pageX);

        document.addEventListener(`touchmove`, handleTouchMove);
        document.addEventListener(`touchend`, handleTouchEnd);

        setNewRangeValue(offset);
      },
      [calculateOffset, handleTouchMove, handleTouchEnd, setNewRangeValue]
  );

  const handleArrowDown = React.useCallback(
      (downEvt) => {
        if (isLeftKey(downEvt) || isRightKey(downEvt)) {
          let offset = currentOffset.current;

          if (isLeftKey(downEvt)) {
            offset = --offset;
          } else if (isRightKey(downEvt)) {
            offset = ++offset;
          }

          offset = applyOffsetBorders(offset);

          setNewRangeValue(offset);
        }
      },
      [setNewRangeValue]
  );

  return (
    <React.Fragment>
      <CalculatorInput
        {...props}
        onCurrentValueChange={handleInputChange}
      />
      <div className="calculator-params__range">
        <div
          ref={rangeRef}
          className="calculator-params__range-button-wrapper"
        >
          <button
            ref={rangePointRef}
            className="calculator-params__range-button"
            type="button"
            aria-label="Изменить значение"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onKeyDown={handleArrowDown}
          />
          {
            moving && (
              <p className="calculator-params__range-button-value">
                {createFormatedValueString(currentRangeValue, rangePostfix)}
              </p>
            )
          }
        </div>
        {
          !moving && (
            <React.Fragment>
              <p
                className="calculator-params__range-limit calculator-params__range-limit--min"
              >
                {minRangeValue}
              </p>
              <p
                className="calculator-params__range-limit calculator-params__range-limit--max"
              >
                {maxRangeValue}
              </p>
            </React.Fragment>
          )
        }
      </div>
    </React.Fragment>
  );
};

CalculatorRange.defaultProps = {
  rangePostfix: ``,
  postfix: ``,
  moving: false,
  initRangePosition: 0,
  stepRangeValue: 1,
};

CalculatorRange.propTypes = {
  maxValue: PropTypes.number.isRequired,
  onCurrentValueChange: PropTypes.func.isRequired,
  postfix: PropTypes.string,
  minRangeValue: PropTypes.string.isRequired,
  maxRangeValue: PropTypes.string.isRequired,
  initRangePosition: PropTypes.number,
  currentRangeValue: PropTypes.number.isRequired,
  rangePostfix: PropTypes.string,
  moving: PropTypes.bool,
  onCurrentRangeValueChange: PropTypes.func.isRequired,
  stepRangeValue: PropTypes.number,
};

export default CalculatorRange;
