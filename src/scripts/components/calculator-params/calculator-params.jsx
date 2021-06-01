import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import CalculatorRange from "../calculator-range/calculator-range";
import CalculatorOffer from "../calculator-offer/calculator-offer";
import {
  createFormatedValueString,
  getCleanDigit,
  getFormatedDigitString,
} from "../../utils";
import {Postfix, Percentage} from "../../constants";
import {limitType, stepType} from "../../types";

const CalculatorParams = (props) => {
  const {children, className, calculatorParams, onApplicationCreate} = props;
  const {
    initCostValue,
    Step,
    PaymentLimit,
    DurationLimit,
    CostLimit,
    minAmount,
    calculateAmount,
    calculatePercentRate,
    costTitle,
    offerTitle,
    creditProperty,
  } = calculatorParams;

  const [
    currentFormatedCostString,
    setCurrentFormatedCostString
  ] = React.useState(createFormatedValueString(initCostValue, Postfix.RUB));

  const [isCorrectCost, setCostStatus] = React.useState(true);

  const minPayment = Math.round(PaymentLimit.MIN * getCleanDigit(currentFormatedCostString));
  const maxPayment = Math.round(PaymentLimit.MAX * getCleanDigit(currentFormatedCostString));

  const [
    currentFormatedPaymentString,
    setCurrentFormatedPaymentString
  ] = React.useState(createFormatedValueString(minPayment, Postfix.RUB));

  const [
    currentFormatedDurationString,
    setCurrentFormatedDurationString
  ] = React.useState(createFormatedValueString(DurationLimit.MIN, Postfix.DURATION));

  React.useEffect(
      () => {
        const oldPayment = getCleanDigit(currentFormatedPaymentString);
        let newPayment = oldPayment;

        if (oldPayment < minPayment) {
          newPayment = minPayment;
        } else if (oldPayment > maxPayment) {
          newPayment = maxPayment;
        }

        setCurrentFormatedPaymentString(createFormatedValueString(newPayment, Postfix.RUB));
      },
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      [minPayment, maxPayment]
  );

  const formateRangePayment = React.useCallback(
      (value) => {
        let newValue = 0;

        if (maxPayment !== 0) {
          newValue = Math.round(getCleanDigit(value) / maxPayment * Percentage.ENTIRE);
        }

        return createFormatedValueString(newValue, Postfix.PERCENT);
      },
      [maxPayment]
  );

  const cost = getCleanDigit(currentFormatedCostString);
  const firstPayment = getCleanDigit(currentFormatedPaymentString);
  const amount = calculateAmount(cost, firstPayment);
  const percentRate = calculatePercentRate(cost, firstPayment);
  const years = getCleanDigit(currentFormatedDurationString);

  const handleButtonClick = React.useCallback(
      () => {
        const application = {
          cost: currentFormatedCostString,
          firstPayment: currentFormatedPaymentString,
          duration: currentFormatedDurationString,
        };

        onApplicationCreate(application);
      },
      [
        currentFormatedCostString,
        currentFormatedPaymentString,
        currentFormatedDurationString,
        onApplicationCreate
      ]
  );

  return (
    <div className={`${className} calculator-params`}>
      <div className="calculator-params__params-wrapper">
        <h3 className="calculator-params__title">
          Шаг 2. Введите параметры кредита
        </h3>
        <CalculatorInput
          labelText={costTitle}
          inputId="input-cost"
          minValue={CostLimit.MIN}
          maxValue={CostLimit.MAX}
          stepValue={Step.COST}
          currentValue={currentFormatedCostString}
          onCurrentValueChange={setCurrentFormatedCostString}
          postfix={Postfix.RUB}
          controls={true}
          hintText={`От ${getFormatedDigitString(CostLimit.MIN)} до ${createFormatedValueString(CostLimit.MAX, Postfix.RUB)}`}
          onValidStatusChange={setCostStatus}
        />
        <CalculatorRange
          labelText="Первоначальный взнос"
          inputId="input-payment"
          minValue={minPayment}
          maxValue={maxPayment}
          stepValue={Step.COST}
          postfix={Postfix.RUB}
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
          postfix={Postfix.DURATION}
          strict={true}
          stepRange={Step.DURATION}
          rangeValue={currentFormatedDurationString}
          onCurrentRangeValueChange={setCurrentFormatedDurationString}
          rangeClass={`calculator-params__range--duration`}
        />
        {children}
      </div>
      <CalculatorOffer
        minAmount={minAmount}
        amount={amount}
        percentRate={percentRate}
        years={years}
        onApplyButtonClick={handleButtonClick}
        isButtonEnabled={isCorrectCost}
        offerTitle={offerTitle}
        creditProperty={creditProperty}
      />
    </div>
  );
};

CalculatorParams.defaultProps = {
  className: ``,
};

CalculatorParams.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  calculatorParams: PropTypes.exact({
    initCostValue: PropTypes.number.isRequired,
    Step: stepType,
    PaymentLimit: limitType,
    DurationLimit: limitType,
    CostLimit: limitType,
    minAmount: PropTypes.number.isRequired,
    calculateAmount: PropTypes.func.isRequired,
    calculatePercentRate: PropTypes.func.isRequired,
    costTitle: PropTypes.string.isRequired,
    offerTitle: PropTypes.string.isRequired,
    creditProperty: PropTypes.string.isRequired,
  }).isRequired,
  onApplicationCreate: PropTypes.func.isRequired,
};

export default CalculatorParams;
