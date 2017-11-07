import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import './style/firstTable.css';

const initialData = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
];

ReactDOM.render(
	<Table  tableData={initialData}/>,
	document.getElementById('root')
);

