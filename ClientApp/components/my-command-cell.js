import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export class CommandCell extends GridCell {
    buttonClick = (e, command) => {
        this.props.onChange({ dataItem: this.props.dataItem, e, field: this.props.field, value: command });
    }

    render() {
        if (this.props.rowType !== "data") {
            return null;
        }

        if (this.props.dataItem.inEdit) {
            return (
                <td>
                    <button
                        className="k-button k-grid-save-command"
                        onClick={(e) => this.buttonClick(e, "update")}
                    > Update
                    </button>
                    <button
                        className="k-button k-grid-cancel-command"
                        onClick={(e) => this.buttonClick(e, "cancel")}
                    > Close
                    </button>
                </td>
            );
        }

        return (
            <td>
                <button
                    className="k-primary k-button k-grid-edit-command"
                    onClick={(e) => this.buttonClick(e, "edit")}
                > Edit
                </button>
                <button
                    className="k-button k-grid-remove-command"
                    onClick={
                        (e) => confirm('Confirm deleting: ' + this.props.dataItem.ProductName)
                            && this.buttonClick(e, "delete")
                    }
                > Remove
                </button>
            </td>
        );
    }
}
