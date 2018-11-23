
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  navigationButton: {
    backgroundColor: 'tranparent',
    color: 'rgb(31, 30, 28)',
  },
  navigationBar: {
    backgroundColor: 'rgb(255, 217, 62)',
    maxWidth: 65,
    position: 'fixed',
    top: 30,
    left: 20,
  },
  navigationItem: {
    listStyle: 'none',
  },
});

const handleNavigation = (event) => {
  console.log(event.target);
};

const renderNavigationItems = (items, classes) => {
  return items.map((item) => {
    return (
      <Grid item xs={1} key={item.caption}>
        <li className={`${classes.navigationItem} navigation-item ${item.active ? 'active' : ''}`}>
          <Button
            className={classes.navigationButton}
            aria-label={item.caption}
            onClick={handleNavigation}
          >
            <Icon>{item.icon || 'navigation'}</Icon>
          </Button>
        </li>
      </Grid>
    );
  });
};

const NavigationBar = (props) => {
  const { classes, items } = props;
  return (
    <Grid container direction="column" className={`${classes.navigationBar} navigation-bar`}>
      {renderNavigationItems(items, classes)}
    </Grid>
  );
};

NavigationBar.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
};
NavigationBar.defaultProps = {
  classes: {},
  items: [],
};

export default withStyles(styles)(NavigationBar);
