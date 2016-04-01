var React = require('react');
var PropTypes = React.PropTypes;
var UserUtil = require('../../util/user_util');

var NewSession = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      email: "",
      password: "",
    };
  },

  setEmail: function (e) {
    this.setState({ email: e.target.value });
  },

  setPassword: function (e) {
    this.setState({ password: e.target.value });
  },

  signIn: function (e) {
    e.preventDefault();
    UserUtil.signIn({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }, this.redirectCallback );
  },

  redirectCallback: function () {
    this.context.router.push("/ads");
  },

  createNewSessionForm: function () {
    return (
      <form  className="sign-in-pane" onSubmit={this.makeUser}>
        <h1>Sign In</h1>

        <label>Email
        <input className="sign-in-input" type="text" name="email"
          onChange={this.setEmail}
          value={this.state.email}/>
        </label>
        <br/><br/>

        <label>Password
        <input className="sign-in-input" type="password" name="password"
          onChange={this.setPassword}
          value={this.state.password}/>
        </label>
        <br/><br/>

        <button className="sign-in-button">Sign In</button>
      </form>
    );
  },

  render: function() {
    return (
      <div>
        { this.createNewSessionForm() }
      </div>
    );
  }

});

module.exports = NewUser;
