var React = require('react');
var PropTypes = React.PropTypes;
var UserUtil = require('../../util/user_util');

var NewUser = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: "",
      confirmation: "",
      flashMessage: false
    };
  },

  setEmail: function (e) {
    this.setState({ email: e.target.value });
  },

  setPassword: function (e) {
    this.setState({ password: e.target.value });
  },

  setConfirmation: function (e) {
    this.setState({ confirmation: e.target.value });
  },

  makeUser: function (e) {
    e.preventDefault();
    if (this.state.confirmation !== this.state.password) {
      this.setState({ flashMessage: true });
      return;
    } else {
      this.setState({ flashMessage: false });
    }
    UserUtil.makeUser({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    });
  },

  createFlashedMessage: function () {
    if (this.state.flashMessage) {
      return (
        <div className="flash-message">Password confirmation does not match.</div>
      );
    } else {
      return "";
    }
  },

  createNewUserForm: function () {
    return (
      <form  className="sign-in-pane" onSubmit={this.makeUser}>
        <h1>Register New User</h1>

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

        <label>Confirmation
        <input className="sign-in-input" type="password" name="confirmation"
          onChange={this.setConfirmation}
          value={this.state.confirmation}/>
        </label>
        <br/><br/>

        { this.createFlashedMessage() }
        <button className="sign-in-button">SignUp</button>
      </form>
    );
  },

  render: function() {
    return (
      <div>
        { this.createNewUserForm() }
      </div>
    );
  }

});

module.exports = NewUser;
