var React = require('react');
var PropTypes = React.PropTypes;
var GenreStore = require('../../../stores/genre_store');
var AdvertRow;
AdvertRow = require('./../ad_index_row');

var MoreLikeThisDetail = React.createClass({

  /// Advert Row will not render. I will need to build another component
  /// for this. Since I'm redoing the slider, I'll hold off for now.
  createRow: function () {
    var getRow;
    getRow = GenreStore.find(this.props.ad.genres[0].id);
    return (
      <AdvertRow genre={getRow}/>
    );
  },

  render: function() {
    return (
      <div>
      </div>
    );
  }

});

module.exports = MoreLikeThisDetail;
