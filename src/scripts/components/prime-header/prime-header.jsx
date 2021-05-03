import React from "react";

import logo from "../../../images/logo.svg";

const OPENED_CLASS = `prime-header__content--opened`;

const PrimeHeader = () => {
  const primeHeaderContentRef = React.useRef();

  const handleToggleButtonClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        primeHeaderContentRef.current.classList.toggle(OPENED_CLASS);
      },
      []
  );

  const handleNavButtonCloseClick = React.useCallback(
      (evt) => {
        evt.preventDefault();

        primeHeaderContentRef.current.classList.remove(OPENED_CLASS);
      },
      []
  );

  return (
    <header className="prime-header">
      <div
        ref={primeHeaderContentRef}
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
        <button className="prime-header__login" type="button">
          <span>Войти в Интернет-банк</span>
        </button>
      </div>
    </header>
  );
};

PrimeHeader.propTypes = {};

export default PrimeHeader;
