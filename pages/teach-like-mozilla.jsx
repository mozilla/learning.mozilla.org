var React = require('react');

var HeroUnit = require('../components/hero-unit.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

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
        <div className="inner-container">
          <section>
            <h2>Our Values</h2>
            <p className="sub-title">
              We are a community of educators, learners, mentors and teachers.
            </p>
            <div className="list-with-illust">
              <Illustration
              width={242} height={175}
              src1x="/img/teach-like-mozilla-page/icon-teach-like-mozilla.svg"
              alt="icon teach like mozilla">
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
                    locally-relevant environment.
                  </li>
                </ul>
              </Illustration>
            </div>
          </section>
          <section>
            <IconLinks>
              <IconLink
                href="http://mzl.la/TTWpodcasts"
                imgSrc="/img/teach-like-mozilla-page/icon-listen.svg"
                imgAlt="icon listen"
                head="Listen"
                subhead="Subscribe to our podcast"
              />
              <IconLink
                linkTo="web-literacy"
                imgSrc="/img/teach-like-mozilla-page/icon-learn.jpg"
                imgSrc2x="/img/teach-like-mozilla-page/icon-learn@2x.jpg"
                imgAlt="icon attend"
                head="Learn"
                subhead="See our Web Literacy Map"
              />
              <IconLink
                href="http://discourse.webmaker.org/category/meet"
                imgSrc="/img/teach-like-mozilla-page/icon-connect.svg"
                imgAlt="icon connect"
                head="Say Hello"
                subhead="Meet the teach community"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = TeachLikeMozillaPage;
