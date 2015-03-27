var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Illustration = React.createClass({
  render: function() {
    return (
      <div className="row illustration">
        <div className="image-container col-sm-3 col-md-3 col-lg-3">
          <a href={this.props.link}>
            <ImageTag className="image" src1x={this.props.src1x} src2x={this.props.src2x}
            alt={this.props.alt}/>
          </a>
        </div>
        <div className="content-container col-sm-9 col-md-9 col-lg-9">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Illustration;
