import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component{
  render() {
    return (
      <div className="main-nav">
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to={"/"}>React Grid With ToDataSourceResult</Link>
          </div>
          <div className="clearfix"/>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink exact to={"/"} activeClassName="active">
                  <span className="glyphicon glyphicon-home"/> Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/gridexample"} activeClassName="active">
                  <span className="glyphicon glyphicon-th-list"/> Grid
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
