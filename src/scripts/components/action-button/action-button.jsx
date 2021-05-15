import React from "react";
import PropTypes from "prop-types";
import {trimClasses} from "../../utils";

const ActionButton = (props) => {
  const {
    children,
    inverted,
    className,
    href = null,
    type = `button`,
    disabled = false,
    onClick = () => {},
  } = props;

  const classes = [
    `action-button`,
    inverted ? `action-button--inverted` : ``,
    className ? className : ``,
  ];

  return (
    href
      ? (
        <a
          className={trimClasses(classes)}
          href={href}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </a>
      )
      : (
        <button
          className={trimClasses(classes)}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  href: PropTypes.string,
  inverted: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ActionButton;
