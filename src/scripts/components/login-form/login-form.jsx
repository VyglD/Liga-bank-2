import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {STORAGE_KEY} from "../../constants";

import logo from "../../../images/logo-expanded.svg";

const PasswordStatus = {
  VISIBLE: `text`,
  HIDDEN: `password`,
};

const STORAGE_AUTH_KEY = `${STORAGE_KEY}-auth`;

const CustomClass = {
  INPUT_DEFAULT: `login-form__field-input`,
  INPUT_INVALID: `login-form__field-input--invalid`,
  FORM_DEFAULT: `login-form`,
  FORM_INVALID: `login-form--invalid`,
};

const FullClass = {
  FORM_INVALID: `${CustomClass.FORM_DEFAULT} ${CustomClass.FORM_INVALID}`,
  INPUT_INVALID: `${CustomClass.INPUT_DEFAULT} ${CustomClass.INPUT_INVALID}`,
};

const InputPlaceholder = {
  VALID: ``,
  ERROR: `Заполните поле`,
};

const LoginForm = (props) => {
  const {onCloseButtonClick = () => {}} = props;

  const [formClass, setFormClass] = React.useState(CustomClass.FORM_DEFAULT);

  const [nameInputPlaceholder, setNameInputPlaceholder] = React.useState(InputPlaceholder.VALID);
  const [passwordInputPlaceholder, setPasswordInputPlaceholder] = React.useState(InputPlaceholder.VALID);

  const [nameInputValue, setNameInputValue] = React.useState(``);
  const [passwordInputValue, setPasswordInputValue] = React.useState(``);

  const [nameInputClass, setNameInputClass] = React.useState(CustomClass.INPUT_DEFAULT);
  const [passwordInputClass, setPasswordInputClass] = React.useState(CustomClass.INPUT_DEFAULT);

  React.useEffect(
      () => {
        const authData = JSON.parse(localStorage.getItem(STORAGE_AUTH_KEY));

        if (authData) {
          setNameInputValue(authData.login ? authData.login : ``);
          setPasswordInputValue(authData.password ? authData.password : ``);
        }
      },
      []
  );

  const [passwordStatus, setPasswordStatus] = React.useState(PasswordStatus.HIDDEN);

  const handlePasswordButtonClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        setPasswordStatus(
            (currentStatus) => {
              return currentStatus === PasswordStatus.VISIBLE
                ? PasswordStatus.HIDDEN
                : PasswordStatus.VISIBLE;
            }
        );
      },
      []
  );

  const getAuthData = React.useCallback(
      () => ({login: nameInputValue, password: passwordInputValue}),
      [nameInputValue, passwordInputValue]
  );

  const checkNameInputValue = React.useCallback(
      () => {
        const clearValue = nameInputValue.trim();

        if (!clearValue) {
          setNameInputPlaceholder(InputPlaceholder.ERROR);
          setNameInputClass(FullClass.INPUT_INVALID);

          return false;
        }

        setNameInputPlaceholder(InputPlaceholder.VALID);
        setNameInputClass(CustomClass.INPUT_DEFAULT);

        return true;
      },
      [nameInputValue]
  );

  const checkPasswordInputValue = React.useCallback(
      () => {
        const clearValue = passwordInputValue.trim();

        if (!clearValue) {
          setPasswordInputPlaceholder(InputPlaceholder.ERROR);
          setPasswordInputClass(FullClass.INPUT_INVALID);

          return false;
        }

        setPasswordInputPlaceholder(InputPlaceholder.VALID);
        setPasswordInputClass(CustomClass.INPUT_DEFAULT);

        return true;
      },
      [passwordInputValue]
  );

  const saveAuthData = React.useCallback(
      (evt) => {
        evt.preventDefault();

        let isFormValid = true;
        isFormValid = checkNameInputValue() && isFormValid;
        isFormValid = checkPasswordInputValue() && isFormValid;

        setFormClass(isFormValid ? CustomClass.FORM_DEFAULT : FullClass.FORM_INVALID);

        if (isFormValid) {
          localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(getAuthData()));

          onCloseButtonClick(evt);
        }
      },
      [checkNameInputValue, checkPasswordInputValue, getAuthData, onCloseButtonClick]
  );

  const handleNameValueInput = React.useCallback(
      ({target}) => {
        setNameInputValue(target.value);
        checkNameInputValue();
      },
      [checkNameInputValue]
  );

  const handlePasswodValueInput = React.useCallback(
      ({target}) => {
        setPasswordInputValue(target.value);
        checkPasswordInputValue();
      },
      [checkPasswordInputValue]
  );

  return (
    <div
      className={formClass}
      onAnimationEnd={() => setFormClass(CustomClass.FORM_DEFAULT)}
    >
      <img
        className="login-form__logo"
        src={logo}
        width="150"
        height="27"
        alt="Лига банк"
      />
      <form
        className="login-form__form"
        action="https://echo.htmlacademy.ru/"
        method="POST"
        onSubmit={saveAuthData}
      >
        <legend className="visually-hidden">
          Введите авторизационные данные
        </legend>
        <div className="login-form__field-wrapper">
          <label
            className="login-form__field-label"
            htmlFor="login-form-field-login"
          >
            Логин
          </label>
          <input
            className={nameInputClass}
            type="text"
            id="login-form-field-login"
            value={nameInputValue}
            onInput={handleNameValueInput}
            placeholder={nameInputPlaceholder}
            required
          />
        </div>
        <div className="login-form__field-wrapper">
          <label
            className="login-form__field-label"
            htmlFor="login-form-field-password"
          >
            Пароль
          </label>
          <div className="login-form__field-input-wrapper">
            <input
              className={passwordInputClass}
              type={passwordStatus}
              id="login-form-field-password"
              value={passwordInputValue}
              onInput={handlePasswodValueInput}
              placeholder={passwordInputPlaceholder}
              required
            />
            <button
              className="login-form__field-input-button"
              type="button"
              aria-label="Показать пароль"
              onClick={handlePasswordButtonClick}
            />
          </div>
        </div>
        <div className="login-form__buttons-wrapper">
          <ActionButton
            className="login-form__submit"
            type="submit"
            onClick={saveAuthData}
          >
            Войти
          </ActionButton>
          <a className="login-form__password-link" href="#blank">
            Забыли пароль?
          </a>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onCloseButtonClick: PropTypes.func,
};

export default LoginForm;
