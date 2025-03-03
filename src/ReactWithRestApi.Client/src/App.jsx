import * as React from "react";
import { toDataSourceRequestString } from "@progress/kendo-data-query";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { MyCommandCell } from "./CustomCommandCell.jsx";

const editField = "inEdit";

const App = () => {
  const [state, setState] = React.useState({
    data: [],
    total: 0,
    dataState: { skip: 0, take: 10, filter: null, sort: null, group: [] },
  });

  const base_url = "https://localhost:7241/api/Customers";

  React.useEffect(() => {
    // console.log("Initial State:", state);
    getItems(state.dataState);
  }, []);

  const getItems = (dataState) => {
    const queryStr = toDataSourceRequestString(dataState);
    fetch(`${base_url}?${queryStr}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseBody) => {
          const { data: responseData = [], total = 0 } = responseBody || {};
          responseData.forEach((item) => {
              var dob = item.dateOfBirth.split(/\D+/);
              item.dateOfBirth = new Date(dob[0], dob[1], dob[2]);
          })
        setState((prev) => ({
          ...prev,
          data: responseData,
          total: total,
          dataState: dataState,
        }));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const enterEdit = (dataItem) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === dataItem.id ? { ...item, inEdit: true } : item
      ),
    }));
  };

  const itemChange = (event) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === event.dataItem.id
          ? { ...item, [event.field || ""]: event.value }
          : item
      ),
    }));
  };

  const update = (dataItem) => {
    fetch(`${base_url}/${dataItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataItem),
    })
      .then(() => {
        setState((prev) => ({
          ...prev,
          data: prev.data.map((item) =>
            item.id === dataItem.id ? { ...dataItem, inEdit: false } : item
          ),
        }));
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const cancel = (dataItem) => {
    setState((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === dataItem.id ? { ...item, inEdit: false } : item
      ),
    }));
  };

  const commandCellProps = {
    edit: enterEdit,
    update: update,
    cancel: cancel,
    editField: editField,
  };

  return (
    <Grid
      style={{  }}
      data={state.data}
      total={state.total}
      skip={state.dataState.skip}
      pageSize={state.dataState.take}
      filter={state.dataState.filter}
      sort={state.dataState.sort}
      pageable
      sortable
      filterable
      onDataStateChange={(e) => {
        setState((prev) => ({ ...prev, dataState: e.dataState }));
        getItems(e.dataState);
      }}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <Button themeColor={"primary"} onClick={() => console.log("Add New")}>
          Add New
        </Button>
      </GridToolbar>
      <Column field="id" title="ID" editable={false} width="50px" />
          <Column field="name" title="Name" editable={true} />
          <Column field="age" title="Age" editable={true}  />
          <Column field="dateOfBirth" title="Date of Birth" format="{0:M}" editable={true} filter="date" />
      <Column
        cell={(props) => <MyCommandCell {...props} {...commandCellProps} />}
        width="150px"
      />
    </Grid>
  );
};

export default App;
