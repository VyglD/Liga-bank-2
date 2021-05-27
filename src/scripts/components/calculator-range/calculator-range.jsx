import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import {
  createFormatedValueString,
  getCleanDigit,
  isLeftKey,
  isRightKey,
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
    stepRange,
    minValue,
    maxValue,
    // currentValue,
    postfix,
    rangeValue,
    onCurrentRangeValueChange,
  } = props;

  // const [rangeValue, setRangeValue] = React.useState(currentValue);

  console.log(`rangeValue`, rangeValue);

  const rangeRef = React.useRef();
  const rangePointRef = React.useRef();

  const fraction = React.useRef(100 / (maxValue - minValue) * stepRange);

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

        return applyOffsetBorders((digitValue - minValue) * fraction.current);
      },
      [minValue]
  );

  const currentOffset = React.useRef(convertValueToOffset(rangeValue));

  const calculateOffset = React.useCallback(
      (x) => {
        let offset = x - rangeRef.current.getBoundingClientRect().x;
        offset = offset < 0 ? 0 : offset;
        offset = offset > rangeRef.current.offsetWidth
          ? rangeRef.current.offsetWidth
          : offset;

        return applyOffsetBorders(offset / rangeRef.current.offsetWidth * 100);
      },
      []
  );

  const setNewRangeValue = React.useCallback(
      (offset) => {
        const newValue = Math.round(offset / fraction.current) + minValue;
        const roundOffset = Math.round(offset / fraction.current) * fraction.current;

        onCurrentRangeValueChange(createFormatedValueString(newValue, postfix));
        setOffset(roundOffset);
      },
      [minValue, onCurrentRangeValueChange, postfix, setOffset]
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
            offset = offset - fraction.current;
          } else if (isRightKey(downEvt)) {
            offset = offset + fraction.current;
          }

          setNewRangeValue(applyOffsetBorders(offset));
        }
      },
      [setNewRangeValue]
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
        </div>
        <p
          className="calculator-params__range-limit calculator-params__range-limit--min"
        >
          {minValue}
        </p>
        <p
          className="calculator-params__range-limit calculator-params__range-limit--max"
        >
          {maxValue}
        </p>
      </div>
    </React.Fragment>
  );
};

CalculatorRange.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  // currentValue: PropTypes.string.isRequired,
  postfix: PropTypes.string.isRequired,
  stepRange: PropTypes.number.isRequired,
  rangeValue: PropTypes.string.isRequired,
  onCurrentRangeValueChange: PropTypes.func.isRequired,
};

export default CalculatorRange;
