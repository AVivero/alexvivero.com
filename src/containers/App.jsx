import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { isBoolean } from 'util';

import ScrollUpButton from '../atoms/components/ScrollUpButton';
import NavigationBar from '../atoms/components/NavigationBar';

import '../atoms/theme/index.scss';

import navigationItemsData from '../data/navigationItems.json';

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
      navigationItems: navigationItemsData,
    };
    this.classes = props.classes;

    this.setOnScrollEventListeners = this.setOnScrollEventListeners.bind(this);
    this.unsetOnScrollEventListeners = this.unsetOnScrollEventListeners.bind(this);

    this.scrollUpButtonEventListenerHandler = this.scrollUpButtonEventListenerHandler.bind(this);
    this.updateActiveNavigationItem = this.updateActiveNavigationItem.bind(this);
    this.detectSectionInViewport = this.detectSectionInViewport.bind(this);
  }

  componentDidMount() {
    this.setOnScrollEventListeners();
  }

  componentWillUnmount() {
    this.unsetOnScrollEventListeners();
  }

  /**
   * @method
   */
  setOnScrollEventListeners() {
    if (!window) {
      return false;
    }
    return document.addEventListener('scroll', (event) => {
      this.scrollUpButtonEventListenerHandler(event);
      this.updateActiveNavigationItem(event);
    });
  }

  /**
   * @method
   */
  unsetOnScrollEventListeners() {
    if (!window) {
      return false;
    }
    return document.removeEventListener('scroll', (event) => {
      this.scrollUpButtonEventListenerHandler(event);
      this.updateActiveNavigationItem(event);
    });
  }

  /**
   * @method
   */
  scrollUpButtonEventListenerHandler(event) {
    if (!window) {
      return false;
    }
    return this.setState({
      showScrollUpButton: window.scrollY > 0,
    });
  }

  detectSectionInViewport(event) {
    if (!window) {
      return null;
    }
    const top = window.scrollY + window.screen.availHeight / 5;
    const { navigationItems } = this.state;
    const sectionInViewport = navigationItems.filter((item) => {
      const section = document.querySelector(`#${item.id}`);
      return top >= section.offsetTop && top <= section.offsetTop + section.clientHeight;
    })[0];
    return sectionInViewport;
  }

  updateActiveNavigationItem(event) {
    const sectionInViewport = this.detectSectionInViewport();
    if (typeof sectionInViewport === 'undefined') {
      return false;
    }
    const { navigationItems } = this.state;
    return this.setState({
      navigationItems: navigationItems.map((item) => {
        item.active = item.id === sectionInViewport.id;
        return item;
      }),
    });
  }

  render() {
    const { showScrollUpButton, navigationItems } = this.state;

    return (
      <div className={this.classes.mainContainer}>
        <Grid container className="header" justify="flex-end" id="header">
          <Grid item xs={12} sm={6}>
            <div className="content">
              <h1>Header</h1>
            </div>
          </Grid>
        </Grid>
        <Grid container className="mainContent">
          <Grid item xs={12} className="aboutMe" id="aboutMe">
            <div className="content">
              <h2>About Me</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="experience" id="experience">
            <div className="content">
              <h2>Experience</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="education" id="education">
            <div className="content">
              <h2>Education</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="skillsLanguages" id="skills">
            <div className="content">
              <h2>Skills & Languages</h2>
            </div>
          </Grid>
          <Grid item xs={12} className="projects" id="projects">
            <div className="content">
              <h2>Projects</h2>
            </div>
          </Grid>
        </Grid>
        <Grid container className="footer">
          <Grid container item xs={12} className="contactMe" id="contactMe">
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
