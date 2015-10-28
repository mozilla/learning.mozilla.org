var React = require('react');

var HeroUnit = require('../components/hero-unit.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var TeachLikeMozillaPage = React.createClass({
  statics: {
    pageTitle: 'Teach Like Mozilla',
    pageClassName: 'teach-like-mozilla'
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
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
              src1x="/img/pages/teach-like-mozilla/svg/icon-teach-like-mozilla.svg"
              alt="icon teach like mozilla">
                <ul className="colored-list">
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
                imgSrc="/img/pages/teach-like-mozilla/svg/icon-listen.svg"
                head="Listen"
                subhead="Subscribe to our podcast"
              />
              <IconLink
                linkTo="web-literacy"
                imgSrc="/img/pages/teach-like-mozilla/svg/icon-learn.svg"
                head="Understand"
                subhead="Learn more about the Web Literacy Map"
              />
              <IconLink
                href="http://discourse.webmaker.org/category/meet"
                imgSrc="/img/pages/teach-like-mozilla/svg/icon-connect.svg"
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
