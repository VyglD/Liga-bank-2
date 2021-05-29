import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";
import CalculatorRange from "../calculator-range/calculator-range";
import CalculatorOffer from "../calculator-offer/calculator-offer";
import {createFormatedValueString, getCleanDigit} from "../../utils";
import {Postfix} from "../../constants";

const INIT_COST_VALUE = 2_000_000;

const MOTHER_CAPITAL = 470_000;

const CostLimit = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

const PaymentLimit = {
  MIN: 0.1,
  MAX: 1,
};

const DurationLimit = {
  MIN: 5,
  MAX: 30,
};

const Step = {
  COST: 100_000,
  PAYMENT: 5,
  DURATION: 1,
};

const CalculatorParams = (props) => {
  const {className, creditType} = props;

  const [deduction, setDeduction] = React.useState(0);

  const [
    currentFormatedCostString,
    setCurrentFormatedCostString
  ] = React.useState(createFormatedValueString(INIT_COST_VALUE, Postfix.RUB));

  const minPayment = PaymentLimit.MIN * getCleanDigit(currentFormatedCostString);
  const maxPayment = PaymentLimit.MAX * getCleanDigit(currentFormatedCostString);

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
        const newValue = Math.round(getCleanDigit(value) / maxPayment * 100);

        return createFormatedValueString(newValue, Postfix.PERCENT);
      },
      [maxPayment]
  );

  const handleMotherCapitalChange = React.useCallback(
      ({target}) => {
        setDeduction(target.checked ? MOTHER_CAPITAL : 0);
      },
      []
  );

  const cost = getCleanDigit(currentFormatedCostString);
  const firstPayment = getCleanDigit(currentFormatedPaymentString);
  const amount = cost - firstPayment - deduction;

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
        postfix={Postfix.RUB}
        controls={true}
        hint={true}
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
      <div className="calculator-params__checkbox">
        <input
          className="calculator-params__checkbox-input visually-hidden"
          type="checkbox"
          id="mother-capital"
          onChange={handleMotherCapitalChange}
        />
        <label
          className="calculator-params__checkbox-label"
          htmlFor="mother-capital"
        >
          Использовать материнский капитал
        </label>
      </div>
      <CalculatorOffer
        creditType={creditType}
        amount={amount}
        firstPayment={firstPayment}
        duration={getCleanDigit(currentFormatedDurationString)}
      />
    </div>
  );
};

CalculatorParams.defaultProps = {
  className: ``,
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
  creditType: PropTypes.string.isRequired,
};

export default CalculatorParams;
