var React = require('react');

module.exports = function generateSlice(label, d1, d2, alpha, delta, color) {
  var p1 = { x: d1 * cos(alpha), y: d1 * sin(alpha) },
      p2 = { x: d1 * cos(alpha + delta), y: d1 * sin(alpha + delta) },
      p3 = { x: d2 * cos(alpha + delta), y: d2 * sin(alpha + delta) },
      p4 = { x: d2 * cos(alpha), y: d2 * sin(alpha) };

  var sweep = delta - alpha < pi ? SMALLARC : LARGEARC;
  var path = [
    'M', p1.x, p1.y,
    'A', d1, d1, 0, sweep, CLOCKWISE, p2.x, p2.y,
    'L', p3.x, p3.y,
    'A', d2, d2, 0, sweep, ANTICLOCKWISE, p4.x, p4.y,
    'z'
  ].join(' ');

  var mouseover = function(evt) {
    var p = evt.target;
    p.setAttribute("data-old-fill", p.getAttribute("fill"));
    p.setAttribute("fill","red");
  };

  var mouseout = function(evt) {
    var p = evt.target;
    p.setAttribute("fill",p.getAttribute("data-old-fill"));
  }

  var textContent = label;
  if (label.match(/\s/)) {
    var tspan = function(t,p) {
      return <tspan x={0} dy={ (1*p) + "em"}>{t}</tspan>;
    };
    textContent = label.split(/\s+/).map(tspan);
  }

  var b = p.getBBox();
  var transform = "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")";

  var snip = (
    <g>
      <path d={path} fill={color || "rgba(0,0,0,"+random()+")"} onMouseOver={mouseover} onMouseOut={mouseout}>
        <text transform={transform} fontFamily={"verdana"} textAnchor={"middle"} fontSize={40}>{textContent}</text>
      </p>
    </g>
  );
};
