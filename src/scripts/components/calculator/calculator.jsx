import React from "react";
import CalculatorStepOne from "../calculator-step-one/calculator-step-one";

const CreditType = {
  MORTAGE: `Ипотечное кредитование`,
  AUTO: `Автомобильное кредитование`,
};

const Calculator = () => {
  const [selectedCreditType, setCreditType] = React.useState();

  return (
    <section className="calculator">
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <CalculatorStepOne
        CreditType={CreditType}
        onSelectItemClick={setCreditType}
      />
      {
        selectedCreditType === CreditType.MORTAGE && (
          <div className="calculator__step-2">
            <h3 className="calculator__step-title">
              Шаг 2. Введите параметры кредита
            </h3>
            <p className="calculator__step-subtitle">
              Стоимость недвижимости
            </p>
            <div>
              <button>-</button>
              <input type="number" />
              <button>+</button>
            </div>
          </div>
        )
      }
    </section>
  );
};

Calculator.propTypes = {};

export default Calculator;
