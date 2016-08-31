var React = require('react');
var ImageTag = require('../../components/imagetag.jsx');

var LogoAsset = React.createClass({
  getInitialState: function() {
    return { hasKeyboardFocus: false };
  },
  handleFocus: function() {
    this.setState({ hasKeyboardFocus: true });
  },
  handleBlur: function() {
    this.setState({ hasKeyboardFocus: false });
  },
  render: function() {
    var classes = "logo-asset-hover";

    if (this.state.hasKeyboardFocus) { classes += " has-keyboard-focus"; }
    return (
      <div className="logo-asset-container col-sm-4 col-md-4 col-lg-3">
        <div className="logo-asset-header">
          {this.props.head}
        </div>
        <ImageTag className="logo-asset-img"
          width={200} height={200}
          src1x={this.props.src1x} src2x={this.props.src2x}
          alt={this.props.alt}/>
        <div className={classes} onFocus={this.handleFocus} onBlur={this.handleBlur}>
          <div className="logo-asset-center">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LogoAsset;
