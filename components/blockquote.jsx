var React = require('react');

var Blockquote = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    imgSrc: React.PropTypes.string.isRequired,
    imgAlt: React.PropTypes.string.isRequired,
    quote: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <blockquote className={this.props.className}>
        <figure>
          <img src={this.props.imgSrc} alt={this.props.imgAlt} width="148" />
        </figure>
        {this.props.quote}
        <small>{this.props.author}</small>
      </blockquote>
    );
  }
});

module.exports = Blockquote;
