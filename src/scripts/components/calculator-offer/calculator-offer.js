import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {createFormatedValueString, getFormatedDigitString} from "../../utils";
import {CreditType, Percentage, Postfix} from "../../constants";

const PERCENT_BREAKPOINT = 15;

const MinAmount = {
  [CreditType.MORTAGE]: 500_000,
  [CreditType.AUTO]: 200_000,
};

const Percent = {
  FIRST: 9.40,
  SECOND: 8.50,
};

const MONTHS = 12;

const MIN_WAGES_PAYMENT = 45;

const CalculatorOffer = (props) => {
  const {creditType, amount, firstPaymentPercent, years} = props;

  const minAmount = MinAmount[creditType];
  const percentRate = firstPaymentPercent < PERCENT_BREAKPOINT
    ? Percent.FIRST
    : Percent.SECOND;

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
                  <p className="calculator-offer__param-title">Сумма ипотеки</p>
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
                Наш банк не выдаёт ипотечные кредиты меньше&thinsp;
                {getFormatedDigitString(minAmount)} рублей.
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
  firstPaymentPercent: PropTypes.number.isRequired,
  years: PropTypes.number.isRequired,
};

export default CalculatorOffer;
