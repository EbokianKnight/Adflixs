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
  makeUser: function (user, callback) {
    $.ajax({
			method: "POST",
      url: "/api/users",
      data: { user: user },
      success: function (userJson) {
        UserActions.registerNewUser(userJson);
        //callback to redirect
      },
			error: function (err) {
				console.log("ApiUtil#makeUser Error");
			}
    });
  },
  removeUser: function (userID, callback) {
    $.ajax({
      method: "POST",
      url: "/api/users" + user.id,
      success: function () {
        UserActions.removeUser(userID);
        callback();
      },
      error: function (err) {
        console.log("ApiUtil#makeUser Error");
      }
    });
  },
  logIn: function (callback) {
    $.ajax({
			method: "POST",
      url: "/api/session",
      success: function (userJson) {
        //callback to redirect
      },
			error: function (err) {
				console.log("ApiUtil#logIn Error");
			}
    });
  },
	logout: function (callback) {
		$.ajax({
			method: "DELETE",
      url: "api/session",
      success: function () {
        callback();
      },
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
	}
};
