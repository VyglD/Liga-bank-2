import React from "react";
import CalculatorTarget from "../calculator-target/calculator-target";
import CalculatorCreditMortage from "../calculator-credit-mortage/calculator-credit-mortage";
import CalculatorApplication from "../calculator-application/calculator-application";
import Popup from "../popup/popup";
import {CreditType} from "../../constants";

const Calculator = () => {
  const [selectedCreditType, setCreditType] = React.useState(null);
  const [application, setApplication] = React.useState(null);
  const [isPopupVibible, setPopupVisibility] = React.useState(false);

  const calculatorRef = React.useRef();

  const closePopup = React.useCallback(
      () => {
        setPopupVisibility(false);
      },
      []
  );

  const handleSubmitApplication = React.useCallback(
      () => {
        setApplication(null);

        window.scrollTo({
          top: calculatorRef.current.offsetTop,
          left: 0,
          behavior: `smooth`,
        });

        setPopupVisibility(true);
      },
      []
  );

  return (
    <section
      ref={calculatorRef}
      className="calculator"
    >
      <h2 className="calculator__title">Кредитный калькулятор</h2>
      <CalculatorTarget
        className="calculator__step-1"
        CreditType={CreditType}
        onSelectItemClick={setCreditType}
      />
      {
        selectedCreditType && (
          <CalculatorCreditMortage
            className="calculator__step-2"
            onApplicationCreate={setApplication}
          />
        )
      }
      {
        application && (
          <CalculatorApplication
            className="calculator__step-3"
            application={application}
            onApplicationSubmit={handleSubmitApplication}
          />
        )
      }
      {
        isPopupVibible && (
          <Popup
            closeButtonClass={`calculator__popup-close-button`}
            contentWrapperClass={`calculator__popup`}
            onCloseButtonClick={closePopup}
          >
            <React.Fragment>
              <p className="calculator__popup-title">
                Спасибо за обращение в наш банк.
              </p>
              <p className="calculator__popup-details">
                Наш менеджер скоро свяжется с вами по указанному номеру телефона
              </p>
            </React.Fragment>
            <div>
            </div>
          </Popup>
        )
      }
    </section>
  );
};

Calculator.propTypes = {};

export default Calculator;
