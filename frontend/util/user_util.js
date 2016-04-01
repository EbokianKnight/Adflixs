var UserActions = require('./../actions/user_actions');

module.exports = {
  fetchUsers: function () {
    $.ajax({
			method: "GET",
      url: "/api/ads",
      success: function (users) {
        AdActions.recieveAllUsers(users);
      },
			error: function (err) {
				console.log("ApiUtil#fetchUsers Error");
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
        console.log("ApiUtil#makeUser Error");
      }
    });
  },
  signIn: function (credentials, redirectCallback) {
    $.ajax({
			method: "POST",
      url: "/api/session",
      daat: { credentials: credentials },
      success: function (userJson) {
        UserActions.currentUserRecieved(userJson);
        redirectCallback();
      },
			error: function (err) {
				console.log("ApiUtil#logIn Error");
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
				console.log("ApiUtil#fetchGenres Error");
			}
    });
	}
};
