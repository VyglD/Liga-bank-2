import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import CalculatorRangeDuration from "../calculator-range-duration/calculator-range-duration";
import CalculatorRange from "../calculator-range/calculator-range";
import {
  // getFormatedDigitString,
  // getCleanDigit,
  createFormatedValueString, getCleanDigit,
} from "../../utils";
import {InputPostfix} from "../../constants";

const INIT_COST_VALUE = 2_000_000;

const CostLimit = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

const DURATION_STEP = 1;

const DurationLimit = {
  MIN: 5,
  MAX: 30,
};

// const PaymentLimit = {
//   MIN: 10,
//   MAX: 100,
// };

// const DurationLimit = {
//   MIN: 5,
//   MAX: 30,
// };

// const InputPostfix = {
//   COST: ` рублей`,
//   PAYMENT: `%`,
//   DURATION: ` лет`,
// };

const COST_STEP = 100_000;

// const Step = {
//   COST: 100_000,
//   PAYMENT: 5,
//   DURATION: 1,
// };

const CalculatorParams = (props) => {
  const {className = ``} = props;

  const [
    currentFormatedCostString,
    setCurrentFormatedCostString
  ] = React.useState(createFormatedValueString(INIT_COST_VALUE, InputPostfix.COST));

  // const calcMinPayment = React.useCallback(
  //     (cost) => getCleanDigit(cost) * PaymentLimit.MIN / PaymentLimit.MAX,
  //     []
  // );

  // const calcMaxPayment = React.useCallback(
  //     (cost) => {
  //       // TODO: ИСПРАВИТЬ ПО ТЗ
  //       // console.log(`ё)ж

  //       return getCleanDigit(cost) * PaymentLimit.MAX / PaymentLimit.MAX;
  //     },
  //     []
  // );

  // const [currentPayment, setCurrentPayment] = React.useState(
  //     createFormatedValueString(calcMinPayment(currentCost), Postfix.COST)
  // );

  // const [currentPercent, setCurrentPercent] = React.useState(PaymentLimit.MIN);

  // const [currentDuration, setCurrentDuration] = React.useState(
  //     () => {
  //       return createFormatedValueString(DurationLimit.MIN, Postfix.DURATION);
  //     }
  // );

  // const [currentRangeDuration, setCurrentRangeDuration] = React.useState(DurationLimit.MIN);

  // createFormatedValueString(currentRangeDuration, Postfix.DURATION)

  const minPayment = 0.1 * getCleanDigit(currentFormatedCostString);
  const maxPayment = 1 * getCleanDigit(currentFormatedCostString);
  const paymentStep = 5;

  const [
    currentFormatedPaymentString,
    setCurrentFormatedPaymentString
  ] = React.useState(createFormatedValueString(minPayment, InputPostfix.COST));

  React.useEffect(
      () => {
        setCurrentFormatedPaymentString(createFormatedValueString(minPayment, InputPostfix.COST));
        console.log(`change`);
      },
      [minPayment]
  );

  console.log(minPayment, currentFormatedPaymentString);

  const [
    currentFormatedDurationString,
    setCurrentFormatedDurationString
  ] = React.useState(createFormatedValueString(10, InputPostfix.DURATION));

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
        stepValue={COST_STEP}
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
        stepValue={COST_STEP}
        // currentValue={currentFormatedPaymentString}
        // onCurrentValueChange={setCurrentFormatedPaymentString}
        postfix={InputPostfix.COST}
        minStrict={true}
        stepRange={paymentStep}
        rangeValue={currentFormatedPaymentString}
        onCurrentRangeValueChange={setCurrentFormatedPaymentString}
      />
      <CalculatorRange
        labelText="Срок кредитования"
        inputId="input-duration"
        minValue={DurationLimit.MIN}
        maxValue={DurationLimit.MAX}
        stepValue={DURATION_STEP}
        // currentValue={currentFormatedDurationString}
        // onCurrentValueChange={setCurrentFormatedDurationString}
        postfix={InputPostfix.DURATION}
        strict={true}
        stepRange={1}
        rangeValue={currentFormatedDurationString}
        onCurrentRangeValueChange={setCurrentFormatedDurationString}
      />
      {/* <CalculatorRangeDuration /> */}
      {/* <CalculatorRange
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
      /> */}
      {/* <CalculatorRange
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
      /> */}
    </div>
  );
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
};

export default CalculatorParams;
