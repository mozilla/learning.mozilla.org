var React = require('react');
var ReactDOM = require('react-dom');

var ProgressBar = function(props) {
  var cr = {
    width: Math.min(100, props.value) + '%'
  };
  return <div className="progressBar" style={{textAlign: 'center'}}>
    <div className="outer"><div className="inner" style={cr}/></div> {props.value}%
  </div>;
};

module.exports = ProgressBar;
