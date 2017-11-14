import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import './style/table.css';

const initialData = [
    ['a1', 'a2', 'a3', 'a4'],
    ['b1', 'b2', 'b3', 'b4'],
    ['c1', 'c2', 'c3', 'c4'],
    ['d1', 'd2', 'd3', 'd4'],
];

ReactDOM.render(
	<Table  row={initialData}/>,
	document.getElementById('root')
);

