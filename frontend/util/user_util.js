var UserActions = require('./../actions/user_actions');

module.exports = {
  fetchCurrentUser: function (completion) {
    $.ajax({
			method: "GET",
      url: "/api/session/",
      success: function (user) {
        UserActions.receiveCurrentUser(user);
      },
      complete: function () {
        if (completion) { completion(); }
      },
			error: function (err) {
				console.log("UserUtil#fetchCurrentUser Error");
			}
    });
  },
  makeUser: function (user, redirectCallback) {
    $.ajax({
			method: "POST",
      url: "/api/users",
      data: { user: user },
      success: function (userJson) {
        UserActions.registerNewUser(userJson);
        if (redirectCallback) { redirectCallback(); }
      },
			error: function (err) {
        console.log('UserUtil#makeUser Error');
			}
    });
  },
  updateUser: function (user, id, callback) {
    $.ajax({
			method: "PATCH",
      url: "/api/users" + id,
      data: { user: user },
      success: function (user) {
        UserActions.receiveCurrentUser(user, callback);
      },
			error: function (err) {
        console.log('UserUtil#createUser Error');
			}
    });
  },
  removeUser: function (userID, redirectCallback) {
    $.ajax({
      method: "POST",
      url: "/api/users" + user.id,
      success: function () {
        UserActions.removeUser(userID);
        if (redirectCallback) { redirectCallback(); }
      },
      error: function (err) {
        console.log("UserUtil#removeUser Error");
      }
    });
  },
  signIn: function (credentials, redirectCallback) {
    $.ajax({
			method: "POST",
      url: "/api/session",
      data: { user: credentials },
      success: function (user) {
        UserActions.receiveCurrentUser(user, redirectCallback);
      },
			error: function (err) {
				console.log("UserUtil#signIn Error");
        UserActions.flashMessage(err.responseJSON.message);
			}
    });
  },
	logout: function (redirectCallback) {
		$.ajax({
			method: "DELETE",
      url: "api/session",
      success: function () {
        UserActions.logout(redirectCallback);
      },
			error: function (err) {
				console.log("UserUtil#logout Error");
			}
    });
	}
};
