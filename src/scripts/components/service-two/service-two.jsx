import React from "react";
import PropTypes from "prop-types";

const ServiceTwo = (props) => {
  const {key, modifier} = props;

  return (
    <div
      key={key}
      className={`services__service services__service--${modifier}`}
    >
      <h3 className="services__service-title">
        Лига Банк выдает кредиты под любые цели
      </h3>
      <ul className="services__service-advantages-list">
        <li className="services__service-advantage">
          Ипотечный кредит
        </li>
        <li className="services__service-advantage">
          Автокредит
        </li>
        <li className="services__service-advantage">
          Потребительский кредит
        </li>
      </ul>
      <p className="services__service-details">
        Рассчитайте ежемесячный платеж и&nbsp;ставку по кредиту
        воспользовавшись нашим&ensp;
        <a className="services__service-details-link" href="#credit-calculator">
          кредитным калькулятором
        </a>
      </p>
    </div>
  );
};

ServiceTwo.propTypes = {
  key: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ServiceTwo;
