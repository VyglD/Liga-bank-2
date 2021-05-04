import React from "react";
import {getNextArrayIndex, getPreviousArrayIndex, animate} from "../../utils";

const SLIDE_1 = (
  <React.Fragment>
    <p className="slider__slide-title">Лига Банк</p>
    <p className="slider__slide-subtitle">Кредиты на любой случай</p>
    <a
      className="slider__slide-button"
      href="#credit-calculator"
    >
      Рассчитать кредит
    </a>
  </React.Fragment>
);

const SLIDE_2 = (
  <React.Fragment>
    <p className="slider__slide-title">Лига Банк</p>
    <p className="slider__slide-subtitle">
      Ваша уверенность в завтрашнем дне
    </p>
  </React.Fragment>
);

const SLIDE_3 = (
  <React.Fragment>
    <p className="slider__slide-title">Лига Банк</p>
    <p className="slider__slide-subtitle">Всегда рядом</p>
    <a
      className="slider__slide-button"
      href="#contacts"
    >
      Найти отделение
    </a>
  </React.Fragment>
);

const Slides = [
  {
    component: SLIDE_1,
    modifier: `one`,
    // active: true,
  },
  {
    component: SLIDE_2,
    modifier: `two`,
    // active: false,
  },
  {
    component: SLIDE_3,
    modifier: `three`,
    // active: false,
  },
];

const LAST_INDEX = Slides.length - 1;

const LEFT_BORDER = 0;
const RIGHT_BORDER = LAST_INDEX * -100;

const Slider = () => {
  const slidesListRef = React.useRef();
  const pointsListRef = React.useRef();

  const [activeSlide, setActiveSlide] = React.useState(Slides[0]);

  const setSlidesDirection = React.useCallback(
      (isLeft = true) => {
        const multiplier = isLeft ? 1 : -1;

        const slideNodes = Array.from(slidesListRef.current.children);
        slideNodes.forEach((slide, index) => {
          slide.style.left = `${index * multiplier * 100}%`;
        });
      },
      []
  );

  React.useEffect(
      () => {
        setSlidesDirection();

        // const pointNodes = Array.from(pointsListRef.current.children);
        // pointNodes.forEach((node, index) => {
        //   if (Slides[index].active) {
        //     node.classList.add(`slider__point--active`);
        //   }
        // });
      },
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      []
  );

  const handleMouseDownOnSlide = React.useCallback(
      (downEvt) => {
        // console.log(downEvt);
        const width = slidesListRef.current.offsetWidth;
        const currentX = slidesListRef.current.offsetLeft;
        const currentPercent = currentX / width * 100;
        let startX = downEvt.pageX;

        let activeIndex = Slides.findIndex((slide) => slide === activeSlide);
        let crossBorderRight = currentPercent - 50;
        let crossBorderLeft = currentPercent + 50;

        let cachedMoveEvt = null;

        // console.log();

        const handleMouseMove = (moveEvt) => {
          const endX = moveEvt.pageX;

          if (endX !== startX) {
            const newOffset = currentX + (endX - startX);
            let newPercent = newOffset / width * 100;

            if (!cachedMoveEvt) {
              console.log(crossBorderLeft, crossBorderRight);
              setTimeout(() => {
                //предыдущее событие доступно через переменную cached
                cachedMoveEvt = null;
              }, 100);
            }
            cachedMoveEvt = moveEvt;

            if (newPercent < LEFT_BORDER && newPercent >= RIGHT_BORDER) {
              if (newPercent <= crossBorderRight) {
                activeIndex = getNextArrayIndex(activeIndex, Slides);
                setActiveSlide(Slides[activeIndex]);
                crossBorderRight += -100;
                crossBorderLeft += -100;
              } else if (newPercent > crossBorderLeft) {
                activeIndex = getPreviousArrayIndex(activeIndex, Slides);
                setActiveSlide(Slides[activeIndex]);
                crossBorderRight += 100;
                crossBorderLeft += 100;
              }
            } else {
              if (newPercent < RIGHT_BORDER) {
                let tempIndex = activeIndex;
                let tempNumber = 0;

                do {
                  const slideNodes = Array.from(slidesListRef.current.children);
                  slideNodes[tempIndex].style.left = `${tempNumber * 100}%`;
                  tempNumber++;
                  tempIndex = getNextArrayIndex(tempIndex, Slides);
                } while (tempIndex !== activeIndex);

                startX += -1 * LAST_INDEX * width;
                newPercent = LEFT_BORDER;
                // console.log(`change`);

                crossBorderRight = -50;
                crossBorderLeft = 50;
              } else {
                let tempIndex = activeIndex;
                let tempNumber = 0;

                do {
                  const slideNodes = Array.from(slidesListRef.current.children);
                  slideNodes[tempIndex].style.left = `${-1 * RIGHT_BORDER - tempNumber * 100}%`;
                  tempNumber++;
                  tempIndex = getPreviousArrayIndex(tempIndex, Slides);
                } while (tempIndex !== activeIndex);

                startX += LAST_INDEX * width;
                newPercent = RIGHT_BORDER;

                crossBorderRight = RIGHT_BORDER - 50;
                crossBorderLeft = RIGHT_BORDER + 50;

                // console.log(`change`);
              }
            }

            slidesListRef.current.style.left = `${newPercent}%`;
          }
        };

        const handleMouseUp = (upEvt) => {
          const endX = upEvt.pageX;

          if (endX !== startX) {
            const newOffset = currentX + (endX - startX);
            const currentValue = newOffset / width * 100;

            const newValue = Math.round(currentValue / 100) * 100;
            const difference = newValue - currentValue;

            animate({
              duration: 100,
              timing(timeFraction) {
                return timeFraction;
              },
              draw(progress) {
                const progressValue = currentValue + difference * progress;

                slidesListRef.current.style.left = `${progressValue}%`;
              }
            });
          }

          document.removeEventListener(`mousemove`, handleMouseMove);
          document.removeEventListener(`mouseup`, handleMouseUp);
        };

        document.addEventListener(`mousemove`, handleMouseMove);
        document.addEventListener(`mouseup`, handleMouseUp);
      },
      [activeSlide]
  );

  return (
    <section
      className="slider"
      onMouseDown={handleMouseDownOnSlide}
    >
      <h2 className="slider__titile visually-hidden">
        Узнай возможности нашего банка
      </h2>
      <ul
        ref={slidesListRef}
        className="slider__slides-list"
      >
        {
          Slides.map(({component, modifier, active}, index) => {
            const classes = [
              `slider__slide`,
              `slider__slide--${modifier}`,
              active ? `slider__slide--active` : ``,
            ];

            return (
              <li
                key={index}
                className={classes.join(` `).trim()}
              >
                {component}
              </li>
            );
          })
        }
      </ul>
      <ul
        ref={pointsListRef}
        className="slider__slides-points-list"
      >
        {
          Slides.map((slide, index) => {
            const classes = [
              `slider__point`,
              slide === activeSlide ? `slider__point--active` : ``,
            ];

            return (
              <li
                key={index}
                // УБРАТЬ В СКРИПТ
                className={classes.join(` `).trim()}
              />
            );
          })
        }
      </ul>
    </section>
  );
};

Slider.propTypes = {};

export default Slider;
