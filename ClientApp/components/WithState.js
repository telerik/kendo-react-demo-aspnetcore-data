import React from 'react';
import { toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
import { GridColumn, GridToolbar, Grid } from '@progress/kendo-react-grid';



export function withState(WrappedGrid) {
    return class StatefullGrid extends React.Component {
        constructor(props) {
            super(props);
            this.state = { dataState: { skip: 0, take: 2 } };
        }

        render() {
            return (
                <Grid
                    editField="_command"
                    {...this.props}
                    {...this.state.dataState}
                    total={this.state.total}
                    data={this.state.result}
                    onItemChange={this.itemChange}
                    onDataStateChange={this.onDataStateChange}
                >
                    <GridToolbar>
                        <button
                            title="Add new"
                            className="k-button k-primary"
                            onClick={this.addNew}
                        >Add new
                </button>
                    </GridToolbar>

                    {this.props.children}

                </Grid>
            );
        }

        componentDidMount() {
            this.fetchData(this.state.dataState);
        }

        addNew = () => {
            const data = this.state.result
            data.unshift({ "_command": true, inEdit: true });
            this.setState({
                result: data
            }); 
        };

        enterEdit = (item) => {
            this.itemInEdit = Object.assign(item, {});
            item.inEdit = true;
            this.forceUpdate();
        }

        addItem = (item) => {
            const queryStr = this.serialize(item); // Serialize the state
            const base_url = 'api/Employee';
            const init = { method: 'POST', accept: 'application/json', headers: {} };
            fetch(`${base_url}?${queryStr}&${toDataSourceRequestString(this.state.dataState)}`, init)
                .then(response => response.json())
                .then(json => this.setState({ result: json.data }))
        }

        cancelEdit = (item) => {
            this.itemInEdit = {};
            let data = this.state.result;
            let mappedData = data.map(record => {
                if (record.Id === this.itemInEdit.Id) {
                    record = this.itemInEdit;
                    record.itemInEdit = false
                } else {
                    record.itemInEdit = false;
                }
                return record
            });   
            let filteredData = mappedData.filter(obj => Object.keys(obj).includes("Id"));
            this.setState({
                result: filteredData
            })
        };

        deleteItem = (item) => {
            const queryStr = this.serialize(item); // Serialize the state
            const base_url = 'api/Employee';
            const init = { method: 'DELETE', accept: 'application/json', headers: {} };
            fetch(`${base_url}?${queryStr}&${toDataSourceRequestString(this.state.dataState)}`, init)
                .then(response => response.json())
                .then(json => this.setState({ result: json.data }))
        }

        updateItem = (item) => {
            const queryStr = this.serialize(item); // Serialize the state
            const base_url = 'api/Employee';
            const init = { method: 'PUT', accept: 'application/json', headers: {} };
            fetch(`${base_url}?${queryStr}&${toDataSourceRequestString(this.state.dataState)}`, init)
                .then(response => response.json())
                .then(json => this.setState({ result: json.data }))
        }

        itemChange = (event) => {
            switch (event.value) {
                case "edit":
                    this.enterEdit(event.dataItem)
                    break;
                case "delete":
                    this.deleteItem(event.dataItem)
                    break;
                case "update":
                    if (event.dataItem.id) {
                        this.updateItem(event.dataItem)
                    } else {
                        this.addItem(event.dataItem)
                    }
                    break;
                case "cancel":
                    this.cancelEdit(event.dataItem)
                    break;
                default:
                    const data = this.state.result.slice();
                    const index = data.findIndex(d => d.id === event.dataItem.id);
                    data[index] = { ...data[index], [event.field]: event.value };
                    this.setState({
                        result: data
                    });
            }

        };

        onDataStateChange = (changeEvent) => {
            this.setState({ dataState: changeEvent.data });
            this.fetchData(changeEvent.data);
        }

        serialize = (obj) => {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }

        fetchData(dataState) {
            const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state

            const base_url = 'api/Employee';
            const init = { method: 'GET', accept: 'application/json', headers: {} };

            fetch(`${base_url}?${queryStr}`, init)
                .then(response => response.json())
                .then(({ data, total }) => {
                    this.setState({
                        result: data,
                        total,
                        dataState
                    });
                });
        }
    }
}
