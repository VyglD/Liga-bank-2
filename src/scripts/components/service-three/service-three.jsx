import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";

const ServiceThree = (props) => {
  const {key, modifier} = props;

  return (
    <div
      key={key}
      className={`services__service services__service--${modifier}`}
    >
      <h3 className="services__service-title">
        Лига Страхование — застрахуем все что захотите
      </h3>
      <ul className="services__service-advantages-list">
        <li className="services__service-advantage">
          Автомобильное страхование
        </li>
        <li className="services__service-advantage">
          Страхование жизни и здоровья
        </li>
        <li className="services__service-advantage">
          Страхование недвижимости
        </li>
      </ul>
      <ActionButton
        href="#blank"
        className="services__service-button"
      >
        Узнать подробнее
      </ActionButton>
    </div>
  );
};

ServiceThree.propTypes = {
  key: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ServiceThree;
