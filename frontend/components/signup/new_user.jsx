var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');

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
    ApiUtil.makeUser({
      email: e.target.email.value(),
      password: e.target.password.value()
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
      <form onSubmit={this.makeUser}>
        <label for="email"/>Email
        <input id="email" type="text" name="email"
          onChange={this.setEmail}
          value={this.state.email}/><br/><br/>
        <label for="password"/>Password
        <input id="password" type="text" name="password"
          onChange={this.setPassword}
          value={this.state.password}/><br/><br/>
        <label for="confirmation"/>Confirmation
        <input id="confirmation" type="text" name="confirmation"
          onChange={this.setConfirmation}
          value={this.state.confirmation}/><br/><br/>
        { this.createFlashedMessage() }
        <button value="Signup" />
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
