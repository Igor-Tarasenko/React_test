import React from 'react';
import PropTypes from 'prop-types';

FieldRow.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default function FieldRow(children) {
    return (
        <tr className='field__row'>
            {children}
        </tr>
    );
};