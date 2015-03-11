var React = require('react');

module.exports = React.createClass({
  calculateDensity: function () {
    var
        window = window || false,
        ratio;

    if (window && window.devicePixelRatio < 1.5) {
      ratio = 1;
    } else {
      ratio = 2;
    }

    return ratio;
  },

  getInitialState: function () {
    return {
      pixelDensity: this.calculateDensity()
    };
  },

  handleMediaChange: function () {
    this.setState({
      pixelDensity: this.calculateDensity()
    });
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleMediaChange);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleMediaChange);
  },

  propTypes: {
    alt: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    className: React.PropTypes.string
  },

  render: function () {
    return (
        <img src={this.props['src' + this.state.pixelDensity + 'x'] || this.props.src1x} alt={this.props.alt}
            width={this.props.width} height={this.props.height} className={this.props.className}/>
    );
  }
});
