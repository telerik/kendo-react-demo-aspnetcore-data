import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";

export const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];

  return (
    <td className="k-command-cell">
      <Button themeColor={"primary"} onClick={() => inEdit ? props.update(dataItem) : props.edit(dataItem) } >
        {inEdit ? "Update" : "Edit"}
      </Button>
      <Button themeColor={"primary"} onClick={() => props.cancel(dataItem)} >
        {inEdit ? "Cancel" : "Remove"}
      </Button>
    </td>
  );
};
