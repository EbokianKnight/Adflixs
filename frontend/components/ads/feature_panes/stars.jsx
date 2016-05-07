var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../../stores/session_store');
var ApiUtil = require('../../../util/api_util');


var RateStars = React.createClass({

  getInitialState: function() {
    return {
      rate: SessionStore.fetchView(this.props.ad.id).rate || 0
    };
  },

  componentDidMount: function() {
    this.sessionToken = SessionStore.addListener(this.setStarsFromStore);
  },

  componentWillUnmount: function() {
    this.sessionToken.remove();
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({ rate: SessionStore.fetchView(nextProps.ad.id).rate });
  },

  setStarsFromStore: function () {
    var view = SessionStore.fetchView(this.props.ad.id);
    var stars = 0;
    if (view) { stars = view.rate; }
    this.setState({ rate: stars });
  },

  rate: function (e) {
    e.stopPropagation();
    var adID = this.props.ad.id;
    var userID = SessionStore.currentUser().id;
    var view = SessionStore.fetchView(this.props.ad.id);
    if (view) {
      ApiUtil.updateView(view.id, { rate: this.state.rate });
    } else {
      ApiUtil.createView({
        user_id: userID,
        ad_id: adID,
        rate: this.state.rate
      });
    }
  },

  makeGold: function (e) {
    var gold = parseInt($(e.currentTarget).attr("name"));
    this.setState({ rate: gold });
  },


  renderStars: function () {
    var rating, klass;
    if (this.state.rate === 0 || !this.state.rate) {
      rating = this.props.ad.average;
      klass = " review-star";
    } else {
      rating = this.state.rate;
      klass = " gold";
    }
    return ["1","2","3","4","5"].map(function(num, idx){
      color = rating > idx ? klass : "";
      return (
        <div className={"rate" + color} name={num} key={idx}
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
      );
    }.bind(this));
  },


  render: function() {
    return (
      <ul className="rating-features" onMouseLeave={this.setStarsFromStore}>
        { this.renderStars() }
      </ul>
    );
  }


});

module.exports = RateStars;
