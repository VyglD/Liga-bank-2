import React from "react";
import CalculatorTarget from "../calculator-target/calculator-target";
import CalculatorParams from "../calculator-params/calculator-params";
import CalculatorApplication from "../calculator-application/calculator-application";
import {CreditType} from "../../constants";

const Calculator = () => {
  const [selectedCreditType, setCreditType] = React.useState(null);
  const [application, setApplication] = React.useState(null);

  return (
    <section className="calculator">
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <CalculatorTarget
        className="calculator__step-1"
        CreditType={CreditType}
        onSelectItemClick={setCreditType}
      />
      {
        selectedCreditType && (
          <CalculatorParams
            className="calculator__step-2"
            creditType={selectedCreditType}
            onApplicationCreate={setApplication}
          />
        )
      }
      {
        application && (
          <CalculatorApplication
            className="calculator__step-3"
            application={application}
            onApplicationSubmit={setApplication}
          />
        )
      }
    </section>
  );
};

Calculator.propTypes = {};

export default Calculator;
