import React from 'react';

export default function TableCell(props) {
    return(
        <td className='field__cell'>
            {props.children}
        </td>
    );
}