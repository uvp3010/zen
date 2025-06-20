// src/Badge.jsx

import { FaAward } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Badge = ({ text }) => {
  return (
    <div className="inline-flex items-center bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
      <FaAward className="mr-1" />
      {text}
    </div>
  );
};
Badge.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Badge;

