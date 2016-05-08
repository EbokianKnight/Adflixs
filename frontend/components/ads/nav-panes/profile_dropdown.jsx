var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../../stores/session_store');
var ReactCSS = require('react-addons-css-transition-group');
var UserUtil = require('../../../util/user_util');

var ProfileDropDown = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      show: false,
      user: SessionStore.currentUser()
    };
  }, //onMouseEnter

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.getUserFromStore)
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  getUserFromStore: function() {
    this.setState({ user: SessionStore.currentUser() });
  },

  onRollOver: function () {
    this.setState({ show: true });
  },

  rollBack: function () {
    this.setState({ show: false });
  },

  logOut: function (e) {
    UserUtil.logout(this.redirectToHome);
  },

  redirectToHome: function () {
    this.context.router.push("/")
  },

  goToAccount: function (e) {
    this.context.router.push("/account")
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
              onClick={this.logOut}>Logout of Adflix</button>
          </spacer>
        </div>
      );
    } else {
      return '';
    }
  },

  render: function() {
    return (
      <menu className="nav-profile-menu group">

      </menu>
    );
  }

});
// <img className='nav-profile-thumb'/>
// <h3 className='nav-user'>{this.state.user.email}</h3>
// <ReactCSS
//   transitionName="fader"
//   transitionEnterTimeout={500}
//   transitionLeaveTimeout={300}>
//   { this.createRollOverMenu() }
// </ReactCSS>
module.exports = ProfileDropDown;
