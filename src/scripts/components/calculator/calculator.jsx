import React from "react";
import CalculatorTarget from "../calculator-target/calculator-target";
import CalculatorMortage from "../calculator-mortage/calculator-mortage";

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
        CreditType={CreditType}
        onSelectItemClick={setCreditType}
      />
      {
        selectedCreditType === CreditType.MORTAGE && (
          <CalculatorMortage />
        )
      }
    </section>
  );
};

Calculator.propTypes = {};

export default Calculator;
