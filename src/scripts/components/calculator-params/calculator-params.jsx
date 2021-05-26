import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import CalculatorRange from "../calculator-range/calculator-range";
import {
  getFormatedDigitString,
  getCleanDigit,
  createFormatedValueString,
} from "../../utils";

const INIT_COST_VALUE = 2_000_000;

const CostLimit = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

const PaymentLimit = {
  MIN: 10,
  MAX: 100,
};

const DurationLimit = {
  MIN: 5,
  MAX: 30,
};

const Postfix = {
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

  const [currentCost, setCurrentCost] = React.useState(
      () => {
        return `${getFormatedDigitString(INIT_COST_VALUE)}${Postfix.COST}`;
      }
  );

  const calcMinPayment = React.useCallback(
      (cost) => getCleanDigit(cost) * PaymentLimit.MIN / PaymentLimit.MAX,
      []
  );

  const calcMaxPayment = React.useCallback(
      (cost) => {
        // TODO: ИСПРАВИТЬ ПО ТЗ
        // console.log(`ё)ж

        return getCleanDigit(cost) * PaymentLimit.MAX / PaymentLimit.MAX;
      },
      []
  );

  const [currentPayment, setCurrentPayment] = React.useState(
      () => {
        return createFormatedValueString(
            calcMinPayment(currentCost),
            Postfix.COST
        );
      }
  );

  const [currentPercent, setCurrentPercent] = React.useState(PaymentLimit.MIN);

  const [currentDuration, setCurrentDuration] = React.useState(
      () => {
        return createFormatedValueString(DurationLimit.MIN, Postfix.DURATION);
      }
  );

  // const [currentRangeDuration, setCurrentRangeDuration] = React.useState(DurationLimit.MIN);

  // createFormatedValueString(currentRangeDuration, Postfix.DURATION)

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
        currentValue={currentCost}
        onCurrentValueChange={setCurrentCost}
        postfix={Postfix.COST}
        controls={true}
        hint={true}
      />
      <CalculatorRange
        labelText="Первоначальный взнос"
        inputId="input-payment"
        minValue={calcMinPayment(currentCost)}
        maxValue={calcMaxPayment(currentCost)}
        stepValue={Step.COST}
        currentValue={currentPayment}
        onCurrentValueChange={setCurrentPayment}
        postfix={Postfix.COST}
        minStrict={true}
        minRangeValue={createFormatedValueString(PaymentLimit.MIN, Postfix.PAYMENT)}
        maxRangeValue={createFormatedValueString(PaymentLimit.MAX, Postfix.PAYMENT)}
        currentRangeValue={currentPercent}
        onCurrentRangeValueChange={setCurrentPercent}
        rangePostfix={Postfix.PAYMENT}
        moving={true}
        stepRangeValue={Step.PAYMENT}
      />
      <CalculatorRange
        labelText="Срок кредитования"
        inputId="input-duration"
        minValue={DurationLimit.MIN}
        maxValue={DurationLimit.MAX}
        stepValue={Step.DURATION}
        currentValue={currentDuration}
        onCurrentValueChange={setCurrentDuration}
        postfix={Postfix.DURATION}
        strict={true}
        minRangeValue={createFormatedValueString(DurationLimit.MIN, Postfix.DURATION)}
        maxRangeValue={createFormatedValueString(DurationLimit.MAX, Postfix.DURATION)}
        // currentRangeValue={currentRangeDuration}
        // onCurrentRangeValueChange={setCurrentRangeDuration}
        currentRangeValue={0}
        onCurrentRangeValueChange={() => {}}
        rangePostfix={Postfix.DURATION}
        stepRangeValue={Step.DURATION}
      />
    </div>
  );
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
};

export default CalculatorParams;
