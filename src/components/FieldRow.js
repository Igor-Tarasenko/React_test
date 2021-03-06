import React from 'react';
import PropTypes from 'prop-types';

FieldRow.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default function FieldRow(props) {
    return (
        <tr className='table__row'>
            {props.children}
        </tr>
    );
};