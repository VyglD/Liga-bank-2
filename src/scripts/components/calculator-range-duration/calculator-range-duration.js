import React from "react";
import CalculatorRange from "../calculator-range/calculator-range";
import {createFormatedValueString} from "../../utils";
import {InputPostfix} from "../../constants";

const DURATION_STEP = 1;

const DurationLimit = {
  MIN: 5,
  MAX: 30,
};

const CalculatorRangeDuration = () => {
  const [
    currentFormatedDurationString,
    setCurrentFormatedDurationString
  ] = React.useState(createFormatedValueString(10, InputPostfix.DURATION));

  return (
    <CalculatorRange
      labelText="Срок кредитования"
      inputId="input-duration"
      minValue={DurationLimit.MIN}
      maxValue={DurationLimit.MAX}
      stepValue={DURATION_STEP}
      currentValue={currentFormatedDurationString}
      onCurrentValueChange={setCurrentFormatedDurationString}
      postfix={InputPostfix.DURATION}
      strict={true}
      stepRange={1}
    />
  );
};

CalculatorRangeDuration.propTypes = {};

export default CalculatorRangeDuration;
