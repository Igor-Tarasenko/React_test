import React from 'react';
import PropTypes from 'prop-types';

FieldTable.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    onMouseLeave: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
};

export default function FieldTable(props) {
    return (
        <table
            className = "table__table"
            onMouseLeave = {props.onMouseLeave}
            onMouseOver = {props.onMouseOver}
        >
            <tbody onMouseEnter = {props.onMouseEnter}>
            {props.children}
            </tbody>
        </table>
    );
}