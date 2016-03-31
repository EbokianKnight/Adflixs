var React = require('react');
var Slider = require('react-slick');

var SimpleSlider = React.createClass({
	generate: function (iter) {
		var divs = [];
		for (var i = 0; i < iter; i++) {
			divs.push(<div><h3 className="fliximg slider-test" key={i}>{i}</h3></div>);
		}
		return divs;
	},
  render: function () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
			arrows: true,
      slidesToShow: 5,
      slidesToScroll: 5,
			useCSS: true,
			responsive: [
				{ breakpoint: 205, settings: { slidesToShow: 1, slidesToScroll: 1 } },
				{ breakpoint: 409, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 614, settings: { slidesToShow: 3, slidesToScroll: 3 } },
				{ breakpoint: 819, settings: { slidesToShow: 4, slidesToScroll: 4 } },
				{ breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 5 } },
				{ breakpoint: 1229, settings: { slidesToShow: 6, slidesToScroll: 6 } },
				{ breakpoint: 1434, settings: { slidesToShow: 7, slidesToScroll: 7 } },
				{ breakpoint: 1639, settings: { slidesToShow: 8, slidesToScroll: 8 } },
				{ breakpoint: 1844, settings: { slidesToShow: 9, slidesToScroll: 9 } },
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
