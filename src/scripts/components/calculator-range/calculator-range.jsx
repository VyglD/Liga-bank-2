import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import {createFormatedValueString, isLeftKey, isRightKey} from "../../utils";

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
    minRangeValue,
    maxRangeValue,
    initRangePosition,
    currentRangeValue,
    rangePostfix,
    moving,
  } = props;

  const rangeRef = React.useRef();
  const rangePointRef = React.useRef();

  const currentOffset = React.useRef(initRangePosition);

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
        offset = applyOffsetBorders(offset);

        currentOffset.current = offset;

        rangeRef.current.style.setProperty(RANGE_OFFSET, `${offset}%`);
      },
      []
  );

  const handleMouseMove = React.useCallback(
      (moveEvt) => {
        const offset = calculateOffset(moveEvt.clientX);

        setOffset(offset);
      },
      [calculateOffset, setOffset]
  );

  const handleMouseUp = React.useCallback(
      (upEvt) => {
        const offset = calculateOffset(upEvt.clientX);

        setOffset(offset);

        document.removeEventListener(`mousemove`, handleMouseMove);
        document.removeEventListener(`mouseup`, handleMouseUp);
      },
      [calculateOffset, setOffset, handleMouseMove]
  );

  const handleMouseDown = React.useCallback(
      (downEvt) => {
        document.addEventListener(`mousemove`, handleMouseMove);
        document.addEventListener(`mouseup`, handleMouseUp);

        const offset = calculateOffset(downEvt.clientX);

        setOffset(offset);
      },
      [handleMouseMove, handleMouseUp, calculateOffset, setOffset]
  );

  const handleTouchMove = React.useCallback(
      (moveEvt) => {
        const offset = calculateOffset(moveEvt.touches[0].pageX);

        setOffset(offset);
      },
      [calculateOffset, setOffset]
  );

  const handleTouchEnd = React.useCallback(
      (endEvt) => {
        const offset = calculateOffset(endEvt.changedTouches[0].clientX);

        setOffset(offset);

        document.removeEventListener(`touchmove`, handleTouchMove);
        document.removeEventListener(`touchend`, handleTouchEnd);
      },
      [calculateOffset, handleTouchMove, setOffset]
  );

  const handleTouchStart = React.useCallback(
      (startEvt) => {
        const offset = calculateOffset(startEvt.touches[0].pageX);

        document.addEventListener(`touchmove`, handleTouchMove);
        document.addEventListener(`touchend`, handleTouchEnd);

        setOffset(offset);
      },
      [calculateOffset, handleTouchMove, handleTouchEnd, setOffset]
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

          setOffset(offset);
        }
      },
      [setOffset]
  );

  return (
    <React.Fragment>
      <CalculatorInput
        {...props}
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
  moving: false,
  initRangePosition: 0,
};

CalculatorRange.propTypes = {
  minRangeValue: PropTypes.string.isRequired,
  maxRangeValue: PropTypes.string.isRequired,
  initRangePosition: PropTypes.number,
  currentRangeValue: PropTypes.number.isRequired,
  rangePostfix: PropTypes.string,
  moving: PropTypes.bool,
};

export default CalculatorRange;
