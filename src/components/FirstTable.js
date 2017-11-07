import React, {Component} from 'react';
import FieldTable from './FieldTable';
import FieldRow from './FieldRow';
import TableCell from './TableCell';
import Button from './button/Button';
import RemoveButton from './button/RemoveButton';
import update from 'react-addons-update';

const timer = 2000;

export default class FirstTable extends Component {
    constructor(props) {
        super(props);
        this.hideTimerId = 0;
        this.cellTarget = null;
        this.firstStep = [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', '']
        ];
        this.state = {
            // fieldTable: [
            //     ['', '', '', ''],
            //     ['', '', '', ''],
            //     ['', '', '', ''],
            //     ['', '', '', '']
            // ],
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
            this.catchCellRemoveTarget(cell)
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
                row = [...row, ...[prevFieldTable]];
                return row;
            });
            return {fieldTable};
        });
    };

    catchCellRemoveTarget = (targetCell) =>{
        this.cellTarget = targetCell;
    };

    removeRow = () => {
        if (this.getRowCount() > 1) {
            this.cellTarget.parentElement.remove();
            this.setState((
                {rowRemoveButton: prevRowRemoveButton}) => {
                const rowRemoveButton
                    = update(prevRowRemoveButton, {isHidden: {$set: true}});
                return {rowRemoveButton};
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
            this.setState(({ rowRemoveButton, colRemoveButton }) => ({
                rowRemoveButton:  update(rowRemoveButton, {isHidden: {$set: true}}),
                colRemoveButton:  update(colRemoveButton, {isHidden: {$set: true}})
            }));
        }, timer);
    };

    getRowCount = () => this.state.props.firstStep.length;

    getColCount = () => this.state.props.firstStep[0].length;

    getRowRemoveButtonProps = (specificProps) => {
        return {
            ...specificProps,
            onMouseLeave: this.hideRemoveButtons,
            className: 'field__button_remove-row',
            onClick: this.removeRow,
            onMouseEnter: this.showRowRemoveButton,
            ...this.state.rowRemoveButton,
        };
    };

    getColRemoveButtonProps = (specificProps) => {
        return {
            ...specificProps,
            onMouseLeave: this.hideRemoveButtons,
            className: 'field__button_remove-col',
            onClick: this.removeCol,
            onMouseEnter: this.showColRemoveButton,
            ...this.state.colRemoveButton,
        };
    };

    render() {
        const rowList = this.props.firstStep.map((row, index) => {
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