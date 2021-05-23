import React from "react";
import PropTypes from "prop-types";
import CalculatorInput from "../calculator-input/calculator-input";

const CostLimit = {
  MIN: 1_200_000,
  MAX: 25_000_000,
};

// const DurationLimit = {
//   MIN: 5,
//   MAX: 30,
// };

const Postfix = {
  COST: ` рублей`,
  PAYMENT: ` рублей`,
  DURATION: ` лет`,
};

const Step = {
  COST: 100_000,
  PAYMENT: 5,
  DURATION: 1,
};

const CalculatorParams = (props) => {
  const {className = ``} = props;

  const [currentCost, setCurrentCost] = React.useState(`2 000 000${Postfix.COST}`);

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
    </div>
  );
};

CalculatorParams.propTypes = {
  className: PropTypes.string,
};

export default CalculatorParams;
