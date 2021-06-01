import React from "react";
import PropTypes from "prop-types";

const SELECT_BUTTON_WRAPPER_CLASS = `calculator-target__select-button-wrapper`;

const CustomClass = {
  DEFAULT: SELECT_BUTTON_WRAPPER_CLASS,
  OPEN: `${SELECT_BUTTON_WRAPPER_CLASS}--open`,
};

const CalculatorTarget = (props) => {
  const {className = ``, CreditType, onSelectItemClick} = props;

  const [currentType, setCurrentType] = React.useState(`Выберите цель кредита`);
  const [selectButtonWrapperClass, setSelectButtonWrapperClass] = React.useState(CustomClass.DEFAULT);

  const handleSelectButtonClick = React.useCallback(
      () => {
        setSelectButtonWrapperClass((currentClass) => {
          return currentClass === CustomClass.DEFAULT
            ? `${CustomClass.DEFAULT} ${CustomClass.OPEN}`
            : CustomClass.DEFAULT;
        });
      },
      []
  );

  const handleSelectItemClick = React.useCallback(
      ({target}) => {
        const selectedType = target.dataset.type;

        setSelectButtonWrapperClass(CustomClass.DEFAULT);
        setCurrentType(selectedType);
        onSelectItemClick(selectedType);
      },
      [onSelectItemClick]
  );

  return (
    <div className={`${className} calculator-target`}>
      <h3 className="calculator-target__title">Шаг 1. Цель кредита</h3>
      <div
        className={selectButtonWrapperClass}
      >
        <button
          className="calculator-target__select-button"
          onClick={handleSelectButtonClick}
        >
          {currentType}
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
  CreditType: PropTypes.exact({
    MORTAGE: PropTypes.string.isRequired,
    AUTO: PropTypes.string.isRequired,
  }).isRequired,
  onSelectItemClick: PropTypes.func.isRequired,
};

export default CalculatorTarget;
