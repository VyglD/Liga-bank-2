import React from "react";
import {STORAGE_KEY} from "../../constants";
import PropTypes from "prop-types";

import logo from "../../../images/logo-expanded.svg";

const PasswordStatus = {
  VISIBLE: `text`,
  HIDDEN: `password`,
};

const STORAGE_AUTH_KEY = `${STORAGE_KEY}-auth`;

const INVALID_INPUT_CLASS = `login-form__field-input--invalid`;

const LoginForm = (props) => {
  const {onCloseButtonClick = () => {}} = props;

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

        if (value) {
          if (input.classList.contains(INVALID_INPUT_CLASS)) {
            input.classList.remove(INVALID_INPUT_CLASS);
            input.placeholder = ``;
          }
        } else {
          input.classList.add(INVALID_INPUT_CLASS);
          input.placeholder = `Заполните поле`;

          return false;
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

        if (
          checkInputValue(loginInputRef.current)
          & checkInputValue(passwordInputRef.current)
        ) {
          localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(getAuthData()));

          onCloseButtonClick(evt);
        }
      },
      [checkInputValue, getAuthData, onCloseButtonClick]
  );

  return (
    <div className="login-form">
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
          <button
            className="login-form__submit"
            type="submit"
            onClick={saveAuthData}
          >
            Войти
          </button>
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
