var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../ads/nav_bar');
var AdSubmission = require('./ad_submission');
var SessionStore = require('../../stores/session_store');
var UserUtil = require('../../util/user_util');

var AccountIndex = React.createClass({

  getInitialState: function() {
    return { show: "" };
  },

  editEmail: function () {
    this.setState({ show: "email" });
  },

  editPassword: function () {
    this.setState({ show: "password" });
  },

  close: function () {
    this.setState({ show: "" });
  },

  sendPasswordChange: function (e) {
    e.preventDefault
  },

  sendEmailChange: function (e) {
    e.preventDefault
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
          <form onClick={this.sendPasswordChange}>
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

  showEmailEdit: function () {
    if (this.state.show === "email") {
      return (
        <div className="account-pane group">
          <section className="account-section-heading">
            <strong>Edit Email</strong>
            <button onClick={this.close} className="account-aside-button">
              Cancel</button>
          </section>
          <form onClick={this.sendEmailChange}>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">Old Password</div>
                <input className="account-section-input" type="password"
                  name="password"/>
              </label>
              <input type="submit" value="Update Email"
                className="account-aside-button account-item-right"/>
            </row>
            <row className="account-section-row group">
              <label className="account-item-left group">
                <div className="form-row">New Email</div>
                <input className="account-section-input" type="password"
                  name="email"/>
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
    var user = SessionStore.currentUser()
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>Membership Details</strong>
          <button className="account-aside-button">Cancel Membership</button>
        </section>
        <section className="account-section-row group">
          <strong className="account-item-left">Your Email: {user.email}</strong>
          <button onClick={this.editEmail} className="account-item-right">
            Change Email</button>
        </section>
        <section className="account-section-row group">
          <p className="account-item-left">Your Password: ******</p>
          <button onClick={this.editPassword} className="account-item-right">
            Change Password</button>
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
          { this.renderPlanDetails() }
          { this.renderMyProfile() }
        <AdSubmission close={this.close}/>
        </content>
        <div className='black-nav'><NavBar /></div>
        { this.renderFooter() }
      </div>
    );
  }

});

module.exports = AccountIndex;
