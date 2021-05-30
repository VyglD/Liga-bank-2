import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {createFormatedValueString, getFormatedDigitString} from "../../utils";
import {Percentage, Postfix} from "../../constants";

const MONTHS = 12;
const MIN_WAGES_PAYMENT = 45;

const CalculatorOffer = (props) => {
  const {
    minAmount,
    amount,
    percentRate,
    years,
    onApplyButtonClick,
    isButtonEnabled,
    offerTitle,
    creditProperty,
  } = props;

  const monthPercentRate = percentRate / Percentage.ENTIRE / MONTHS;
  const monthNumber = years * MONTHS;
  const monthPayment = Math.round(
      amount * (monthPercentRate + monthPercentRate / (((1 + monthPercentRate) ** monthNumber) - 1))
  );

  const wages = Math.round(monthPayment / MIN_WAGES_PAYMENT * Percentage.ENTIRE);

  return (
    <section className="calculator-offer">
      {
        amount > minAmount
          ? (
            <React.Fragment>
              <h3 className="calculator-offer__title">Наше предложение</h3>
              <ul className="calculator-offer__params">
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">{offerTitle}</p>
                  <p className="calculator-offer__param-value">
                    {createFormatedValueString(amount, Postfix.RUB)}
                  </p>
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Процентная ставка</p>
                  <p className="calculator-offer__param-value">
                    {
                      createFormatedValueString(percentRate, Postfix.PERCENT)
                        .replace(`.`, `,`)
                    }
                  </p>
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Ежемесячный платеж</p>
                  <p className="calculator-offer__param-value">
                    {createFormatedValueString(monthPayment, Postfix.RUB)}
                  </p>
                </li>
                <li className="calculator-offer__param-wrapper">
                  <p className="calculator-offer__param-title">Необходимый доход</p>
                  <p className="calculator-offer__param-value">
                    {createFormatedValueString(wages, Postfix.RUB)}
                  </p>
                </li>
              </ul>
              <ActionButton
                type="button"
                className="calculator-offer__button"
                onClick={onApplyButtonClick}
                disabled={!isButtonEnabled}
              >
                Оформить заявку
              </ActionButton>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <h3 className="calculator-offer__title">
                Наш банк не выдаёт {creditProperty} меньше {getFormatedDigitString(minAmount)} рублей.
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
  minAmount: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  percentRate: PropTypes.number.isRequired,
  years: PropTypes.number.isRequired,
  onApplyButtonClick: PropTypes.func.isRequired,
  isButtonEnabled: PropTypes.bool.isRequired,
  offerTitle: PropTypes.string.isRequired,
  creditProperty: PropTypes.string.isRequired,
};

export default CalculatorOffer;
