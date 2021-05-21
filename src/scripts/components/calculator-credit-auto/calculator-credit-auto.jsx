import React from "react";
import PropTypes from "prop-types";
import CalculatorParams from "../calculator-params/calculator-params";

const INIT_COST_VALUE = 2_000_000;
const MIN_AMOUNT = 200_000;
const COST_BREAKPOINT = 2_000_000;

const CustomString = {
  COST_TITLE: `Стоимость автомобиля`,
  OFFER_TITLE: `Сумма автокредита`,
  CREDIT_PROPERTY: `автокредиты`,
};

const CostLimit = {
  MIN: 500_000,
  MAX: 5_000_000,
};

const PaymentLimit = {
  MIN: 0.2,
  MAX: 1,
};

const DurationLimit = {
  MIN: 1,
  MAX: 5,
};

const Step = {
  COST: 50_000,
  PAYMENT: 5,
  DURATION: 1,
};

const PercentRate = {
  FIRST: 16,
  SECOND: 15,
  THIRD: 8.5,
  FOURTH: 3.5,
};

const CalculatorCreditAuto = (props) => {
  const {className, onApplicationCreate} = props;
  const [isCascoCheck, setCascoStatus] = React.useState(false);
  const [isLifeInsuranceCheck, setLifeInsuranceStatus] = React.useState(false);

  const calculateAmount = React.useCallback(
      (cost, firstPayment) => cost - firstPayment,
      []
  );

  const calculatePercentRate = React.useCallback(
      (cost, _firstPayment) => {
        let persentRate = PercentRate.FIRST;

        if (cost >= COST_BREAKPOINT) {
          persentRate = PercentRate.SECOND;
        }

        if (isCascoCheck || isLifeInsuranceCheck) {
          persentRate = PercentRate.THIRD;
        }

        if (isCascoCheck && isLifeInsuranceCheck) {
          persentRate = PercentRate.FOURTH;
        }

        return persentRate;
      },
      [isCascoCheck, isLifeInsuranceCheck]
  );

  const handleCascoStatusChange = React.useCallback(
      () => {
        setCascoStatus((status) => !status);
      },
      []
  );

  const handleLifeInsuranceChange = React.useCallback(
      () => {
        setLifeInsuranceStatus((status) => !status);
      },
      []
  );

  return (
    <CalculatorParams
      className={className}
      calculatorParams={{
        initCostValue: INIT_COST_VALUE,
        Step,
        PaymentLimit,
        DurationLimit,
        CostLimit,
        minAmount: MIN_AMOUNT,
        calculateAmount,
        calculatePercentRate,
        costTitle: CustomString.COST_TITLE,
        offerTitle: CustomString.OFFER_TITLE,
        creditProperty: CustomString.CREDIT_PROPERTY,
      }}
      onApplicationCreate={onApplicationCreate}
    >
      <React.Fragment>
        <div className="calculator-params__checkbox">
          <input
            className="calculator-params__checkbox-input visually-hidden"
            type="checkbox"
            id="casco"
            onChange={handleCascoStatusChange}
            checked={isCascoCheck}
          />
          <label
            className="calculator-params__checkbox-label"
            htmlFor="casco"
          >
            Оформить КАСКО в нашем банке
          </label>
        </div>
        <div className="calculator-params__checkbox">
          <input
            className="calculator-params__checkbox-input visually-hidden"
            type="checkbox"
            id="life-insurance"
            onChange={handleLifeInsuranceChange}
            checked={isLifeInsuranceCheck}
          />
          <label
            className="calculator-params__checkbox-label"
            htmlFor="life-insurance"
          >
            Оформить Страхование жизни в нашем банке
          </label>
        </div>
      </React.Fragment>
    </CalculatorParams>
  );
};

CalculatorCreditAuto.defaultProps = {
  className: ``,
};

CalculatorCreditAuto.propTypes = {
  className: PropTypes.string,
  onApplicationCreate: PropTypes.func.isRequired,
};

export default CalculatorCreditAuto;
