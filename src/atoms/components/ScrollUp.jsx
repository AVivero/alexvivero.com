
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const scrollUp = (event) => {
  if (!window) {
    return false;
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  return true;
};

const styles = theme => ({
  scrollUp: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

const ScrollUp = (props) => {
  const { classes, show } = props;
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Tooltip title="Scroll Up" className={`${classes.scrollUp} secondaryButton`} onClick={scrollUp}>
        <Button variant="fab" aria-label="Scroll Up">
          <ExpandLess />
        </Button>
      </Tooltip>
    </Slide>
  );
};

ScrollUp.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool,
};
ScrollUp.defaultProps = {
  classes: {},
  show: true,
};

export default withStyles(styles)(ScrollUp);
