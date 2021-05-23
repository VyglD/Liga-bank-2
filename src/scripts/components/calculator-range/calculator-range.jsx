import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import {createFormatedValueString} from "../../utils";

const CalculatorRange = (props) => {
  const {
    minRangeValue,
    maxRangeValue,
    currentRangeValue,
    rangePostfix,
  } = props;

  return (
    <React.Fragment>
      <CalculatorInput
        {...props}
      />
      <div className="calculator-params__range">
        <p
          className="calculator-params__range-limit calculator-params__range-limit--min"
        >
          {minRangeValue}
        </p>
        <button type="button" aria-label="Изменить значение">
          {createFormatedValueString(currentRangeValue, rangePostfix)}
        </button>
        <p
          className="calculator-params__range-limit calculator-params__range-limit--max"
        >
          {maxRangeValue}
        </p>
      </div>
    </React.Fragment>
  );
};

CalculatorRange.defaultProps = {
  rangePostfix: ``,
};

CalculatorRange.propTypes = {
  minRangeValue: PropTypes.string.isRequired,
  maxRangeValue: PropTypes.string.isRequired,
  currentRangeValue: PropTypes.number.isRequired,
  rangePostfix: PropTypes.string,
};

export default CalculatorRange;
