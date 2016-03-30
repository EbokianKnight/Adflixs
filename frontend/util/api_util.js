var ApiActions = require('../actions/ad_actions.js');

module.exports = {
  fetchAdverts: function () {
    $.ajax({
			method: "GET",
      url: "api/ads",
      success: function (adverts) {
        ApiActions.recieveAllAdverts(adverts);
      }
    });
  }
};
