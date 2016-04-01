var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../../stores/session_store');
var ReactCSS = require('react-addons-css-transition-group');
var UserUtil = require('../../../util/user_util');

var ProfileDropDown = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

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

  goToLogout: function (e) {
    UserUtil.logout(this.redirectToHome);
  },

  redirectToHome: function () {
    this.context.router.push("/")
  },

  goToAccount: function (e) {
    console.log("We Link to the Account Pages!");
  },

  createRollOverMenu: function () {
    if (this.state.show) {
      return (
        <div className="nav-profile-dropdown"
          onMouseLeave={this.rollBack} key="1">
          <spacer className="sixty-pix">
            <div className="nav-white-arrow"/>
          </spacer>
          <div className="nav-white-bar"/>
          <spacer className="nav-menu-fill group">
            <button className="nav-profile-item"
              onClick={this.goToAccount}>Your Account</button>
            <button className="nav-profile-item"
              onClick={this.goToLogout}>Logout of Adflix</button>
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
