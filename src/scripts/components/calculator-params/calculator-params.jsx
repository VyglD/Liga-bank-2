import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import CalculatorRange from "../calculator-range/calculator-range";
import {
  // getFormatedDigitString,
  // getCleanDigit,
  createFormatedValueString, getCleanDigit,
} from "../../utils";

const INIT_COST_VALUE = 2_000_000;

const CostLimit = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

const DurationLimit = {
  MIN: 5,
  MAX: 30,
};

// const PaymentLimit = {
//   MIN: 10,
//   MAX: 100,
// };

const InputPostfix = {
  COST: ` рублей`,
  PAYMENT: `%`,
  DURATION: ` лет`,
};

const Step = {
  COST: 100_000,
  PAYMENT: 5,
  DURATION: 1,
};

const CalculatorParams = (props) => {
  const {className = ``} = props;

  const [
    currentFormatedCostString,
    setCurrentFormatedCostString
  ] = React.useState(createFormatedValueString(INIT_COST_VALUE, InputPostfix.COST));

  const minPayment = 0.1 * getCleanDigit(currentFormatedCostString);
  const maxPayment = 1 * getCleanDigit(currentFormatedCostString);

  const [
    currentFormatedPaymentString,
    setCurrentFormatedPaymentString
  ] = React.useState(createFormatedValueString(minPayment, InputPostfix.COST));

  const [
    currentFormatedDurationString,
    setCurrentFormatedDurationString
  ] = React.useState(createFormatedValueString(DurationLimit.MIN, InputPostfix.DURATION));

  React.useEffect(
      () => {
        const oldPayment = getCleanDigit(currentFormatedPaymentString);
        let newPayment = oldPayment;

        if (oldPayment < minPayment) {
          newPayment = minPayment;
        } else if (oldPayment > maxPayment) {
          newPayment = maxPayment;
        }

        setCurrentFormatedPaymentString(createFormatedValueString(newPayment, InputPostfix.COST));
      },
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      [minPayment, maxPayment]
  );

  const formateRangePayment = React.useCallback(
      (value) => {
        const newValue = Math.round(getCleanDigit(value) / maxPayment * 100);

        return createFormatedValueString(newValue, InputPostfix.PAYMENT);
      },
      [maxPayment]
  );

  return (
    <div className={`${className} calculator-params`}>
      <h3 className="calculator-params__title">
        Шаг 2. Введите параметры кредита
      </h3>
      <CalculatorInput
        labelText="Стоимость недвижимости"
        inputId="input-cost"
        minValue={CostLimit.MIN}
        maxValue={CostLimit.MAX}
        stepValue={Step.COST}
        currentValue={currentFormatedCostString}
        onCurrentValueChange={setCurrentFormatedCostString}
        postfix={InputPostfix.COST}
        controls={true}
        hint={true}
      />
      <CalculatorRange
        labelText="Первоначальный взнос"
        inputId="input-payment"
        minValue={minPayment}
        maxValue={maxPayment}
        stepValue={Step.COST}
        postfix={InputPostfix.COST}
        minStrict={true}
        stepRange={Step.PAYMENT}
        rangeValue={currentFormatedPaymentString}
        onCurrentRangeValueChange={setCurrentFormatedPaymentString}
        formateRangeValue={formateRangePayment}
        moving={true}
      />
      <CalculatorRange
        labelText="Срок кредитования"
        inputId="input-duration"
        minValue={DurationLimit.MIN}
        maxValue={DurationLimit.MAX}
        stepValue={Step.DURATION}
        postfix={InputPostfix.DURATION}
        strict={true}
        stepRange={Step.DURATION}
        rangeValue={currentFormatedDurationString}
        onCurrentRangeValueChange={setCurrentFormatedDurationString}
      />
    </div>
  );
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
};

export default CalculatorParams;
