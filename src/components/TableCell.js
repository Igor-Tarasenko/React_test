import React from 'react';

export default function TableCell(props) {
    return(
        <td className='table__cell'>
            {props.children}
        </td>
    );
}