import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GridColumn, Grid } from '@progress/kendo-react-grid';
import { withState } from './WithState.js';

const StatefulGrid = withState(Grid);

class GridExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StatefulGrid>
          <GridColumn field="productId" title="Product Id" filter="numeric" />
          <GridColumn field="productName" title="Product Name" />
          <GridColumn field="unitsInStock" title="Units In Stock" filter="numeric" />
        </StatefulGrid>
      </div>
    );
  }
}

export default GridExample;

