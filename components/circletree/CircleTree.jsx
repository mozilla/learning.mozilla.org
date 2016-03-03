var React = require('react');
var CircleSegment = require('./CircleSegment.jsx');
var BBox = require('./bbox');
var differ = require('./differ');

var defaultProps = {
  data: {},
  radius: 80,
  spacing: 3,
  strokeWidth: 1,
  leafRadius: 7,
  leafSpacing: 2
};

var CircleTree = React.createClass({
  getDefaultProps: function() {
    return defaultProps;
  },

  getInitialState: function() {
    return {
      data: this.props.data,
      label: Object.keys(this.props.data)[0],
      bbox: (new BBox()).grow({x: 0, y: 0})
    };
  },

  componentWillMount: function() {
    this.buildContent();
  },

  componentDidUpdate: function(props, state) {
    if(differ(props, this.props, defaultProps)) {
      this.buildContent();
    }
  },

  updateBBox: function(bbox) {
    this.setState({ bbox: this.state.bbox.expand(bbox) });
  },

  buildContent: function() {
    this.setState(Object.assign({
      segments: this.formSegments()
    }));
  },

  formSegments: function() {
    var label = this.state.label,
        data = this.props.data[label],
        props = Object.assign({}, this.props, {
          r2: this.props.radius,
          label: label,
          data: data,
          updateBBox: this.updateBBox
        });
    return <CircleSegment {...props}/>;
  },

  render: function() {
    var style = { overflow: "visible" };
    var bbox = this.state.bbox;
    var viewBox = [bbox.x, bbox.y, bbox.w, bbox.h].join(' ');
    return (
      <svg className="circletree" style={style} width="auto" height="auto" viewBox={viewBox}>
      { this.state.segments }
      </svg>
    );
  }
});

module.exports = CircleTree;
