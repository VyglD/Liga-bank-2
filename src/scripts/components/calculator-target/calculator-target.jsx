import React from "react";
import PropTypes from "prop-types";

const SELECT_BUTTON_WRAPPER_CLASS = `calculator-target__select-button-wrapper`;

const CustomClass = {
  SELECT_BUTTON_WRAPPER: SELECT_BUTTON_WRAPPER_CLASS,
  SELECT_BUTTON_WRAPPER_OPEN: `${SELECT_BUTTON_WRAPPER_CLASS}--open`,
};

const CalculatorTarget = (props) => {
  const {className = ``, CreditType, onSelectItemClick} = props;

  const selectButtonWrapperRef = React.useRef();
  const selectButtonRef = React.useRef();

  const handleSelectButtonClick = React.useCallback(
      () => {
        selectButtonWrapperRef.current.classList
          .toggle(CustomClass.SELECT_BUTTON_WRAPPER_OPEN);
      },
      []
  );

  const handleSelectItemClick = React.useCallback(
      ({target}) => {
        const selecedtType = target.dataset.type;

        selectButtonRef.current.innerText = selecedtType;

        selectButtonWrapperRef.current.classList
          .remove(CustomClass.SELECT_BUTTON_WRAPPER_OPEN);

        onSelectItemClick(selecedtType);
      },
      [onSelectItemClick]
  );

  return (
    <div className={`${className} calculator-target`}>
      <h3 className="calculator-target__title">Шаг 1. Цель кредита</h3>
      <div
        ref={selectButtonWrapperRef}
        className={CustomClass.SELECT_BUTTON_WRAPPER}
      >
        <button
          ref={selectButtonRef}
          className="calculator-target__select-button"
          onClick={handleSelectButtonClick}
        >
          Выберите цель кредита
        </button>
        <ul className="calculator-target__select-list">
          <li className="calculator-target__select-item-wrapper">
            <button
              className="calculator-target__select-item"
              data-type={CreditType.MORTAGE}
              onClick={handleSelectItemClick}
            >
              {CreditType.MORTAGE}
            </button>
          </li>
          <li className="calculator-target__select-item-wrapper">
            <button
              className="calculator-target__select-item"
              data-type={CreditType.AUTO}
              onClick={handleSelectItemClick}
            >
              {CreditType.AUTO}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

CalculatorTarget.propTypes = {
  className: PropTypes.string,
  CreditType: PropTypes.shape().isRequired,
  onSelectItemClick: PropTypes.func.isRequired,
};

export default CalculatorTarget;
