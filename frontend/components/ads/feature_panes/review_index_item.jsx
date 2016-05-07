var React = require('react');
var PropTypes = React.PropTypes;

var ReviewItem = React.createClass({

  render: function() {
    var stars = this.props.view.rate;
    var one = stars > 0 ? "review-star" : "";
    var two = stars > 1 ? "review-star" : "";
    var three = stars > 2 ? "review-star" : "";
    var four = stars > 3 ? "review-star" : "";
    var five = stars > 4 ? "review-star" : "";
    var title = this.props.view.title || "Review";
    var review;
    if (!this.props.modal && this.props.view.review.length > 120) {
      review = this.props.view.review.slice(0,120) + "...";
    } else {
      review = this.props.view.review;
    }
    var klass = this.props.modal ? "modal-ad-fix " : "";
    return (
      <article className={klass + "ad-review-flex-article"}>
        <div className="review-flex-header">
          <h3 className="review-h3">{title}</h3>
          <div className={one}>&#x2605;</div>
          <div className={two}>&#x2605;</div>
          <div className={three}>&#x2605;</div>
          <div className={four}>&#x2605;</div>
          <div className={five}>&#x2605;</div></div>
        <p>{ review }</p>
      </article>
    );
  }

});

module.exports = ReviewItem;
