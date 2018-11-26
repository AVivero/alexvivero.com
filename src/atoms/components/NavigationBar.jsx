
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  navigationButton: {
    backgroundColor: 'tranparent',
    color: 'rgb(31, 30, 28)',
    fontSize: 16,
    minWidth: 60,
    minHeight: 60,
    borderRadius: 0,
  },
  navigationButtonIcon: {
    fontSize: 25,
    fontWeight: 'normal',
  },
  navigationBar: {
    backgroundColor: 'rgb(255, 217, 62)',
    maxWidth: 60,
    position: 'fixed',
    top: 30,
    left: '5vw',
    boxShadow: 'rgba(62, 62, 62, 0.3) 0px 0px 80px 0px',
  },
  navigationItem: {
    listStyle: 'none',
  },
  activeNavigationItem: {
    backgroundColor: '#fff',
  },
  navigationItemTooltip: {
    background: '#fff',
    color: 'rgb(31, 30, 28)',
    textTransform: 'uppercase',
    height: 40,
    width: 100,
    fontSize: 14,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      left: -8,
      borderStyle: 'solid',
      borderWidth: '1em 1em 1em 0',
      borderColor: 'transparent #fff transparent transparent',
    },
  },
});

const renderNavigationItems = (items, classes) => {
  return items.map((item) => {
    return (
      <Grid item xs={12} key={item.caption}>
        <Tooltip title={item.caption} placement="right" TransitionComponent={Zoom} classes={{ tooltip: classes.navigationItemTooltip }}>
          <li className={`${classes.navigationItem} navigation-item ${item.active && classes.activeNavigationItem}`}>
            <Button
              className={`${classes.navigationButton}`}
              aria-label={item.caption}
              href={`#${item.id}`}
            >
              <Icon
                className={`${classes.navigationButtonIcon}`}
              >
                {item.icon || 'navigation'}
              </Icon>
            </Button>
          </li>
        </Tooltip>
      </Grid>
    );
  });
};

const NavigationBar = (props) => {
  const { classes, items } = props;
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
      <Grid container direction="column" className={`${classes.navigationBar} navigation-bar`}>
        {renderNavigationItems(items, classes)}
      </Grid>
    </Slide>
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
