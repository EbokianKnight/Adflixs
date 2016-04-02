var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../ads/nav_bar');
var AdSubmission = require('./ad_submission');
var SessionStore = require('../../stores/session_store');
var UserUtil = require('../../util/user_util');

var AccountIndex = React.createClass({

  componentDidMount: function() {
    this.user = SessionStore.currentUser()
    if (!this.user) {
      UserUtil.fetchCurrentUser()
      this.user = SessionStore.currentUser()
    };
    debugger;
  },

  renderMembership: function () {
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>Membership Details</strong>
          <button className="account-aside-button">Cancel Membership</button>
        </section>
        <section className="account-section-row group">
          <strong className="account-item-left">Your Email: myself@me.com</strong>
          <a href="#" className="account-item-right">Change Email</a>
        </section>
        <section className="account-section-row group">
          <strong className="account-item-left">Your Password: ******</strong>
          <a href="#" className="account-item-right">Change Password</a>
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
          { this.renderPlanDetails() }
          { this.renderMyProfile() }
        <AdSubmission />
        </content>
        <div className='black-nav'><NavBar /></div>
        { this.renderFooter() }
      </div>
    );
  }

});

module.exports = AccountIndex;
