var React = require('react');
var BBox = require('./bbox');

var SMALLARC = 0,
    LARGEARC = 1,
    CLOCKWISE = 1,
    ANTICLOCKWISE = 0,
    sin = Math.sin,
    cos = Math.cos,
    pi = Math.PI,
    tau = 2*pi,
    random = Math.random,
    sqrt = Math.sqrt;

module.exports = {

  pi: pi,
  tau: tau,

  getSegmentInformation: function(options) {
    var total = options.total,
        s = options.start,
        e = options.end,
        r1 = options.r1,
        r2 = options.r2,
        angleDelta = (e-s)/total,
        angleOffset = options.spacing/r2,
        id = options.id,
        a1 = s + angleDelta * id,
        a2 = a1 + angleDelta - angleOffset,
        center = {x:0, y:0, r: r2, a: 0},
        nx = 0,
        ny = 0,
        points = false;

    if (r1) {
      var ca1 = cos(a1),
          sa1 = sin(a1),
          ca2 = cos(a2),
          sa2 = sin(a2),
          cr = center.r = (r1+r2)/2,
          ca = center.a = (a1+a2)/2,
          dx = center.x = cr * cos(ca),
          dy = center.y = cr * sin(ca),
          m = sqrt(dx*dx+dy*dy);

      nx = dx/m;
      ny = dy/m;

      points = [
        { x: r1 * ca1, y: r1 * sa1, r: r1, a: a1 },
        { x: r1 * ca2, y: r1 * sa2, r: r1, a: a2 },
        { x: r2 * ca2, y: r2 * sa2, r: r2, a: a2 },
        { x: r2 * ca1, y: r2 * sa1, r: r2, a: a1 }
      ];
    }

    var offset = {
      x: nx * 2 * options.spacing,
      y: ny * 2 * options.spacing
    };

    return {
      points: points,
      startAngle: a1,
      angleDelta: angleDelta,
      angleOffset: angleOffset,
      center: center,
      offset: offset,
      bbox: (new BBox()).grow(points)
    };
  },

  getSVGPath: function(pts, options, reactProps) {
    var drawProps = {
      strokeWidth: (options.strokeWidth || 1)
    };

    if (pts === false) {
      var circleProps = Object.assign({}, drawProps, { r: options.r2 });
      return <circle className="base segment" {...circleProps}/>;
    }

    var p1 = pts[0],
        p2 = pts[1],
        p3 = pts[2],
        p4 = pts[3],
        r1 = options.r1,
        r2 = options.r2,
        angleDelta = options.angleDelta,
        sweep = angleDelta < pi ? SMALLARC : LARGEARC,
        d = [
          'M', p1.x, p1.y,
          'A', r1, r1, 0, sweep, CLOCKWISE, p2.x, p2.y,
          'L', p3.x, p3.y,
          'A', r2, r2, 0, sweep, ANTICLOCKWISE, p4.x, p4.y,
          'z'
        ].join(' '),
        pathProps = Object.assign({}, drawProps, reactProps, { d:d }),
        className = [
          "segment",
          options.leaf ? "leaf" : '',
          options.underlay ? "underlay" : '',
          options.label,
          "depth-" + options.depth
        ].join(' ');

    return <path className={className} {...pathProps} />;
  },

  getSVGLabel: function(options, center) {
    if (options.leaf) return null;

    center = center || {x:0, y:0};

    var label = options.label,
        content = <tspan {...center}>{label}</tspan>,
        radius = options.r2 - options.r1,
        fontSize = options.r1? radius/6 : radius/4;

    // multi-line label?
    if (label.indexOf(' ') !== -1) {
      var terms = label.split(/\s+/g),
          llen = terms.length,
          initialBaseline = -(fontSize * llen)/2 + fontSize,
          x = center.x,
          y = center.y + initialBaseline;
      content = terms.map( (word,i) => <tspan x={x} y={y + i*fontSize} key={word}>{word}</tspan> );
    }

    var props = {
      textAnchor: "middle",
      fontSize: fontSize,
      fontFamily: "Verdana",
      style: { pointerEvents: "none" }
    };

    return <text {...props}>{ content }</text>;
  }
};
