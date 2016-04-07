var React = require('react');
var PropTypes = React.PropTypes;
var UserUtil = require('../../util/user_util');
var SessionStore = require('../../stores/session_store');

var NewSession = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      email: "",
      password: "",
      message: null
    };
  },

  componentDidMount: function() {
    document.body.style.backgroundColor = "#f3f3f3";
    this.sessionToken = SessionStore.addListener(this.flashMessage);
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  flashMessage: function () {
    this.setState({ message: SessionStore.flashMessage() });
  },

  renderFlash: function () {
    if (!this.state.message) return "";
    return (
      <div className="flash-message">{ this.state.message }</div>
    );
  },

  setEmail: function (e) {
    this.setState({ email: e.target.value });
  },

  setPassword: function (e) {
    this.setState({ password: e.target.value });
  },

  signUpAsGuest: function () {
    UserUtil.signIn({
      email: "Guest",
      password: "password"
    }, this.redirectCallback );
  },

  signIn: function (e) {
    e.preventDefault();
    UserUtil.signIn({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    }, this.redirectCallback );
  },

  redirectCallback: function () {
    this.context.router.push("/main");
  },

  createNewSessionForm: function () {
    return (
      <div className="new-session-background">
        <form  className="sign-in-pane" onSubmit={this.signIn}>

          <h1>Sign In</h1>

          { this.renderFlash() }
          <label>Email
            <div className="sign-in-robot"/>
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
          <input type="submit" className="sign-in-button sign-in-adflix" value="Sign In"/>
          <svg className="sign-in-button sign-in-facebook"/>
          <svg className="sign-in-button sign-in-google"/>
          <input onClick={this.signUpAsGuest} readOnly value="Sign In As Guest"
            className="sign-in-button sign-in-adflix"/>
        </form>
      </div>
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

module.exports = NewSession;
