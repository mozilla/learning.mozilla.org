var React = require('react');

var VerticalLeader = function(props) {
  var height = props.height || "1em";
  var style = {
    height: height
  };
  return (
    <div className="vertical-leader" style={style}><span className="bulb"/></div>
  );
};

module.exports = VerticalLeader;
