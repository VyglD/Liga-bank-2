import React from "react";
import SlickSlider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSettings = {
  dots: true,
  dotsClass: `slider__slides-points-list`,
  infinite: true,
  arrows: false,
  accessibility: true,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 4000,
  className: `slider__slides-list`,
  initialSlide: 0,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Slider = () => {
  return (
    <section
      className="slider"
    >
      <h2 className="slider__titile visually-hidden">
        Узнай возможности нашего банка
      </h2>
      <SlickSlider {...SlickSettings}>
        <div className="slider__slide slider__slide--one">
          <p className="slider__slide-title">Лига Банк</p>
          <p className="slider__slide-subtitle">Кредиты на любой случай</p>
          <a
            className="slider__slide-button"
            href="#credit-calculator"
          >
            Рассчитать кредит
          </a>
        </div>
        <div className="slider__slide slider__slide--two">
          <p className="slider__slide-title">Лига Банк</p>
          <p className="slider__slide-subtitle">
            Ваша уверенность в завтрашнем дне
          </p>
        </div>
        <div className="slider__slide slider__slide--three">
          <p className="slider__slide-title">Лига Банк</p>
          <p className="slider__slide-subtitle">Всегда рядом</p>
          <a
            className="slider__slide-button"
            href="#contacts"
          >
            Найти отделение
          </a>
        </div>
      </SlickSlider>
    </section>
  );
};

Slider.propTypes = {};

export default Slider;
