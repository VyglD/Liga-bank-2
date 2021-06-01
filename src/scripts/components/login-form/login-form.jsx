import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";
import {toggleAnimateClass} from "../../utils";
import {STORAGE_KEY} from "../../constants";

import logo from "../../../images/logo-expanded.svg";

const PasswordStatus = {
  VISIBLE: `text`,
  HIDDEN: `password`,
};

const STORAGE_AUTH_KEY = `${STORAGE_KEY}-auth`;

const InvalidClass = {
  INPUT: `login-form__field-input--invalid`,
  CONTAINER_FORM: `login-form--invalid`,
};

const LoginForm = (props) => {
  const {onCloseButtonClick = () => {}} = props;

  const formContainerRef = React.useRef();

  const loginInputRef = React.useRef();
  const passwordInputRef = React.useRef();

  React.useEffect(
      () => {
        const authData = JSON.parse(localStorage.getItem(STORAGE_AUTH_KEY));

        if (authData) {
          loginInputRef.current.value = authData.login;
          passwordInputRef.current.value = authData.password;
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
      () => {
        const login = loginInputRef.current.value;
        const password = passwordInputRef.current.value;

        return {login, password};
      },
      []
  );

  const checkInputValue = React.useCallback(
      (input) => {
        const value = input.value.trim();
        input.value = value;

        if (!value) {
          input.classList.add(InvalidClass.INPUT);
          input.placeholder = `Заполните поле`;

          return false;
        }

        if (input.classList.contains(InvalidClass.INPUT)) {
          input.classList.remove(InvalidClass.INPUT);
          input.placeholder = ``;
        }

        return true;
      },
      []
  );

  const handleFieldInput = React.useCallback(
      (evt) => {
        checkInputValue(evt.target);
      },
      [checkInputValue]
  );

  const saveAuthData = React.useCallback(
      (evt) => {
        evt.preventDefault();

        let isFormValid = true;
        isFormValid = checkInputValue(loginInputRef.current) && isFormValid;
        isFormValid = checkInputValue(passwordInputRef.current) && isFormValid;

        toggleAnimateClass(formContainerRef.current, isFormValid, InvalidClass.CONTAINER_FORM);

        if (isFormValid) {
          localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(getAuthData()));

          onCloseButtonClick(evt);
        }
      },
      [checkInputValue, getAuthData, onCloseButtonClick]
  );

  return (
    <div
      ref={formContainerRef}
      className="login-form"
      onAnimationEnd={() => toggleAnimateClass(formContainerRef.current, true, InvalidClass.CONTAINER_FORM)}
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
            ref={loginInputRef}
            className="login-form__field-input"
            type="text"
            id="login-form-field-login"
            onInput={handleFieldInput}
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
              ref={passwordInputRef}
              className="login-form__field-input login-form__field-input--password"
              type={passwordStatus}
              id="login-form-field-password"
              onInput={handleFieldInput}
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
