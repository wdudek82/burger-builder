import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

class NavigationItem extends React.Component {
  componentDidMount() {
    console.log('props: ', this.props);
  }

  render() {
    return (
      <li className={classes.NavigationItem}>
        <NavLink
          to={this.props.link}
          activeClassName={this.props.active ? classes.active : null}
        >
          {this.props.children}
        </NavLink>
      </li>
    )
  }
};

export default NavigationItem;
