var React = require('react');

var optimizelyActive = process.env.OPTIMIZELY_ACTIVE === 'yes';
var optimizelyID = process.env.OPTIMIZELY_ID || '206878104';
var optimizelyURL = 'https://cdn.optimizely.com/js/' + optimizelyID + '.js';

var Optimizely = React.createClass({
  render: function() {
    return optimizelyActive ? <script src={optimizelyURL} /> : false;
  }
});

module.exports = Optimizely;
