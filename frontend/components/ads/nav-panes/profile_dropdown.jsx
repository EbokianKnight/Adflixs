var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../../stores/session_store');
var ReactCSS = require('react-addons-css-transition-group');

var ProfileDropDown = React.createClass({

  getInitialState: function() {
    return {
      show: false
    };
  }, //onMouseEnter

  onRollOver: function () {
    this.setState({ show: true });
  },

  rollBack: function () {
    this.setState({ show: false });
  },

  createRollOverMenu: function () {
    if (this.state.show) {
      return (
        <div className="nav-profile-dropdown" onMouseLeave={this.rollBack} key="1">
          <spacer className="sixty-pix">
            <div className="nav-white-arrow"/>
          </spacer>
          <div className="nav-white-bar"/>
          <spacer className="nav-menu-fill">

          </spacer>
        </div>
      );
    } else {
      return '';
    }
  },

  render: function() {
    return (
      <menu className="nav-profile-menu group"
        onMouseEnter={this.onRollOver}>
        <img className='nav-profile-thumb'/>
        <h3 className='nav-user'>Username</h3>
        <ReactCSS
          transitionName="fader"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          { this.createRollOverMenu() }
        </ReactCSS>
      </menu>
    );
  }

});

module.exports = ProfileDropDown;
