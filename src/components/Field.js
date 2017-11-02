import React, {Component} from 'react';
import FieldTable from './FieldTable';
import FieldRow from './FieldRow';
import TableCell from './TableCell';
import Button from './button/Button';
import RemoveButton from './button/RemoveButton';
import update from 'react-addons-update';

const timer = 2000;

export default class Field extends Component {
    constructor(props) {
        super(props);
        this.hideTimerId = 0;
        this.state = {
            fieldTable: [
                ['a1', 'a2', 'a3', 'a4'],
                ['b1', 'b2', 'b3', 'b4'],
                ['c1', 'c2', 'c3', 'c4'],
                ['d1', 'd2', 'd3', 'd4'],
            ],
            rowRemoveButton: {
                rowIndex: 0,
                isHidden: true,
                style: {
                    top: 0,
                },
            },
            colRemoveButton: {
                colIndex: 0,
                isHidden: true,
                style: {
                    left: 0,
                },
            },
        };
    }

    moveRemoveButtons = event => {
        if (event.target instanceof HTMLTableCellElement) {
            const cell = event.target;
            this.setState({
                rowRemoveButton: {
                    style: {top: cell.offsetTop},
                    rowIndex: cell.parentElement.rowIndex,
                    isHidden: this.getRowCount() <= 1,
                },
                colRemoveButton: {
                    style: {left: cell.offsetLeft},
                    colIndex: cell.cellIndex,
                    isHidden: this.getColCount() <= 1,
                },
            });
        }
    };

    showRowRemoveButton = () => {
        clearTimeout(this.hideTimerId);
        this.setState(({rowRemoveButton: prevColRemoveButton}) => {
            const colRemoveButton = update(prevColRemoveButton, {isHidden: {$set: true}});
            return {colRemoveButton};
        });
    };

    showColRemoveButton = () => {
        clearTimeout(this.hideTimerId);
        this.setState(({colRemoveButton: prevRowRemoveButton}) => {
            const rowRemoveButton = update(prevRowRemoveButton, {isHidden: {$set: true}});
            return {rowRemoveButton};
        });
    };

    addRow = () => {
        this.setState(({fieldTable: prevFieldTable}) => {
            const fieldTable = update(prevFieldTable,
                {$splice: [[-1, 0, [...prevFieldTable[0]]]]});
            return {fieldTable};
        });
    };

    addCol = () => {
        this.setState(({fieldTable: prevFieldTable}) => {
            const fieldTable = prevFieldTable.map(row => {
                row = [...row, ...[Date.now()]];
                return row;
            });
            return {fieldTable};
        });
    };

    removeRow = () => {
        if (this.getRowCount() > 1) {
            this.setState((
                {fieldTable: prevFieldTable,
                    rowRemoveButton: prevRowRemoveButton}) => {
                const fieldTable
                    = update(prevFieldTable,
                    {$splice: [[prevRowRemoveButton.rowIndex, 1]]});
                const rowRemoveButton
                    = update(prevRowRemoveButton, {isHidden: {$set: true}});
                return {fieldTable, rowRemoveButton};
            });
        }
    };

    removeCol = () => {
        if (this.getColCount() > 1) {
            this.setState((
                {fieldTable: prevFieldTable,
                    colRemoveButton: prevColRemoveButton}) => {
                const fieldTable = prevFieldTable.map(row => {
                    return update(row, {$splice: [[prevColRemoveButton.colIndex, 1]]});
                });
                const colRemoveButton = update(prevColRemoveButton, {isHidden: {$set: true}});
                return {fieldTable, colRemoveButton};
            });
        }
    };

    hideRemoveButtons = () => {
        this.hideTimerId = setTimeout(() => {
            this.setState((
                {rowRemoveButton: prevRowRemoveButton, colRemoveButton: prevColRemoveButton}) => {
                const colRemoveButton = update(prevColRemoveButton, {isHidden: {$set: true}});
                const rowRemoveButton = update(prevRowRemoveButton, {isHidden: {$set: true}});
                return {rowRemoveButton, colRemoveButton};
            });
        }, timer);
    };

    getRowCount = () => this.state.fieldTable.length;

    getColCount = () => this.state.fieldTable[0].length;

    getRowRemoveButtonProps = () => {
        return this.getRemoveButtonProps({
            className: 'field__button_remove-row',
            onClick: this.removeRow,
            onMouseEnter: this.showRowRemoveButton,
            ...this.state.rowRemoveButton,
        });
    };

    getColRemoveButtonProps = () => {
        return this.getRemoveButtonProps({
            className: 'field__button_remove-col',
            onClick: this.removeCol,
            onMouseEnter: this.showColRemoveButton,
            ...this.state.colRemoveButton,
        });
    };

    getRemoveButtonProps = (specificProps) => {
        return {
            ...specificProps,
            onMouseLeave: this.hideRemoveButtons,
        };
    };

    render() {
        const rowList = this.state.fieldTable.map((row, index) => {
            const cellList = row.map((item, index) => <TableCell key={index}>{item}</TableCell>);
            return <FieldRow key={index}>{cellList}</FieldRow>;
        });

        return (
            <div className="field">
                <Button
                    className ="field__button_add field__button_add-row"
                    onClick={this.addRow}/>
                <Button
                    className ="field__button_add field__button_add-col"
                    onClick={this.addCol}/>
                <RemoveButton {...this.getRowRemoveButtonProps()}/>
                <RemoveButton {...this.getColRemoveButtonProps()}/>
                <FieldTable
                    onMouseEnter={() => clearTimeout(this.hideTimerId)}
                    onMouseLeave={this.hideRemoveButtons}
                    onMouseOver={this.moveRemoveButtons}>
                    {rowList}
                </FieldTable>
            </div>
        );
    }
}