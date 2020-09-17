import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ChildMessageRenderer = (props) => {
  const onDelete = () => {
    props.context.onDelete(props);
  };
  const onEdit = () => {
    props.context.onEdit(props);
  };
  return (
    <span>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <EditIcon onClick={onEdit}/>
      </IconButton>
      <IconButton color="primary" aria-label="upload picture" component="span">
        <DeleteOutlineIcon onClick={onDelete}/>
      </IconButton>
    </span>
  );
};

const DetailGrid = (props) => {
  const [gridApi, setGridApi] = useState({});  

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const onSelectionChanged = () => {
    //let selectedRow = gridApi.getSelectedRows();
    //console.log(selectedRow)
  };

  const onRowSelected = () => {
    //let selectedRow = gridApi.getSelectedRows();
    //console.log(selectedRow)
  };

  const onDelete = (gird) => {
    let gridApi = gird.api;
    let selectedRow = gridApi.getSelectedRows();
    let rowIndex = gird.rowIndex;
    props.delete(rowIndex);
    gridApi.applyTransaction({ remove: selectedRow });
  };

  const onEdit = (gird) => {
    let gridApi = gird.api;
    let selectedRow = gridApi.getSelectedRows();
    let rowIndex = gird.rowIndex;
    props.edit(rowIndex, selectedRow);
    console.log(selectedRow)
  };

  return (
    <div
      id="myGrid"
      style={{
        position: "absolute",
        height: "48%",
        width: "90%",
        left: "30px",
      }}
      className="ag-theme-alpine"
    >
      <AgGridReact
        defaultColDef={{
          width: 180,
          editable: false,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          resizable: true,
        }}
        rowSelection={"single"}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        onRowSelected={onRowSelected}
        columnTypes={{
          numberColumn: {
            width: 150,
          },
          type: "numericColumn",
        }}
        rowData={props.data}
        context={{
          onDelete,
          onEdit
        }}
        frameworkComponents={{
          childMessageRenderer: ChildMessageRenderer,
        }}
      >
        <AgGridColumn
          headerName="Family Name"
          field="familyName"
        ></AgGridColumn>
        <AgGridColumn
          headerName="Phone Number"
          field="phoneNumber"
          type="numberColumn"
        ></AgGridColumn>
        <AgGridColumn
          headerName="Apartment Detail"
          field="apartmentDetail"
        ></AgGridColumn>
        <AgGridColumn headerName="Name" field="name"></AgGridColumn>
        <AgGridColumn
          headerName="Age"
          type="numberColumn"
          field="age"
        ></AgGridColumn>
        <AgGridColumn headerName="Gender" field="gender"></AgGridColumn>
        <AgGridColumn
          headerName="Relation Ship To Head"
          field="relationshipToHead"
        ></AgGridColumn>
        <AgGridColumn
          field="value"
          cellRenderer="childMessageRenderer"
          colId="params"
        />
      </AgGridReact>
    </div>
  );
};
export default DetailGrid;
