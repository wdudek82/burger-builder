import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './NavigationItem.css';

class NavigationItem extends React.Component {
  render() {
    return (
      <li className={classes.NavigationItem}>
        <NavLink
          to={this.props.link}
          exact={this.props.exact}
          activeClassName={classes.active}
        >
          {this.props.children}
        </NavLink>
      </li>
    )
  }
};

export default withRouter(NavigationItem);
