import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../action-button/action-button";

const ServiceOne = (props) => {
  const {key, modifier} = props;

  return (
    <div
      key={key}
      className={`services__service services__service--${modifier}`}
    >
      <h3 className="services__service-title">
        Вклады Лига Банка – это выгодная инвестиция в свое будущее
      </h3>
      <ul className="services__service-advantages-list">
        <li className="services__service-advantage">
          Проценты по вкладам до 7%
        </li>
        <li className="services__service-advantage">
          Разнообразные условия
        </li>
        <li className="services__service-advantage">
          Возможность ежемесячной капитализации
          или вывод процентов на банковскую карту
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

ServiceOne.propTypes = {
  key: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
};

export default ServiceOne;
