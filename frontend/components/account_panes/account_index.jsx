var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../ads/nav_bar');
var AdSubmission = require('./ad_submission');
var SessionStore = require('../../stores/session_store');
var UserUtil = require('../../util/user_util');

var AccountIndex = React.createClass({

  getInitialState: function() {
    return { show: "", user: "" };
  },

  componentDidMount: function() {
    document.body.style.backgroundColor = "#f3f3f3";
    this.sessionToken = SessionStore.addListener(this.getUserFromStore)
    this.flash = null;
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  getUserFromStore: function() {
    this.setState({ user: SessionStore.currentUser() });
  },

  editEmail: function () {
    this.setState({ show: "email" });
  },

  editPassword: function () {
    this.setState({ show: "password" });
  },

  newAdvert: function () {
    this.setState({ show: "advert" });
  },

  close: function (command) {
    command = command || ""
    this.setState({ show: command });
  },

  showAdvertForm: function () {
    if (this.state.show === "advert") {
      return <AdSubmission close={this.close}/>;
    }
    return "";
  },

  sendPasswordChange: function (e) {
    e.preventDefault();
    if (e.currentTarget.oldpassword.value !== e.currentTarget.passconfirm.value ) {
      this.flash = "password confirmation does not match"
      return;
    }
    UserUtil.updateUser(SessionStore.currentUser.id,
      {
        password: e.currentTarget.password.value,
        oldpassword: e.currentTarget.oldpassword.value,
        email: this.state.user.email
      },
      this.close)
  },

  flashMessage: function () {
    if (this.flash) {
      var message = this.flash
      this.flash = null
      return <div className="flash-message">{message}</div>
    }
  },

  sendEmailChange: function (e) {
    e.preventDefault();
    UserUtil.updateUser(SessionStore.currentUser.id,
      $(this.refs.EmailRequest).serialize(),
      this.close
    )
  },

  showPasswordEdit: function () {
    if (this.state.show === "password") {
      return (
        <div className="account-pane group">
          <section className="account-section-heading">
            <strong>Edit Password</strong>
            <button onClick={this.close} className="account-aside-button">
              Cancel</button>
          </section>
          <form ref="PasswordRequest">
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">Old Password</div>
                <input className="account-section-input" type="password"
                  name="oldpassword"/>
              </label>
              <input type="submit" value="Update Password"
                className="account-aside-button account-item-right"/>
            </row>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">New Password</div>
                <input className="account-section-input" type="password"
                  name="newpassword"/>
              </label>
            </row>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">Password Confirmation</div>
                <input className="account-section-input" type="password"
                  name="passconfirm"/>
              </label>
            </row>
          </form>
        </div>
      );
    }
    return "";
  },

  showSuccessMessage: function () {
    if (this.state.show === "success") {
      return (
        <div className="account-pane group">
          <section className="account-section-heading">
            <button onClick={this.close} className="account-aside-button">
              Okay</button>
          </section>
          <div className="account-submission-success">Success</div>
        </div>
      );
    }
  },

  showEmailEdit: function () {
    if (this.state.show === "email") {
      return (
        <div className="account-pane group">
          <section className="account-section-heading">
            <strong>Edit Email</strong>
            <button onClick={this.close} className="account-aside-button">
              Cancel</button>
          </section>
          <form>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">Password</div>
                <input className="account-section-input" type="password"
                  name="user[password]"/>
              </label>
              <input type="submit" value="Update Email"
                className="account-aside-button account-item-right"/>
            </row>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">New Email</div>
                <input className="account-section-input" type="password"
                  name="user[email]"/>
              </label>
            </row>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">Email Confirmation</div>
                <input className="account-section-input" type="password"
                  name="emailconfirm"/>
              </label>
            </row>
          </form>
        </div>
      );
    }
    return "";
  },


  renderMembership: function () {
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>Membership Details</strong>
          <button className="account-aside-button">Cancel Membership</button>
        </section>
        <section className="account-section-row group">
          <strong className="account-item-left">Your Email: {this.state.user.email}</strong>
          <button onClick={this.editEmail} className="account-item-right">
            Change Email</button>
        </section>
        <section className="account-section-row group">
          <p className="account-item-left">Your Password: ******</p>
          <button onClick={this.editPassword} className="account-item-right">
            Change Password</button>
        </section>
        <section className="account-section-row group">
          <p className="account-item-left">Admin Commands</p>
          <button onClick={this.newAdvert} className="account-item-right">
            Add New Advert</button>
        </section>
      </div>
    );
  },

  renderPlanDetails: function () {
    return (
      <div>
      </div>
    );
  },

  renderMyProfile: function () {
    return (
      <div>
      </div>
    );
  },

  renderFooter: function () {
    return (
      <footer className="account-main account-footer">
      </footer>
    );
  },

  render: function() {
    return (
      <div>
        <spacer className="account-spacer"></spacer>
        <content className='account-main'>
          <h1>My Account</h1>
          { this.renderMembership() }
            { this.showEmailEdit() }
            { this.showPasswordEdit() }
            { this.showAdvertForm() }
            { this.showSuccessMessage() }
          { this.renderPlanDetails() }
          { this.renderMyProfile() }
        </content>
        <div className='black-nav'><NavBar /></div>
        { this.renderFooter() }
      </div>
    );
  }

});

module.exports = AccountIndex;
