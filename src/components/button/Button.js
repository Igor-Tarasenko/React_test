import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

Button.propeTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

export default function Button(props) {
    return (
        <button
            className={`table__button ${props.className}`}
            onClick={props.onClick}
            style={props.style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        />
    );
}