import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GridColumn, Grid } from '@progress/kendo-react-grid';
import { withState } from './WithState.js';
import { CommandCell }  from './my-command-cell';

const StatefulGrid = withState(Grid);

class GridExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StatefulGrid
                filterable
                sortlable
                pageable
                pageSize={10}
                reordalable
                resizable
                editField="inEdit"
          >
          <GridColumn field="id" title="Employee Id" filter="numeric" editable={false}/>
          <GridColumn field="name" title="Name" />
          <GridColumn field="salary" title="Salary" filter="numeric" editor="numeric" />
          <GridColumn
              groupable={false}
              sortable={false}
              filterable={false}
              resizable={false}
              field="_command"
              title=" "
              width="180px"
              cell={CommandCell}
          />
        </StatefulGrid>
      </div>
    );
  }
}

export default GridExample;

