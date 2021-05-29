import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {getCleanDigit} from "../../utils";
import {STORAGE_KEY} from "../../constants";

const STORAGE_APPLICATION_KEY = `${STORAGE_KEY}-application`;

const FIRST_APPLICATION_NUMBER = `0010`;

const getApplicationData = () => {
  const applicationData = JSON.parse(localStorage.getItem(STORAGE_APPLICATION_KEY));

  if (applicationData) {
    return {
      ...applicationData,
      number: String(getCleanDigit(applicationData.number) + 1).padStart(4, `0`),
    };
  }

  return {
    number: FIRST_APPLICATION_NUMBER,
    name: ``,
    phone: ``,
    email: ``,
  };
};

const setApplicationData = (applicationData) => {
  localStorage.setItem(STORAGE_APPLICATION_KEY, JSON.stringify(applicationData));
};

const CalculatorApplication = (props) => {
  const {className, application, onApplicationSubmit} = props;
  const {creditType, cost, firstPayment, duration} = application;
  const {number, name, phone, email} = getApplicationData();

  const [nameValue, setNameValue] = React.useState(name);
  const [phoneValue, setPhoneValue] = React.useState(phone);
  const [emailValue, setEmailValue] = React.useState(email);

  const handleFormSubmit = React.useCallback(
      (evt) => {
        evt.preventDefault();

        const applicationData = {
          number,
          name: nameValue,
          phone: phoneValue,
          email: emailValue,
        };

        setApplicationData(applicationData);

        onApplicationSubmit(null);
      },
      [number, nameValue, phoneValue, emailValue, onApplicationSubmit]
  );

  const handleNameChange = React.useCallback(
      ({target}) => {

        setNameValue(target.value);
      },
      []
  );

  const handlePhoneChange = React.useCallback(
      ({target}) => {

        setPhoneValue(target.value);
      },
      []
  );

  const handleEmailChange = React.useCallback(
      ({target}) => {

        setEmailValue(target.value);
      },
      []
  );

  return (
    <div className={`${className} calculator-application`}>
      <h3 className="calculator-application__title">
        Шаг 3. Оформление заявки
      </h3>
      <ul className="calculator-application__params">
        <li className="calculator-application__param">
          <p className="calculator-application__param-title">
            Номер заявки
          </p>
          <p className="calculator-application__param-value">
            № {number}
          </p>
        </li>
        <li className="calculator-application__param">
          <p className="calculator-application__param-title">
            Цель кредита
          </p>
          <p className="calculator-application__param-value">
            {creditType}
          </p>
        </li>
        <li className="calculator-application__param">
          <p className="calculator-application__param-title">
            Стоимость недвижимости
          </p>
          <p className="calculator-application__param-value">
            {cost}
          </p>
        </li>
        <li className="calculator-application__param">
          <p className="calculator-application__param-title">
            Первоначальный взнос
          </p>
          <p className="calculator-application__param-value">
            {firstPayment}
          </p>
        </li>
        <li className="calculator-application__param">
          <p className="calculator-application__param-title">
            Срок кредитования
          </p>
          <p className="calculator-application__param-value">
            {duration}
          </p>
        </li>
      </ul>
      <form
        className="calculator-application__form"
        action=""
        method="post"
        onSubmit={handleFormSubmit}
      >
        <input
          className="calculator-application__input"
          type="text"
          name="name"
          value={nameValue}
          onChange={handleNameChange}
        />
        <input
          className="calculator-application__input"
          type="phone"
          name="phone"
          value={phoneValue}
          onChange={handlePhoneChange}
        />
        <input
          className="calculator-application__input"
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
        />
        <ActionButton
          className=""
          type="submit"
          onClick={handleFormSubmit}
        >
          Отправить
        </ActionButton>
      </form>
    </div>
  );
};

CalculatorApplication.defaultProps = {
  className: ``,
};

CalculatorApplication.propTypes = {
  className: PropTypes.string,
  application: PropTypes.exact({
    cost: PropTypes.string.isRequired,
    firstPayment: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    creditType: PropTypes.string.isRequired,
  }).isRequired,
  onApplicationSubmit: PropTypes.func.isRequired,
};

export default CalculatorApplication;
