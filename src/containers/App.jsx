import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ScrollUpButton from '../atoms/components/ScrollUpButton';
import NavigationBar from '../atoms/components/NavigationBar';

import '../atoms/theme/index.scss';

import navigationItems from '../data/navigationItems.json';

const styles = theme => ({
  mainContainer: {
    backgroundColor: 'black',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showScrollUpButton: false,
    };
    this.classes = props.classes;

    this.setScrollUpButtonEventListener = this.setScrollUpButtonEventListener.bind(this);
    this.scrollUpButtonEventListenerHandler = this.scrollUpButtonEventListenerHandler.bind(this);
    this.disableScrollUpButtonEventListener = this.disableScrollUpButtonEventListener.bind(this);
  }

  componentDidMount() {
    this.setScrollUpButtonEventListener();
  }

  componentWillUnmount() {
    this.disableScrollUpButtonEventListener();
  }

  /**
   * @method
   */
  setScrollUpButtonEventListener() {
    if (!window) {
      return false;
    }
    document.addEventListener('scroll', this.scrollUpButtonEventListenerHandler);
    return true;
  }

  /**
   * @method
   */
  scrollUpButtonEventListenerHandler(event) {
    if (window.scrollY > 0) {
      this.showScrollUpButton();
    } else {
      this.hideScrollUpButton();
    }
  }

  disableScrollUpButtonEventListener() {
    if (!window) {
      return false;
    }
    document.removeEventListener('scroll', this.scrollUpButtonEventListenerHandler);
    return true;
  }

  /**
   * @method
   */
  showScrollUpButton() {
    this.setState({
      showScrollUpButton: true,
    });
  }

  /**
   * @method
   */
  hideScrollUpButton() {
    this.setState({
      showScrollUpButton: false,
    });
  }

  render() {
    const { showScrollUpButton } = this.state;

    return (
      <div className={this.classes.mainContainer}>
        <Grid container className="header" justify="flex-end">
          <Grid item xs={12} sm={6}>
            <div className="content">
              <h1>Header</h1>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mainContent">
          <Grid item xs={12} className="aboutMe">
            <div className="content">
              <h2>About Me</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="experience">
            <div className="content">
              <h2>Experience</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="education">
            <div className="content">
              <h2>Education</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="skillsLanguages">
            <div className="content">
              <h2>Skills & Languages</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="projects">
            <div className="content">
              <h2>Projects</h2>
            </div>
          </Grid>
        </Grid>
        <Grid container className="footer">
          <Grid container item xs={12} className="contactMe">
            <Grid item xs={12} sm={6} className="content contactForm">
              <h2>Contact Me</h2>
            </Grid>
            <Grid item xs={12} sm={6} className="content socialNetworks">
              <h2>Social Networks</h2>
            </Grid>
          </Grid>
          <Grid container item xs={12} className="bottom" justify="center">
            <Grid item xs={6} className="content">
              <h2>Footer</h2>
            </Grid>
          </Grid>
        </Grid>
        <ScrollUpButton show={showScrollUpButton} />
        <NavigationBar items={navigationItems} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
};
App.defaultProps = {
  classes: {},
};

export default withStyles(styles)(App);
