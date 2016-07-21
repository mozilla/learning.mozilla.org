var React = require('react');
var Link = require('react-router').Link;
var ImageTag = require('./imagetag.jsx');

var NotFoundMessage = function(props) {
  return (
    <div className="not-found">
      <ImageTag width={500}
                height='auto'
                src1x='/img/pages/not-found/book_singlepageflip.gif'
                alt='' />
      <h2>Hey, this 404 is a teachable moment!</h2>
      <p>Did you know that a 404 is the generic error code used across the internet to mean "page not found"? It might mean the page used to exist, but doesn't anymore. Or that someone made a typo somewhere. Regardless, there's no page at this address.</p>
      <Link to={"/" + this.context.intl.locale + "/"} className="btn">Go To Home Page</Link>
    </div>
  );
};

module.exports = NotFoundMessage;
