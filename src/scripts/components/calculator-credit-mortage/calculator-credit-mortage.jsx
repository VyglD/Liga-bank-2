import React from "react";
import PropTypes from "prop-types";
import CalculatorParams from "../calculator-params/calculator-params";
import {Percentage} from "../../constants";

const INIT_COST_VALUE = 2_000_000;
const MIN_AMOUNT = 500_000;
const PERCENT_BREAKPOINT = 15;

const CustomString = {
  COST_TITLE: `Стоимость недвижимости`,
  OFFER_TITLE: `Сумма ипотеки`,
  CREDIT_PROPERTY: `ипотечные кредиты`,
};

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

const MotherCapital = {
  ENABLED: 470_000,
  DISABLED: 0,
};

const PercentRate = {
  FIRST: 9.40,
  SECOND: 8.50,
};

const CalculatorCreditMortage = (props) => {
  const {className, onApplicationCreate} = props;
  const [isMotherCapitalChecked, setMotherCapitalStatus] = React.useState(false);

  const calculateAmount = React.useCallback(
      (cost, firstPayment) => {
        const deduction = isMotherCapitalChecked
          ? MotherCapital.ENABLED
          : MotherCapital.DISABLED;

        return cost - firstPayment - deduction;
      },
      [isMotherCapitalChecked]
  );

  const calculatePercentRate = React.useCallback(
      (cost, firstPayment) => {
        const firstPaymentPercent = Math.round((firstPayment / cost) * Percentage.ENTIRE);

        return firstPaymentPercent < PERCENT_BREAKPOINT
          ? PercentRate.FIRST
          : PercentRate.SECOND;
      },
      []
  );

  const handleMotherCapitalChange = React.useCallback(
      () => {
        setMotherCapitalStatus((status) => !status);
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
      <div className="calculator-params__checkbox">
        <input
          className="calculator-params__checkbox-input visually-hidden"
          type="checkbox"
          id="mother-capital"
          onChange={handleMotherCapitalChange}
          checked={isMotherCapitalChecked}
        />
        <label
          className="calculator-params__checkbox-label"
          htmlFor="mother-capital"
        >
          Использовать материнский капитал
        </label>
      </div>
    </CalculatorParams>
  );
};

CalculatorCreditMortage.defaultProps = {
  className: ``,
};

CalculatorCreditMortage.propTypes = {
  className: PropTypes.string,
  onApplicationCreate: PropTypes.func.isRequired,
};

export default CalculatorCreditMortage;
