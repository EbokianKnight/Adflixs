var React = require('react');
var PropTypes = React.PropTypes;
var GenreStore = require('../../../stores/genre_store');
var AdvertRow = require('./../ad_index_row.jsx');
var MoreLikeThisDetail = React.createClass({

  /// ??_??
  createRow: function () {
    if (this.props.header) { return ""; }
    var getRow = GenreStore.find(this.props.ad.genres[0].id);
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
