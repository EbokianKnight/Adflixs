var React = require('react');
var Slider = require('react-slick');

var SimpleSlider = React.createClass({
	generate: function (iter) {
		var divs = [];
		for (var i = 0; i < iter; i++) {
			divs.push(<div className="fliximg slider-test"><h3 key={i}>{i}</h3></div>);
		}
		return divs;
	},
  render: function () {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
			arrows: true,
			useCSS: true,
			variableWidth: false,
			responsive: [
				{ breakpoint: 210, settings: { slidesToShow: 1, slidesToScroll: 1 } },
				{ breakpoint: 420, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 630, settings: { slidesToShow: 3, slidesToScroll: 3 } },
				{ breakpoint: 840, settings: { slidesToShow: 4, slidesToScroll: 4 } },
				{ breakpoint: 1050, settings: { slidesToShow: 5, slidesToScroll: 5 } },
				{ breakpoint: 1260, settings: { slidesToShow: 6, slidesToScroll: 6 } },
				{ breakpoint: 1470, settings: { slidesToShow: 7, slidesToScroll: 7 } },
				{ breakpoint: 1680, settings: { slidesToShow: 8, slidesToScroll: 8 } },
				{ breakpoint: 1890, settings: { slidesToShow: 9, slidesToScroll: 9 } },
				{ breakpoint: 100000, settings: 'unslick' }
			]
    };
    return (
			<div className="row-bar">
      <Slider {...settings}>
        { this.generate(50) }
      </Slider>
		</div>
    );
  }
});

module.exports = SimpleSlider;
