import React from "react";
import SlickSlider from "react-slick";
import ServiceOne from "../service-one/service-one";
import ServiceTwo from "../service-two/service-two";
import ServiceThree from "../service-three/service-three";
import ServiceFour from "../service-four/service-four";
import {trimClasses} from "../../utils";
import {Breakpoint} from "../../constants";

const SlickSettings = {
  dotsClass: `services__points-list`,
  infinite: true,
  arrows: false,
  accessibility: true,
  adaptiveHeight: false,
  className: `services__list`,
  initialSlide: 0,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SERVICES = [
  {
    title: `Вклады`,
    modifier: `one`,
    component: ServiceOne,
  },
  {
    title: `Кредиты`,
    modifier: `two`,
    component: ServiceTwo,
  },
  {
    title: `Страхование`,
    modifier: `three`,
    component: ServiceThree,
  },
  {
    title: `Онлайн-сервисы`,
    modifier: `four`,
    component: ServiceFour,
  },
];

const Services = () => {
  const [scrollable, changeScrollingStatus] = React.useState(false);
  const [dotsVisibility, setDotsVisibility] = React.useState(false);
  const [activeService, setActiveService] = React.useState(SERVICES[0]);

  const slickSliderRef = React.useRef();

  const setScrolling = React.useCallback(
      () => {
        const isMobileMode = window.innerWidth < Breakpoint.DESKTOP;

        changeScrollingStatus(isMobileMode);
        setDotsVisibility(isMobileMode);
      },
      []
  );

  React.useEffect(
      () => {
        setScrolling();

        window.addEventListener(`resize`, setScrolling);

        return () => {
          window.removeEventListener(`resize`, setScrolling);
        };
      },
      [setScrolling]
  );

  const changeActiveService = React.useCallback(
      (serviceIndex) => {
        setActiveService(SERVICES[serviceIndex]);
      },
      []
  );

  const handleTabClick = React.useCallback(
      (evt) => {
        const newServiceIndex = evt.target
          .closest(`.services__tab-button`)
          .dataset.index;

        setActiveService(SERVICES[newServiceIndex]);
        slickSliderRef.current.slickGoTo(newServiceIndex, true);
      },
      []
  );

  return (
    <section className="services">
      <h2 className="services__title visually-hidden">Услуги нашего банка</h2>
      <ul className="services__tabs">
        {
          SERVICES.map((service, index) => {
            const isActive = activeService === service;
            const classes = [
              `services__tab-item`,
              `services__tab-item--${service.modifier}`,
              isActive ? `services__tab-item--active` : ``,
            ];

            return (
              <li
                key={index}
                className={trimClasses(classes)}
              >
                <button
                  className="services__tab-button"
                  type="button"
                  data-index={index}
                  disabled={isActive}
                  onClick={handleTabClick}
                >
                  {service.title}
                </button>
              </li>
            );
          })
        }
      </ul>
      <SlickSlider
        ref={slickSliderRef}
        {...SlickSettings}
        dots={dotsVisibility}
        swipe={scrollable}
        afterChange={changeActiveService}
      >
        {
          SERVICES.map((service, index) => {
            const componentProps = {
              key: index,
              modifier: service.modifier,
            };

            return (service.component)(componentProps);
          })
        }
      </SlickSlider>
    </section>
  );
};

Services.propTypes = {};

export default Services;
