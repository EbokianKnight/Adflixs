var React = require('react');
var PropTypes = React.PropTypes;
var NavBar = require('../ads/nav_bar');
var AdSubmission = require('./ad_submission');
var SessionStore = require('../../stores/session_store');
var UserUtil = require('../../util/user_util');

var AccountIndex = React.createClass({

  getInitialState: function() {
    return {
      show: "",
      user: "",
      password: "",
      confirmation: "",
      email: "",
      user: SessionStore.currentUser()
    };
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

  updatePassword: function (e) {
    this.setState({ password: e.target.value })
  },

  updateConfirm: function (e) {
    this.setState({ confirmation: e.target.value })
  },

  updateEmail: function (e) {
    this.setState({ email: e.target.value })
  },

  newAdvert: function () {
    this.setState({ show: "advert" });
  },

  closeDetail: function (e) {
    e.preventDefault();
    this.setState({ show: "", confirm: "", password: "", email: "" });
  },

  showAdvertForm: function () {
    if (this.state.show === "advert") {
      return <AdSubmission close={this.close}/>;
    }
    return "";
  },

  sendPasswordChange: function (e) {
    e.preventDefault();
    if (this.state.password === this.state.confirm) {
      UserUtil.updateUser(SessionStore.currentUser.id,
        { password: this.state.password }, this.close )
    } else {
      this.flash = "Your password must match the confirmation";
    }
  },

  // flashMessage: function () {
  //   if (this.flash) {
  //     var message = this.flash
  //     this.flash = null
  //     return <div className="flash-message">{message}</div>
  //   }
  // },
  //
  sendEmailChange: function (e) {
    e.preventDefault();
    if (this.state.email === this.state.confirm) {
      UserUtil.updateUser(SessionStore.currentUser.id,
        { email: this.state.email }, this.close )
    } else {
      this.flash = "Your email must match the confirmation";
    }
  },
  //
  // showPasswordEdit: function () {
  //   if (this.state.show === "password") {
  //     return (
  //       <div className="account-pane group">
  //         <section className="account-section-heading">
  //           <strong>Edit Password</strong>
  //           <button onClick={this.close} className="account-aside-button">
  //             Cancel</button>
  //         </section>
  //         <form ref="PasswordRequest">
  //           <row className="account-section-row group">
  //             <label className="account-item-left group">
  //               <div className="form-row">New Password</div>
  //               <input
  //                 onChange={this.updatePassword}
  //                 className="account-section-input"
  //                 type="password"/>
  //             </label>
  //             <input onClick={this.sendPasswordChange} value="Update Password"
  //               className="account-aside-button account-item-right"/>
  //           </row>
  //           <row className="account-section-row group">
  //             <label className="account-item-left group">
  //               <div className="form-row">Password Confirmation</div>
  //               <input
  //                 onChange={this.updateConfirm}
  //                 className="account-section-input"
  //                 type="password"/>
  //             </label>
  //           </row>
  //         </form>
  //       </div>
  //     );
  //   }
  //   return "";
  // },
  //
  // showSuccessMessage: function () {
  //   if (this.state.show === "success") {
  //     return (
  //       <div className="account-pane group">
  //         <section className="account-section-heading">
  //           <button onClick={this.close} className="account-aside-button">
  //             Okay</button>
  //         </section>
  //         <div className="account-submission-success">Success</div>
  //       </div>
  //     );
  //   }
  // },

  renderPasswordDetail: function () {
    var klass = this.state.show === "password" ? "" : "";
    return (
      <div className={"account-pane" + klass}>
        <aside className="account-sidebar">
          <h2>Edit Password</h2>
          <button className="acc-btn"
            onClick={this.closeDetail}>
            Cancel
          </button>
          <button className="acc-btn"
            onClick={this.changePassword}>
            Update Password
          </button>
        </aside>
        <section className="account-section">
          <div className="account-section-row">
            <label><strong>New Password</strong>
              <input onChange={this.updatePassword} type="text" />
            </label>
          </div>
          <div className="account-section-row">
            <label><strong>Confirm Password</strong>
              <input onChange={this.updateConfirm} type="text" />
            </label>
          </div>
        </section>
        <div className="account-spacer"/>
      </div>
    );
  },

  renderEmailDetail: function () {
    var klass = this.state.show === "email" ? "" : "";
    return (
      <div className={"account-pane" + klass}>
        <aside className="account-sidebar">
          <h2>Edit Email</h2>
          <button className="acc-btn"
            onClick={this.closeDetail}>
            Cancel
          </button>
          <button className="acc-btn"
            onClick={this.changeEmail}>
            Update Email
          </button>
        </aside>
        <section className="account-section">
          <div className="account-section-row">
            <label><strong>New Email</strong>
              <input onChange={this.updateEmail} type="text" />
            </label>
          </div>
          <div className="account-section-row">
            <label><strong>Confirm Email</strong>
              <input onChange={this.updateConfirm} type="text" />
            </label>
          </div>
        </section>
        <div className="account-spacer"/>
      </div>
    );
  },

  renderMembership: function () {
    return (
      <container>
        <div className="account-pane">
          <aside className="account-sidebar">
            <h2>Membership Details</h2>
            <button className="acc-btn">Delete Membership</button>
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
          <AdSubmission close={this.closeDetail}/>
        </div>
      </div>
    );
  }

});

module.exports = AccountIndex;
