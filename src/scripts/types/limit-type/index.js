import PropTypes from "prop-types";

const limitType = PropTypes.shape({
  MIN: PropTypes.number.isRequired,
  MAX: PropTypes.number.isRequired,
}).isRequired;

export {
  limitType,
};
