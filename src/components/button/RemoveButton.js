import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';

RemoveButton.propTypes = {
    properties: PropTypes.shape({
            className: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            style: PropTypes.instanceOf(Object),
            isHidden: PropTypes.bool.isRequired,
            onMouseEnter: PropTypes.func.isRequired,
            onMouseLeave: PropTypes.func.isRequired,
        }
    ),
};

export default function RemoveButton(
    {
        className, onClick, style, isHidden, onMouseEnter, onMouseLeave,
    })
{
    return (
        <Button
            className = {`field__button_remove ${className}
                ${classNames({'field__button_hidden': isHidden})}`}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            style={style}
        />
    );
}