var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Illustration = React.createClass({
  render: function() {
    return (
      <div className="row illustration">
        <div className="image-container col-sm-4 col-md-4 col-lg-4">
          <ImageTag className="image" src1x={this.props.src1x} src2x={this.props.src2x}
            alt={this.props.alt}/>
        </div>
        <div className="content-container col-sm-8 col-md-8 col-lg-8">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Illustration;
