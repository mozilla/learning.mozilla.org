var _ = require('underscore');
var React = require('react');

exports.install = function() {
  var _createElement = React.createElement;

  React.createElement = function(type, props) {
    if (type === 'form') {
      return _createElement.apply(this, [
        'form',
        _.extend(props || {}, {'noValidate': true})
      ].concat([].slice.call(arguments, 2)));
    }
    return _createElement.apply(this, arguments);
  };
};
