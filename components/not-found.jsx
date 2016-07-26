var React = require('react');
var Link = require('react-router').Link;
var ImageTag = require('./imagetag.jsx');

var NotFoundMessage = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="not-found">
        <ImageTag width={500}
                  height='auto'
                  src1x='/img/pages/not-found/book_singlepageflip.gif'
                  alt='' />
        <h2>{this.context.intl.formatMessage({id: '404_header'})}</h2>
        <p>{this.context.intl.formatMessage({id: '404_message'})}</p>
        <Link to={"/" + this.context.intl.locale + "/"} className="btn">{this.context.intl.formatMessage({id: 'go_to_homepage'})}</Link>
      </div>
    );
  }
});

module.exports = NotFoundMessage;
