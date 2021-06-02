import React from "react";
import Popup from "../popup/popup";
import LoginForm from "../login-form/login-form";
import {hidePageScrollbar, displayPageScrollbar} from "../../utils";

import logo from "../../../images/logo.svg";

const CustomClass = {
  OPEN: `prime-header--open`,
  DEFAULT: `prime-header`,
};

const PrimeHeader = () => {
  const [headerClass, setHeaderClass] = React.useState(CustomClass.DEFAULT);

  const [isPopupOpen, setPopupStatus] = React.useState(false);

  const handleToggleButtonClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        setHeaderClass((currentClass) => {
          const isClose = currentClass === CustomClass.DEFAULT;

          if (isClose) {
            hidePageScrollbar();

            return `${CustomClass.DEFAULT} ${CustomClass.OPEN}`;
          }

          displayPageScrollbar();

          return CustomClass.DEFAULT;
        });
      },
      []
  );

  const handleNavButtonCloseClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        displayPageScrollbar();

        setHeaderClass(CustomClass.DEFAULT);
      },
      []
  );

  const togglePopupVisibillity = React.useCallback(
      (evt) => {
        evt.preventDefault();

        setPopupStatus((popupStatus) => !popupStatus);
      },
      [setPopupStatus]
  );

  return (
    <header className={headerClass}>
      <div
        className="prime-header__content"
      >
        <button
          className="prime-header__toggle-button"
          type="button"
          onClick={handleToggleButtonClick}
        >
          <span>Показать, скрыть меню</span>
        </button>
        <img
          className="prime-header__logo"
          src={logo}
          width="115"
          height="17"
          alt="Лига банк"
        />
        <nav className="prime-header__nav">
          <button
            className="prime-header__nav-close-button"
            type="button"
            aria-label="Закрыть меню"
            onClick={handleNavButtonCloseClick}
          />
          <ul className="prime-header__nav-list">
            <li className="prime-header__nav-list-item">
              <a
                className="prime-header__nav-list-link"
                href="#blank"
              >
                Услуги
              </a>
            </li>
            <li className="prime-header__nav-list-item">
              <a
                className="prime-header__nav-list-link"
                href="#blank"
              >
                Рассчитать кредит
              </a>
            </li>
            <li className="prime-header__nav-list-item">
              <a
                className="prime-header__nav-list-link"
                href="#blank"
              >
                Конвертер валют
              </a>
            </li>
            <li className="prime-header__nav-list-item">
              <a
                className="prime-header__nav-list-link"
                href="#blank"
              >
                Контакты
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="prime-header__login"
          type="button"
          onClick={togglePopupVisibillity}
        >
          <span>Войти в Интернет-банк</span>
        </button>
      </div>
      {
        isPopupOpen && (
          <Popup
            closeButtonClass={`login-form__close-button`}
            contentWrapperClass={`login-form__outer-wrapper`}
            onCloseButtonClick={togglePopupVisibillity}
          >
            <LoginForm
              onCloseButtonClick={togglePopupVisibillity}
            />
          </Popup>
        )
      }
    </header>
  );
};

PrimeHeader.propTypes = {};

export default PrimeHeader;
