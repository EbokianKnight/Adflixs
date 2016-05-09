var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../../stores/session_store');
var UserUtil = require('../../../util/user_util');

var ProfileDropDown = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      user: SessionStore.currentUser(),
      hover: false,
    };
  },

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.getUserFromStore)
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  getUserFromStore: function() {
    this.setState({ user: SessionStore.currentUser() });
  },

  mouseOn: function () {
    this.setState({ hover:true });
  },

  mouseOff: function () {
    this.setState({ hover:false });
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

  renderMenuDropdown: function () {
    var hover = this.state.hover ? "" : " acc-hide"
    return (
      <menu className="nav-profile-dropdown"
        onMouseEnter={this.mouseOn}
        onMouseLeave={this.mouseOff}>
        <ul className={"nav-dropdown-list" + hover}>
          <li className="nav-dropdown-items"
            onClick={this.goToAccount}>
            Your Account
          </li>
          <li className="nav-dropdown-items"
            onClick={this.logOut}>
            Logout of Adflix
          </li>
        </ul>
      </menu>
    );
  },

  render: function() {
    var email = this.state.user ? this.state.user.email : "Email"
    return (
      <container className="nav-profile">
        { this.renderMenuDropdown() }
        <img className='nav-profile-thumb'/>
        <h3 className='nav-email'>
          { email }
        </h3>
      </container>
    );
  }

});

module.exports = ProfileDropDown;
