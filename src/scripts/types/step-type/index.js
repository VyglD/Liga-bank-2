import PropTypes from "prop-types";

const stepType = PropTypes.shape({
  COST: PropTypes.number.isRequired,
  PAYMENT: PropTypes.number.isRequired,
  DURATION: PropTypes.number.isRequired,
}).isRequired;

export {
  stepType,
};
