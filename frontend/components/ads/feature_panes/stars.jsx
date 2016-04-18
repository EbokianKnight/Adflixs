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

  render: function() {
    var one, two, three, four, five;
    if (this.state.rate === 0) {
      if (this.props.ad.average) {
        one = this.props.ad.average > 0 ? " review-star" : "";
        two = this.props.ad.average > 1 ? " review-star" : "";
        three = this.props.ad.average > 2 ? " review-star" : "";
        four = this.props.ad.average > 3 ? " review-star" : "";
        five = this.props.ad.average > 4 ? " review-star" : "";
      }
    } else {
      one = this.state.rate > 0 ? " gold" : "";
      two = this.state.rate > 1 ? " gold" : "";
      three = this.state.rate > 2 ? " gold" : "";
      four = this.state.rate > 3 ? " gold" : "";
      five = this.state.rate > 4 ? " gold" : "";
    }
    return (
      <ul className="rating-features" onMouseLeave={this.setStarsFromStore}>
        <div className={"rate" + one} name="1"
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
        <div className={"rate" + two} name="2"
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
        <div className={"rate" + three} name="3"
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
        <div className={"rate" + four} name="4"
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
        <div className={"rate" + five} name="5"
          onMouseEnter={this.makeGold} onClick={this.rate}>&#x2605;</div>
      </ul>
    );
  }

});

module.exports = RateStars;
