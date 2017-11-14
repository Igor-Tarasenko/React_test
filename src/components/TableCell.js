import React from 'react';
import './Cell.css'

export default function TableCell(props) {
    return(
        <td className='table__cell'>
            {props.children}
        </td>
    );
}