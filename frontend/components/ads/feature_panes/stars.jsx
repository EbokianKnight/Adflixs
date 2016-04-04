var React = require('react');
var PropTypes = React.PropTypes;

var RateStars = React.createClass({

  getInitialState: function() {
    return {
      rate: 0
    };
  },

  rate: function (e) {
    console.log($(e.currentTarget).attr("name"));
  },

  makeGold: function (e) {
    var gold = parseInt($(e.currentTarget).attr("name"));
    this.setState({ rate: gold });
  },

  render: function() {
    var one = this.state.rate > 0 ? " gold" : "";
    var two = this.state.rate > 1 ? " gold" : "";
    var three = this.state.rate > 2 ? " gold" : "";
    var four = this.state.rate > 3 ? " gold" : "";
    var five = this.state.rate > 4 ? " gold" : "";
    return (
      <ul className="rating-features">
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
