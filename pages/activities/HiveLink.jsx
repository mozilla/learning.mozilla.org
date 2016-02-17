var React = require('react');

var ImageTag = require('../../components/imagetag.jsx');

var HiveLink = React.createClass({
  render: function() {
    return (
      <div className="hive-link col-sm-4 col-md-4 col-lg-4">
        <a href={this.props.link}>
          <ImageTag className="image-tag"
            src1x={this.props.src1x}
            src2x={this.props.src2x}
            alt=""
          />
          <span>{this.props.name}</span>
        </a>
      </div>
    );
  }
});

module.exports = HiveLink;
