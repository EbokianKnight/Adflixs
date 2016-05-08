var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var MyButton = require('./my_list/my_button');
var Stars = require('./feature_panes/stars');

var Advert = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	getInitialState: function() {
		return {
			details: false,
		};
	},

	componentWillUnmount: function() {
		this.mouseTime && clearTimeout(this.mouseTime);
	},

	// Update the Store with the last row that was clicked, as movies can exist
	// in multiple rows, Row is listening for changes.
	sendBackID: function (e) {
		e.preventDefault();
		ApiUtil.fetchAdvert(this.props.ad.id, this.props.rowID);
		$(".flix").removeClass("selected");
		var makeID = "#"+this.props.ad.id + "-" + this.props.rowID;
		var select = $(makeID)
		if (select.hasClass("img-effect")) {
			select.removeClass("img-effect");
		}
		select.addClass("selected");
	},

	mouseIn: function (e) {
		if(this.mouseInSwitch) return;
		if (!this.props.show) {
			$(e.target).addClass("img-effect");
		}
		this.mouseInSwitch = true;
		this.mouseTime = window.setTimeout(function(){
			this.setState({ details: true });
		}.bind(this), 300);
	},

	mouseOut: function (e) {
		if (!this.mouseInSwitch) return;
		$(e.target).removeClass("img-effect");
		this.mouseInSwitch = false;
		this.mouseTime && clearTimeout(this.mouseTime);
		this.setState({ details: false });
	},

	playAd: function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.context.router.push({
			pathname: "/streaming",
			query: {
        title: this.props.ad.title,
			 	youtube: this.props.ad.youtube
      }
		});
	},

	render: function() {
		var klass = this.state.details && !this.props.show ? "" : " acc-hide";
		return (
			<div id={this.props.ad.id + "-" + this.props.rowID} className="flix"
				onClick={this.sendBackID}
				onMouseEnter={this.mouseIn}
				onMouseLeave={this.mouseOut}
				style={{backgroundImage:"url(" + this.props.ad.thumbUrl + ")"}}>
				<container className={"advert-detail" + klass}>
					<section className="advert-play">
						<div className="advert-play-img"
							onClick={this.playAd}/>
					</section>
					<section className="advert-modal">
						<strong className="advert-modal-header">
							{ this.props.ad.title }
						</strong>
						<div className="advert-modal-details">
							<Stars ad={this.props.ad}/>
							<p>{ this.props.ad.year }</p>
						</div>
						<div className="advert-modal-desc">
							<p>{ this.props.ad.description.substring(0,107) }...</p>
							<div><MyButton small={true} ad={this.props.ad}/></div>
						</div>
						<div className="advert-show-detail-btn"
							onClick={this.sendBackID}/>
					</section>
				</container>
			</div>
		);
	}

});

module.exports = Advert;
