var React = require('react');

var HeroUnit = require('./hero-unit.jsx');
var IconLink = require('./icon-link.jsx');

var IconLinks = React.createClass({
  ICON_LINKS: [
    {
      linkTo: "fixme",
      imgSrc: "/img/teach-like-mozilla-page/icon-listen.svg",
      imgAlt: "icon listen",
      head: "Listen",
      subhead: "Subscribe to our Podcast"
    },
    {
      linkTo: "fixme",
      imgSrc: "/img/teach-like-mozilla-page/icon-attend.svg",
      imgAlt: "icon attend",
      head: "Attend",
      subhead: "Join the next Meetup"
    },
    {
      linkTo: "fixme",
      imgSrc: "/img/teach-like-mozilla-page/icon-connect.svg",
      imgAlt: "icon connect",
      head: "Say Hello",
      subhead: "Meet the teach community"
    }
  ],
  render: function() {
    // need to have `key`,
    // see: http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    var iconlinks = this.ICON_LINKS.map(function(link,i) {
      return (
        <div className="col-sm-4 col-md-4 col-lg-4 icon-link-container" key={i}>
          <IconLink info={link} />
        </div>
      );
    });
    return (
      <div className="row icon-links">{iconlinks}</div>
    );
  }
});

var TeachLikeMozillaPage = React.createClass({
  statics: {
    pageClassName: 'teach-like-mozilla'
  },
  render: function() {
    return (
      <div>
        <HeroUnit
          image="/img/teach-like-mozilla-page/banner-teach-like-mozilla.jpg"
          image2x="/img/teach-like-mozilla-page/banner-teach-like-mozilla@2x.jpg">
          <h1>Teach Like Mozilla</h1>
          <h2>We learn best by making & reflecting, together.</h2>
        </HeroUnit>
        <section>
          <h2>Our Values</h2>
          <span className="sub-title">
            We are a community of educators, learners, mentors and teachers.
          </span>
          <div className="row list-with-illust">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <img
                src="/img/teach-like-mozilla-page/icon-teach-like-mozilla.svg"
                alt="icon teach like mozilla"
              />
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8">
              <ul>
                <li>
                  We teach web literacy, which encompasses the mechanics,
                  culture and citizenship of the web.
                </li>
                <li>
                  We are dedicated to empowering others so they have agency
                  on the web as creators and future leaders.
                </li>
                <li>
                  We teach and learn by making projects together and
                  openly reflecting on the process in an inclusive and
                  localle relevant environment.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <IconLinks/>
        </section>
      </div>
    );
  }
});

module.exports = TeachLikeMozillaPage;
