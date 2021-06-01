import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import {
  createFormatedValueString,
  getCleanDigit,
} from "../../utils";
import {Percentage, Key} from "../../constants";

const RANGE_OFFSET = `--line-progress`;

const applyOffsetBorders = (offset) => {
  if (typeof offset !== `number` || offset < Percentage.NULL) {
    return Percentage.NULL;
  } else if (offset > Percentage.ENTIRE) {
    return Percentage.ENTIRE;
  }

  return offset;
};

const calculateFraction = (maxValue, minValue) => {
  return (maxValue - minValue) === 0
    ? 0
    : Percentage.ENTIRE / (maxValue - minValue);
};

const CalculatorRange = (props) => {
  const {
    stepRange,
    minValue,
    maxValue,
    postfix,
    rangeValue,
    onCurrentRangeValueChange,
    formateRangeValue,
    moving,
    rangeClass,
  } = props;

  const rangeRef = React.useRef();

  const fraction = calculateFraction(maxValue, minValue);

  const setOffset = React.useCallback(
      (offset) => {
        currentOffset.current = offset;
        rangeRef.current.style.setProperty(RANGE_OFFSET, `${offset}%`);
      },
      []
  );

  const convertValueToOffset = React.useCallback(
      (value) => {
        const digitValue = getCleanDigit(value);

        return applyOffsetBorders((digitValue - minValue) * fraction);
      },
      [minValue, fraction]
  );

  const currentOffset = React.useRef(convertValueToOffset(rangeValue));

  const calculateOffset = React.useCallback(
      (x) => {
        let offset = x - rangeRef.current.getBoundingClientRect().x;
        offset = offset < Percentage.NULL ? Percentage.NULL : offset;
        offset = offset > rangeRef.current.offsetWidth
          ? rangeRef.current.offsetWidth
          : offset;

        return applyOffsetBorders(
            offset / rangeRef.current.offsetWidth * Percentage.ENTIRE
        );
      },
      []
  );

  const setNewRangeValue = React.useCallback(
      (offset) => {
        const roundValue = Math.ceil(maxValue / Percentage.ENTIRE * stepRange);
        const dirtyNewValue = Math.round(offset / fraction) + minValue;
        const roundNewValue = Math.round(dirtyNewValue / roundValue) * roundValue;
        const cleanNewValue = roundNewValue - minValue;
        const roundNewOffset = cleanNewValue === Percentage.NULL
          ? Percentage.NULL
          : Math.round((roundNewValue - minValue) / (maxValue - minValue) * Percentage.ENTIRE);

        onCurrentRangeValueChange(createFormatedValueString(roundNewValue, postfix));
        setOffset(roundNewOffset);
      },
      [minValue, maxValue, fraction, onCurrentRangeValueChange, postfix, setOffset, stepRange]
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
        const isLeft = downEvt.key === Key.LEFT;
        const isRight = downEvt.key === Key.RIGHT;

        if (isLeft || isRight) {
          const step = Math.max(fraction, stepRange);
          const offset = isLeft
            ? currentOffset.current - step
            : currentOffset.current + step;

          setNewRangeValue(applyOffsetBorders(offset));
        }
      },
      [setNewRangeValue, stepRange, fraction]
  );

  React.useEffect(
      () => {
        setOffset(convertValueToOffset(rangeValue));
      },
      [setOffset, convertValueToOffset, rangeValue]
  );

  return (
    <React.Fragment>
      <CalculatorInput
        {...props}
        onCurrentValueChange={onCurrentRangeValueChange}
        currentValue={rangeValue}
      />
      <div
        ref={rangeRef}
        className={`calculator-params__range ${rangeClass}`}
      >
        <div className="calculator-params__range-line">
          <button
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
                {formateRangeValue(rangeValue, postfix)}
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
                {formateRangeValue(minValue, postfix)}
              </p>
              <p
                className="calculator-params__range-limit calculator-params__range-limit--max"
              >
                {formateRangeValue(maxValue, postfix)}
              </p>
            </React.Fragment>
          )
        }
      </div>
    </React.Fragment>
  );
};

CalculatorRange.defaultProps = {
  formateRangeValue: (view, postfix) => createFormatedValueString(view, postfix),
  moving: false,
  rangeClass: ``,
};

CalculatorRange.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  postfix: PropTypes.string.isRequired,
  stepRange: PropTypes.number.isRequired,
  rangeValue: PropTypes.string.isRequired,
  onCurrentRangeValueChange: PropTypes.func.isRequired,
  formateRangeValue: PropTypes.func,
  moving: PropTypes.bool,
  rangeClass: PropTypes.string,
};

export default CalculatorRange;
