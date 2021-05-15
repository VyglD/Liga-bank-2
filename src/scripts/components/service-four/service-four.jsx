import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";

const ServiceFour = (props) => {
  const {key, modifier} = props;

  return (
    <div
      key={key}
      className={`services__service services__service--${modifier}`}
    >
      <h3 className="services__service-title">
        Лига Банк — это огромное количество онлайн-сервисов для вашего удобства
      </h3>
      <ul className="services__service-advantages-list">
        <li className="services__service-advantage">
          Мобильный банк, который&nbsp;всегда&nbsp;под&nbsp;рукой
        </li>
        <li className="services__service-advantage">
          Приложение Лига-проездной позволит вам оплачивать билеты по всему миру
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

ServiceFour.propTypes = {
  key: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ServiceFour;
