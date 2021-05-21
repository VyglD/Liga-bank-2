import React from "react";
import PropTypes from "prop-types";

const SELECT_BUTTON_WRAPPER_CLASS = `calculator__select-button-wrapper`;

const CustomClass = {
  SELECT_BUTTON_WRAPPER: SELECT_BUTTON_WRAPPER_CLASS,
  SELECT_BUTTON_WRAPPER_OPEN: `${SELECT_BUTTON_WRAPPER_CLASS}--open`,
};

const CalculatorStepOne = (props) => {
  const {CreditType, onSelectItemClick} = props;

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
    <div className="calculator__step-1">
      <h3 className="calculator__step-title">Шаг 1. Цель кредита</h3>
      <div
        ref={selectButtonWrapperRef}
        className={CustomClass.SELECT_BUTTON_WRAPPER}
      >
        <button
          ref={selectButtonRef}
          className="calculator__select-button"
          onClick={handleSelectButtonClick}
        >
          Выберите цель кредита
        </button>
        <ul className="calculator__select-list">
          <li className="calculator__select-item-wrapper">
            <button
              className="calculator__select-item"
              data-type={CreditType.MORTAGE}
              onClick={handleSelectItemClick}
            >
              {CreditType.MORTAGE}
            </button>
          </li>
          <li className="calculator__select-item-wrapper">
            <button
              className="calculator__select-item"
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

CalculatorStepOne.propTypes = {
  CreditType: PropTypes.shape().isRequired,
  onSelectItemClick: PropTypes.func.isRequired,
};

export default CalculatorStepOne;
