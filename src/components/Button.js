import propTypes from 'prop-types';
import React from 'react';
import './Button.css';

export default function Button({
  disabled,
  dataId,
  text,
  functionButton,
}) {
  return (
    <button
      className="Button"
      type="button"
      data-testid={ dataId }
      onClick={ functionButton }
      disabled={ disabled }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  disabled: propTypes.bool.isRequired,
  dataId: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  functionButton: propTypes.string.isRequired,
};
