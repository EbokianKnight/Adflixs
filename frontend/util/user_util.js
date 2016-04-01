var UserActions = require('./../actions/user_actions');

module.exports = {
  fetchAllUsers: function () {
    $.ajax({
			method: "GET",
      url: "/api/ads",
      success: function (users) {
        AdActions.recieveAllUsers(users);
      },
			error: function (err) {
				console.log("UserUtil#fetchAllUsers Error");
			}
    });
  },
	fetchUser: function (id) {
    $.ajax({
			method: "GET",
      url: "/api/ads/" + id,
      success: function (user) {
        AdActions.recieveUser(user);
      },
			error: function (err) {
				console.log("UserUtil#fetchUser Error");
			}
    });
  },
  fetchCurrentUser: function (completion) {
    $.ajax({
			method: "GET",
      url: "/api/session/",
      success: function (user) {
        UserActions.recieveUser(user);
      },
      complete: function () {
        completion || completion();
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
        redirectCallback || redirectCallback();
      },
			error: function (err) {
				console.log("UserUtil#makeUser Error");
			}
    });
  },
  removeUser: function (userID, redirectCallback) {
    $.ajax({
      method: "POST",
      url: "/api/users" + user.id,
      success: function () {
        UserActions.removeUser(userID);
        redirectCallback || redirectCallback();
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
        UserActions.currentUserRecieved(user);
        redirectCallback || redirectCallback();
      },
			error: function (err) {
				console.log("UserUtil#signIn Error");
			}
    });
  },
	logout: function (redirectCallback) {
		$.ajax({
			method: "DELETE",
      url: "api/session",
      success: function () {
        UserActions.logout();
        redirectCallback || redirectCallback();
      },
			error: function (err) {
				console.log("UserUtil#logout Error");
			}
    });
	}
};
