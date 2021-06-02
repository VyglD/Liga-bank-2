import React from "react";
import PropTypes from "prop-types";
import {
  getFocusableElements,
  getNextArrayIndex,
  getPreviousArrayIndex,
  hidePageScrollbar,
  displayPageScrollbar,
} from "../../utils";
import {Key} from "../../constants";

const POPUP_CLASS = `popup`;

const Popup = (props) => {
  const {
    children,
    onCloseButtonClick,
    closeButtonClass = ``,
    contentWrapperClass = ``,
  } = props;

  const popupContentRef = React.useRef();
  const previousFocusableElement = React.useRef(document.activeElement);

  const handleFocusElementChange = React.useCallback(
      (evt) => {
        if (evt.key === Key.TAB) {
          const focusableElements = getFocusableElements(popupContentRef.current);
          const indexElement = evt.shiftKey
            ? getPreviousArrayIndex(
                focusableElements.indexOf(document.activeElement),
                focusableElements
            )
            : getNextArrayIndex(
                focusableElements.indexOf(document.activeElement),
                focusableElements
            );

          evt.preventDefault();

          focusableElements[indexElement].focus();
        }
      },
      [popupContentRef]
  );

  const handlePopupOverlayClick = React.useCallback(
      (evt) => {
        if (evt.target.classList.contains(POPUP_CLASS)) {
          onCloseButtonClick(evt);
        }
      },
      [onCloseButtonClick]
  );

  const handleEscKeyDown = React.useCallback(
      (evt) => {
        if (evt.key === Key.ESC) {
          onCloseButtonClick(evt);
        }
      },
      [onCloseButtonClick]
  );

  React.useEffect(
      () => {
        document.addEventListener(`keydown`, handleEscKeyDown);
        document.addEventListener(`keydown`, handleFocusElementChange);

        hidePageScrollbar();

        getFocusableElements(popupContentRef.current)?.[0]?.focus();

        return () => {
          document.removeEventListener(`keydown`, handleEscKeyDown);
          document.removeEventListener(`keydown`, handleFocusElementChange);

          displayPageScrollbar();

          /* eslint-disable-next-line react-hooks/exhaustive-deps */
          previousFocusableElement.current.focus();
        };
      },
      [handleEscKeyDown, handleFocusElementChange]
  );

  return (
    <div
      className={POPUP_CLASS}
      onClick={handlePopupOverlayClick}
    >
      <div
        ref={popupContentRef}
        className={`popup__content ${contentWrapperClass}`}
      >
        {children}
        <button
          className={`popup__close-button ${closeButtonClass}`}
          type="button"
          aria-label="Закрыть попап"
          onClick={onCloseButtonClick}
        />
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  onCloseButtonClick: PropTypes.func.isRequired,
  closeButtonClass: PropTypes.string,
  contentWrapperClass: PropTypes.string,
};

export default Popup;
