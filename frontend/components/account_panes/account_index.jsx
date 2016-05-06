var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../ads/nav_bar');
var AdSubmission = require('./ad_submission');
var SessionStore = require('../../stores/session_store');
var FlashStore = require('../../stores/flash_store');
var UserUtil = require('../../util/user_util');

var AccountIndex = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      show: "",
      password: "",
      confirmation: "",
      email: "",
      flash: false,
      message: "",
      success: false,
      delete: false,
      user: SessionStore.currentUser()
    };
  },

  componentDidMount: function() {
    document.body.style.backgroundColor = "#f3f3f3";
    this.sessionToken = SessionStore.addListener(this.getUserFromStore)
    this.errorToken = FlashStore.addListener(this.respondToErrors)
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
    this.errorToken.remove();
    window.clearTimeout(this.passwordTimer);
    window.clearTimeout(this.emailTimer);
    window.clearTimeout(this.deleteTimer);
  },

  getUserFromStore: function() {
    this.setState({
      user: SessionStore.currentUser(),
      success: true,
    });
  },

  respondToErrors: function () {
    var email = this.state.show === "email";
    var pass = this.state.show === "password";
    if (FlashStore.hasError() && (email || pass || this.state.delete)) {
      this.setState({ flash: true, message: FlashStore.flashMessage() });
    }
  },

  editEmail: function (e) {
    $(e.target).blur();
    if (this.state.show === "password" || !this.state.delete) {
      if (this.passwordTimer || this.emailTimer || this.deleteTimer){
        return;
      }
      this.closeDetail();
      this.emailTimer = window.setTimeout(function(){
        this.setState({ show: "email" });
        this.emailTimer = window.setTimeout(function(){
          this.emailTimer = null;
        }.bind(this),500);
      }.bind(this),700);
    } else {
      this.setState({
        show: "email",
        password: "",
        confirmation: "",
        email: "",
        flash: false,
        message: "",
        delete: false,
        success: false
      });
    }
  },

  editPassword: function (e) {
    $(e.target).blur();
    if (this.state.show === "email" || !this.state.delete) {
      if (this.passwordTimer || this.emailTimer || this.deleteTimer){
        return;
      }
      this.closeDetail();
      this.passwordTimer = window.setTimeout(function(){
        this.setState({ show: "password" });
        this.passwordTimer = window.setTimeout(function(){
          this.passwordTimer = null;
        }.bind(this),500);
      }.bind(this),700);
    } else {
      this.setState({
        show: "password",
        password: "",
        confirmation: "",
        email: "",
        flash: false,
        message: "",
        delete: false,
        success: false
      });
    }
  },

  closeDetail: function () {
    this.setState({
      show: "",
      password: "",
      confirmation: "",
      email: "",
      flash: false,
      message: "",
      delete: false,
      success: false
    });
  },

  updatePassword: function (e) {
    this.setState({ success: false, password: e.target.value });
<<<<<<< HEAD
    if (this.flash && this.state.password === this.state.confirmation &&  this.state.password.length > 6) {
=======
    if (this.flash && this.state.password === this.state.confirmation &&  this.state.password.length >= 6) {
>>>>>>> issue00
      this.setState({ flash: false, message: ""});
    }
  },

  updateConfirm: function (e) {
    if (this.state.flash && this.state.show === "password") {
      if (this.state.password === this.state.confirmation) {
        this.setState({
          confirmation: e.target.value,
          flash: false,
          success: false,
          message: ""
        });
      } else {
        this.setState({ confirmation: e.target.value, success: false });
      }
    } else if (this.state.flash && this.state.show === "email") {
      if (this.state.email === this.state.confirmation) {
        this.setState({
          confirmation: e.target.value,
          flash: false,
          success: false,
          message: ""
        });
      } else {
        this.setState({ confirmation: e.target.value, success: false });
      }
    } else {
      this.setState({
        confirmation: e.target.value,
        flash: false,
        success: false,
        message: ""
      });
    }
  },

  updateEmail: function (e) {
    this.setState({ success: false, email: e.target.value });
    if (this.flash && this.state.email === this.state.confirmation) {
      this.setState({ flash: false, message: ""});
    }
  },

  deleteUserAccount: function () {
    if (!this.state.delete) return;

    console.log(this.state.user.email === "Guest")
    if (this.state.user.email === "Guest") {
      this.setState({ flash: true, message: "You cannot modify the Guest Account."});
    } else {
      UserUtil.destroyUser(SessionStore.currentUser().id, this.redirectCallback);
    }
  },

  redirectCallback: function () {
    this.context.router.push("/");
  },

  deleteUser: function (e) {
    $(e.target).blur();
    if (this.state.show === "email" || this.state.show === "password") {
      if (this.passwordTimer || this.emailTimer || this.deleteTimer){
        return;
      }
      this.closeDetail();
      this.deleteTimer = window.setTimeout(function(){
        this.setState({ delete: true });
        this.deleteTimer = window.setTimeout(function(){
          this.deleteTimer = null;
        }.bind(this),500);
      }.bind(this),700);
    } else {
      this.setState({
        show: "",
        password: "",
        confirmation: "",
        email: "",
        flash: false,
        message: "",
        delete: true,
      });
    }
  },

  sendPasswordChange: function (e) {
    e.preventDefault();
    $(e.target).blur();

    if (this.state.user.email === "Guest") {
      return this.setState({ flash: true, message: "You cannot modify the Guest Account."});
    }
    if (this.state.password === this.state.confirmation && !this.state.flash && this.state.password.length >= 6) {
      UserUtil.updateUser(
        this.state.user.id,
        { password: this.state.password }
      );
    } else if (this.state.password.length < 6) {
      this.setState({ flash: true, message: "Your password must be at least 6 characters."});
    } else if (this.state.password !== this.state.confirm) {
      this.setState({ flash: true, message: "Your new password and confirmation must match."});
    }
  },

  sendEmailChange: function (e) {
    e.preventDefault();
    $(e.target).blur();

    var regex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.state.user.email === "Guest") {
      return this.setState({ flash: true, message: "You cannot modify the Guest Account."});
    }

    if (this.state.confirmation === this.state.email && !this.state.flash) {
      UserUtil.updateUser(
        this.state.user.id,
        { email: this.state.email }
      );
    } else if (!regex.test(this.state.email)) {
      this.setState({ flash: true, message: "Your new email must be valid."});
    } else if (this.state.email !== this.state.confirm) {
      this.setState({ flash: true, message: "Your new email and confirmation must match."});
    }
    console.log(this.state.password);
    console.log(this.state.confirmation);
  },

  renderPasswordDetail: function () {
    var klass = this.state.show === "password" ? "" : " acc-hide";
    var flash = this.state.flash ? "" : " acc-hide";
    var success = this.state.success ? "" : " acc-hide";
    return (
      <div className={"account-pane" + klass}>
        <aside className="account-sidebar">
          <h2>Edit Password</h2>
          <button className="acc-btn"
            onClick={this.closeDetail}>
            Cancel
          </button>
          <button className="acc-btn"
            onClick={this.sendPasswordChange}>
            Update Password
          </button>
        </aside>
        <section className="account-section">
          <div className="account-section-row">
            <label><strong>New Password</strong>
              <input onChange={this.updatePassword} type="password"
                value={this.state.password} />
            </label>
          </div>
          <div className="account-section-row">
            <label><strong>Confirm Password</strong>
              <input onChange={this.updateConfirm} type="password"
                value={this.state.confirmation}/>
            </label>
          </div>
          <div className={"account-section-row " + flash}>
            <div className="acc-message-box acc-failure">
              <div className="acc-x"/>
              <p>{this.state.message}</p>
            </div>
          </div>
          <div className={"account-section-row " + success}>
            <div className="acc-message-box acc-success">
              <div className="acc-check"/>
              <p>YOUR PASSWORD HAS BEEN SUCCESSFULLY UPDATED</p>
            </div>
          </div>
        </section>
        <div className="account-spacer"/>
      </div>
    );
  },

  renderEmailDetail: function () {
    var klass = this.state.show === "email" ? "" : " acc-hide";
    var flash = this.state.flash ? "" : " acc-hide";
    var success = this.state.success ? "" : " acc-hide";
    return (
      <div className={"account-pane" + klass}>
        <aside className="account-sidebar">
          <h2>Edit Email</h2>
          <button className="acc-btn"
            onClick={this.closeDetail}>
            Cancel
          </button>
          <button className="acc-btn"
            onClick={this.sendEmailChange}>
            Update Email
          </button>
        </aside>
        <section className="account-section">
          <div className="account-section-row">
            <label><strong>New Email</strong>
              <input onChange={this.updateEmail} type="text"
                value={this.state.email}/>
            </label>
          </div>
          <div className="account-section-row">
            <label><strong>Confirm Email</strong>
              <input onChange={this.updateConfirm} type="text"
                value={this.state.confirmation}/>
            </label>
          </div>
          <div className={"account-section-row " + flash}>
            <div className="acc-message-box acc-failure">
              <div className="acc-x"/>
              <p>{this.state.message}</p>
            </div>
          </div>
          <div className={"account-section-row " + success}>
            <div className="acc-message-box acc-success">
              <div className="acc-check"/>
              <p>YOUR EMAIL HAS BEEN SUCCESSFULLY UPDATED</p>
            </div>
          </div>
        </section>
        <div className="account-spacer"/>
      </div>
    );
  },

  renderConfirmDelete: function () {
    var klass = this.state.delete ? "" : " acc-hide";
    var flash = this.state.flash ? "" : " acc-hide";
    return (
      <div className={"account-pane" + klass}>
      <aside className="account-sidebar"/>
      <section className="account-section">
        <div className="account-section-row">
          <strong>Are You Sure?</strong>
            <div className="acc-message-box acc-success acc-cursor"
              onClick={this.closeDetail}>
              <div className="acc-check"/>
              <p>CANCEL STOP NOOOOO!</p>
            </div>
            <div className="acc-message-box acc-failure acc-cursor"
              onClick={this.deleteUserAccount}>
              <div className="acc-x"/>
              <p>YES VERY IM SURE.</p>
            </div>
        </div>
        <div className={"account-section-row " + flash}>
          <div className="acc-message-box acc-failure">
            <div className="acc-x"/>
            <p>{this.state.message}</p>
          </div>
        </div>
      </section>
      </div>
    );
  },

  renderMembership: function () {
    return (
      <container>
        <div className="account-pane">
          <aside className="account-sidebar">
            <h2>Membership Details</h2>
            <button className="acc-btn"
              onClick={this.deleteUser}>Delete Membership</button>
          </aside>
          <section className="account-section">
            <div className="account-section-row">
              <strong>Your Email: {this.state.user.email}</strong>
              <button className="acc-btn"
                onClick={this.editEmail}>Change Email</button>
            </div>
            <div className="account-section-row">
              <strong>Password: ********</strong>
              <button className="acc-btn"
                onClick={this.editPassword}>Change Password</button>
            </div>
          </section>
        </div>
        { this.renderConfirmDelete() }
        { this.renderEmailDetail() }
        { this.renderPasswordDetail() }
      </container>
    );
  },

  render: function() {
    return (
      <div>
        <div className='black-nav'><NavBar /></div>
        <div className='account-main'>
          <h1>My Account</h1>
          { this.renderMembership() }
          <AdSubmission/>
        </div>
      </div>
    );
  }

});

module.exports = AccountIndex;
