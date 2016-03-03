var React = require('react');
var computer = require('./segment-computer.jsx');
var differ = require('./differ');

var defaultProps = {
  // inner and outer radius, and segment padding
  r1: 0,
  r2: 1,
  spacing: 1,
  strokeWidth: 1,
  // start and end angle
  start: 0,
  end: computer.tau,
  // total number of segments, and id of this segment
  depth: 0,
  id: 0,
  total: 1,
  // leaf settings
  leafRadius: 7,
  leafSpacing: 2
};

var CircleSegment = React.createClass({
  getDefaultProps() {
    return defaultProps;
  },

  getInitialState() {
    return computer.getSegmentInformation(this.props);
  },

  buildContent() {
    this.setState(Object.assign({
      label: this.getLabel(),
      children: this.props.leaf? null : this.setupChildren(),
      underlay: (this.props.depth !== 1) ? null : this.getUnderlay()
    }, this.getInitialState()));
  },

  componentWillMount() {
    this.highlights = {
      highlight: this.highlight,
      restore: this.restore,
      toggle: this.toggle,
      color: this.props.color
    };

    this.buildContent();
  },

  componentDidUpdate: function(props, state) {
    if(differ(props, this.props, defaultProps)) {
      this.buildContent();
    }
  },

  componentDidMount() {
    this.props.updateBBox(this.state.bbox);
  },

  updateBBox(bbox) {
    this.setState({ bbox: this.state.bbox.expand(bbox) }, () => {
      this.props.updateBBox(this.state.bbox);
    });
  },

  getLabel() {
    return computer.getSVGLabel(this.props, this.state.center);
  },

  setupChildren() {
    var data = this.props.data;

    // Leaf nodes are encoded as array
    if(data.map) return this.formLeaves();

    // real nodes are encoded as "more CircleSegments"
    var nr1 = this.props.r2 + this.props.spacing,
        nr2 = nr1 + (this.props.r2 - this.props.r1),
        keys = Object.keys(data),
        total = keys.length,
        props = Object.assign({}, this.props, {
          total: total,
          r1: nr1,
          r2: nr2,
          start: this.state.startAngle,
          end: this.state.startAngle + this.state.angleDelta,
          depth: this.props.depth + 1,
          updateBBox: this.updateBBox,
          fontSize: 14
        });

    // generate the set of child segments
    return keys.map( (label, position) => {
      var childProps = Object.assign({}, props, this.highlights, {
        label: label,
        id: position,
        data: data[label]
      });
      return <CircleSegment {...childProps} key={label}/>;
    });
  },

  formLeaves() {
    var baseProps = {
      leaf: true,
      start: this.state.startAngle,
      updateBBox: this.updateBBox
    };

    return this.props.data.map( (type, pos) => {
      var radius = this.props.r2,
          leafRadius = this.props.leafRadius,
          leafSpacing = this.props.leafSpacing,
          spacing = this.props.spacing,
          r1 = radius + spacing + pos * (leafSpacing + leafRadius),
          r2 = r1 + leafRadius,

          leafProps = Object.assign({}, baseProps, this.highlights, {
            r1: r1,
            r2: r2,
            end: this.state.startAngle + this.state.angleDelta - this.state.angleOffset,
            stroke: this.props.color.stroke(type),
            label: type
          });

      return <CircleSegment {...leafProps} key={type}/>;
    });
  },

  getPath() {
    return computer.getSVGPath(this.state.points, Object.assign({}, this.props, {
      angleDelta: this.state.angleDelta
    }),{
      onMouseEnter: this.highlight,
      onMouseLeave: this.restore,
      onClick: this.toggle
    });
  },

  highlight() {
    var path = this.refs.path;
    path.classList.add("highlight");
    if (this.props.highlight) { this.props.highlight(); }
  },

  restore() {
    var path = this.refs.path;
    path.classList.remove("highlight");
    if (this.props.restore) { this.props.restore(); }
  },

  toggle() {
    console.log(this.props.label);
    if (this.props.toggle) { this.props.toggle(); }
  },

  getUnderlay() {
    var p = this.state.points.slice(),
        p1 = p[0], p2 = p[1], p3 = p[2], p4 = p[3],
        dx, dy,
        // TODO: FIXME: this number needs to be based on the actual max depth of this slice
        magicNumber = 4;

    dx = p3.x - p2.x;
    dy = p3.y - p2.y;
    p[2] = { x: p2.x + magicNumber*dx, y: p2.y + magicNumber*dy};

    dx = p4.x - p1.x,
    dy = p4.y - p1.y,
    p[3] = { x: p1.x + magicNumber*dx, y: p1.y + magicNumber*dy};

    return computer.getSVGPath(p, Object.assign({}, this.props, {
      underlay: true,
      angleDelta: this.state.angleDelta
    }), {
      onMouseEnter: this.slideOut
    });
  },

  slideBack() {
    this.setState({ isOffset: false });
  },

  slideOut() {
    if (this.props.depth===1) {
      this.setState({ isOffset: true });
    }
  },

  render() {
    var path = this.getPath();
    var offset = null; //this.state.isOffset ? "translate(" + [this.state.offset.x, this.state.offset.y].join(',') + ")" : null;
    return (
      <g transform={offset} onMouseEnter={this.slideOut} onMouseLeave={this.slideBack}>
        { this.state.underlay }
        { React.cloneElement(path, {ref: "path"}) }
        { this.state.label }
        { this.state.children }
      </g>
    );
  }
});

module.exports = CircleSegment;
