import React from "react";
import PropTypes from "prop-types";
import Inputmask from "inputmask";
import ActionButton from "../action-button/action-button";
import {getCleanDigit} from "../../utils";
import {STORAGE_KEY} from "../../constants";

const STORAGE_APPLICATION_KEY = `${STORAGE_KEY}-application`;

const FIRST_APPLICATION_NUMBER = `0010`;

const CustomClass = {
  DEFAULT_FORM: `calculator-application__form`,
  INVALID_FORM: `calculator-application__form--invalid`,
  DISPLAY_ERROR: `calculator-application__input-error--display`,
  DEFAULT_ERROR: `calculator-application__input-error`,
};

const FullClass = {
  ERROR_MESSAGE: `${CustomClass.DEFAULT_ERROR} ${CustomClass.DISPLAY_ERROR}`,
  INVALID_FORM: `${CustomClass.DEFAULT_FORM} ${CustomClass.INVALID_FORM}`,
};

const Regex = {
  PHONE: /^((8|([+]?7))([-]| )?)?([(]?[0-9]{3}[)]?([-]| )?)([0-9]|[-]| ){7,10}$/u,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const ErrorMessage = {
  REQUIRED: `Обязательно для заполнения`,
  PHONE: `Неверный формат номера`,
  EMAIL: `Неверный формат email адреса`,
  NONE: ``,
};

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

const isEmpty = (value) => {
  return value.trim().length === 0;
};

const CalculatorApplication = (props) => {
  const {className, application, onApplicationSubmit, creditTargetTitle} = props;
  const {cost, firstPayment, duration} = application;
  const {number, name, phone, email} = getApplicationData();

  const isSending = React.useRef(false);

  const nameRef = React.useRef();
  const phoneRef = React.useRef();
  const emailRef = React.useRef();

  const nameErrorRef = React.useRef();
  const phoneErrorRef = React.useRef();
  const emailErrorRef = React.useRef();

  const [nameInputClass, setNameInputClass] = React.useState(CustomClass.DEFAULT_ERROR);
  const [phoneInputClass, setPhoneInputClass] = React.useState(CustomClass.DEFAULT_ERROR);
  const [emailInputClass, setEmailInputClass] = React.useState(CustomClass.DEFAULT_ERROR);

  const [nameErrorMessage, setNameErrorMessage] = React.useState(ErrorMessage.NONE);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState(ErrorMessage.NONE);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(ErrorMessage.NONE);

  const [nameValue, setNameValue] = React.useState(name);
  const [phoneValue, setPhoneValue] = React.useState(phone);
  const [emailValue, setEmailValue] = React.useState(email);

  const [formClass, setFormClass] = React.useState(CustomClass.DEFAULT_FORM);

  const validateNameField = React.useCallback(
      () => {
        const value = nameRef.current.value;

        if (isEmpty(value)) {
          setNameInputClass(FullClass.ERROR_MESSAGE);
          setNameErrorMessage(ErrorMessage.REQUIRED);

          return false;
        }

        setNameInputClass(CustomClass.DEFAULT_ERROR);
        setNameErrorMessage(ErrorMessage.NONE);

        return true;
      },
      []
  );

  const validatePhoneField = React.useCallback(
      () => {
        const value = phoneRef.current.value;

        if (isEmpty(value)) {
          setPhoneInputClass(FullClass.ERROR_MESSAGE);
          setPhoneErrorMessage(ErrorMessage.REQUIRED);

          return false;
        }

        if (!Regex.PHONE.test(String(value).toLowerCase())) {
          setPhoneInputClass(FullClass.ERROR_MESSAGE);
          setPhoneErrorMessage(ErrorMessage.PHONE);

          return false;
        }

        setPhoneInputClass(CustomClass.DEFAULT_ERROR);
        setPhoneErrorMessage(ErrorMessage.NONE);

        return true;
      },
      []
  );

  const validateEmailField = React.useCallback(
      () => {
        const value = emailRef.current.value;

        if (isEmpty(value)) {
          setEmailInputClass(FullClass.ERROR_MESSAGE);
          setEmailErrorMessage(ErrorMessage.REQUIRED);

          return false;
        }

        if (!Regex.EMAIL.test(String(value).toLowerCase())) {
          setEmailInputClass(FullClass.ERROR_MESSAGE);
          setEmailErrorMessage(ErrorMessage.EMAIL);

          return false;
        }

        setEmailInputClass(CustomClass.DEFAULT_ERROR);
        setEmailErrorMessage(ErrorMessage.NONE);

        return true;
      },
      []
  );

  const handleFormSubmit = React.useCallback(
      (evt) => {
        evt.preventDefault();

        let isFormValid = true;
        isFormValid = validateNameField() && isFormValid;
        isFormValid = validatePhoneField() && isFormValid;
        isFormValid = validateEmailField() && isFormValid;

        setFormClass(isFormValid ? CustomClass.DEFAULT_FORM : FullClass.INVALID_FORM);
        isSending.current = !isFormValid;

        if (isFormValid) {
          const applicationData = {
            number,
            name: nameValue,
            phone: phoneValue,
            email: emailValue,
          };

          setApplicationData(applicationData);

          onApplicationSubmit();
        }
      },
      [
        validateNameField,
        validatePhoneField,
        validateEmailField,
        number,
        nameValue,
        phoneValue,
        emailValue,
        onApplicationSubmit
      ]
  );

  const handleNameInput = React.useCallback(
      ({target}) => {

        if (isSending.current) {
          validateNameField();
        }

        setNameValue(target.value);
      },
      [validateNameField]
  );

  const handlePhoneInput = React.useCallback(
      ({target}) => {

        if (isSending.current) {
          validatePhoneField();
        }

        setPhoneValue(target.value);
      },
      [validatePhoneField]
  );

  const handleEmailInput = React.useCallback(
      ({target}) => {

        if (isSending.current) {
          validateEmailField();
        }

        setEmailValue(target.value);
      },
      [validateEmailField]
  );

  React.useEffect(
      () => {
        nameRef.current.focus();

        const phoneMask = new Inputmask(`+7 (999) 999-99-99`);
        phoneMask.mask(phoneRef.current);
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
            {creditTargetTitle}
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
        className={formClass}
        action="https://echo.htmlacademy.ru/"
        method="post"
        onSubmit={handleFormSubmit}
        onAnimationEnd={() => setFormClass(CustomClass.DEFAULT_FORM)}
      >
        <div className="calculator-application__input-wrapper">
          <p
            ref={nameErrorRef}
            className={nameInputClass}
          >
            {nameErrorMessage}
          </p>
          <input
            ref={nameRef}
            className="calculator-application__input"
            type="text"
            name="name"
            value={nameValue}
            onInput={handleNameInput}
            placeholder="ФИО"
            required
          />
        </div>
        <div
          className="calculator-application__input-wrapper calculator-application__input-wrapper--phone"
        >
          <p
            ref={phoneErrorRef}
            className={phoneInputClass}
          >
            {phoneErrorMessage}
          </p>
          <input
            ref={phoneRef}
            className="calculator-application__input"
            type="tel"
            name="phone"
            value={phoneValue}
            onInput={handlePhoneInput}
            placeholder="Телефон"
            required
          />
        </div>
        <div
          className="calculator-application__input-wrapper calculator-application__input-wrapper--email"
        >
          <p
            ref={emailErrorRef}
            className={emailInputClass}
          >
            {emailErrorMessage}
          </p>
          <input
            ref={emailRef}
            className="calculator-application__input"
            type="email"
            name="email"
            value={emailValue}
            onInput={handleEmailInput}
            placeholder="E-mail"
            required
          />
        </div>
        <ActionButton
          className="calculator-application__submit-button"
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
  }).isRequired,
  onApplicationSubmit: PropTypes.func.isRequired,
  creditTargetTitle: PropTypes.string.isRequired,
};

export default CalculatorApplication;
