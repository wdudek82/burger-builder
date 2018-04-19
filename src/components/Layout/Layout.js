import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrower: false
  };

  sideDrawerClosedHandler = () => {
    this.setState((prevState) => ({
      showSideDrower: !prevState.showSideDrower
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar closed={this.sideDrawerClosedHandler} />
        <SideDrawer
          open={this.state.showSideDrower}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
