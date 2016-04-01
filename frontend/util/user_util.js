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
				console.log("ApiUtil#fetchAllUsers Error");
			}
    });
  },
	fetchCurrentUser: function (id) {
    $.ajax({
			method: "GET",
      url: "/api/ads/" + id,
      success: function (user) {
        AdActions.recieveUser(user);
      },
			error: function (err) {
				console.log("ApiUtil#fetchUser Error");
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
        redirectCallback();
      },
			error: function (err) {
				console.log("ApiUtil#makeUser Error");
			}
    });
  },
  removeUser: function (userID, redirectCallback) {
    $.ajax({
      method: "POST",
      url: "/api/users" + user.id,
      success: function () {
        UserActions.removeUser(userID);
        redirectCallback();
      },
      error: function (err) {
        console.log("ApiUtil#removeUser Error");
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
        redirectCallback();
      },
			error: function (err) {
				console.log("ApiUtil#signIn Error");
			}
    });
  },
	logout: function (redirectCallback) {
		$.ajax({
			method: "DELETE",
      url: "api/session",
      success: function () {
        UserActions.logout();
        redirectCallback();
      },
			error: function (err) {
				console.log("ApiUtil#logout Error");
			}
    });
	}
};
