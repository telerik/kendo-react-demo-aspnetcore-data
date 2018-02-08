import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import GridExample from './components/GridExample';

const Routes = ()=>{
  return (
    <Layout>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/gridexample" component={GridExample}/>
      </div>
    </Layout>
  );
};

export default Routes;
