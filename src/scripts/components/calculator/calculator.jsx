import React from "react";
import CalculatorTarget from "../calculator-target/calculator-target";
import CalculatorParams from "../calculator-params/calculator-params";

const CreditType = {
  MORTAGE: `Ипотечное кредитование`,
  AUTO: `Автомобильное кредитование`,
};

const Calculator = () => {
  const [selectedCreditType, setCreditType] = React.useState();

  return (
    <section className="calculator">
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <CalculatorTarget
        className="calculator__step-1"
        CreditType={CreditType}
        onSelectItemClick={setCreditType}
      />
      {
        selectedCreditType === CreditType.MORTAGE && (
          <CalculatorParams
            className="calculator__step-2"
          />
        )
      }
    </section>
  );
};

Calculator.propTypes = {};

export default Calculator;
