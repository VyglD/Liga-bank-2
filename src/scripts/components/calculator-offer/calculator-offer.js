import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {createFormatedValueString} from "../../utils";
import {CreditType, Postfix} from "../../constants";

const PERCENT_BREAKPOINT = 15;

const MinAmount = {
  [CreditType.MORTAGE]: 500_000,
  [CreditType.AUTO]: 200_000,
};

const Percent = {
  FIRST: 9.40,
  SECOND: 8.50,
};

// wages

const CalculatorOffer = (props) => {
  const {creditType, amount, firstPayment, duration} = props;

  const minAmount = MinAmount[creditType];
  // const percent = firstPayment < PERCENT_BREAKPOINT ? Percent.FIRST : Percent.SECOND;

  // Нужно сравнивать процент первого взноса

  window.console.log(firstPayment, duration, Percent, PERCENT_BREAKPOINT);

  // console.log(creditType, amount, minAmount, amount > minAmount);
  //

  return (
    <section className="calculator-offer">
      {
        amount > minAmount
          ? (
            <React.Fragment>
              <h3 className="calculator-offer__title">Наше предложение</h3>
              <ul className="calculator-offer__params">
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Сумма ипотеки</p>
                  <p className="calculator-offer__param-value">
                    {createFormatedValueString(amount, Postfix.RUB)}
                  </p>
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Процентная ставка</p>
                  <p className="calculator-offer__param-value">
                    {/* {createFormatedValueString(percent, Postfix.PERCENT).replace(`.`, `,`)} */}
                  </p>
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Ежемесячный платеж</p>
                  {/* <p className="calculator-offer__param-value">{payment}</p> */}
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Необходимый доход</p>
                  {/* <p className="calculator-offer__param-value">{wages}</p> */}
                </li>
              </ul>
              <ActionButton
                href="#blank"
                className="calculator-offer__button"
              >
                Оформить заявку
              </ActionButton>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <h3 className="calculator-offer__title">
                Наш банк не выдаёт ипотечные кредиты меньше 200 000 рублей.
              </h3>
              <p className="calculator-offer__description">
                Попробуйте использовать другие параметры для расчёта.
              </p>
            </React.Fragment>
          )
      }
    </section>
  );
};

CalculatorOffer.propTypes = {
  creditType: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  firstPayment: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default CalculatorOffer;
