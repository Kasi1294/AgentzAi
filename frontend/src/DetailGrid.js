import React from "react";
import MaterialTable from "material-table";

export default function DetailGrid(props) {
  const columns = [
    { title: "Family Name", field: "familyName" },
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Apartment Detail", field: "apartmentDetail" },
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Gender", field: "gender" },
    { title: "Relationship To Head", field: "relationshipToHead" },
  ];

  const dataFromParent = props.data;
  const [rowData, setRowData] = React.useState(dataFromParent);

  React.useEffect(() => {
    setRowData([...dataFromParent]);
  }, [dataFromParent]);

  return (
    <MaterialTable
      options={{
        search: false,
        actionsColumnIndex: -1
      }}
      title="DETAILS"
      columns={columns}
      data={rowData}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) => {
            new Promise((resolve, reject) => {
              const index = rowData.tableData.id;
              props.edit(index, rowData)
            }).then(Promise.resolve())
          }
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          onClick: (event, rowData) => {
            new Promise((resolve, reject) => {
              const index = rowData.tableData.id;
              props.delete(index, rowData)
            }).then(Promise.resolve())
          }
        }
      ]}
    />
  );
}
