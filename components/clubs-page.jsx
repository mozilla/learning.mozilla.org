var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var Map = require('./map.jsx');
var Blockquote = require('./blockquote.jsx');
var IconLink = require('./icon-link.jsx');
var PageEndCTA = require('./page-end-cta.jsx');

var WebLitMap = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h2>The Global Web Literacy Movement</h2>
        </div>
      </div>

    );
  }
});

var HowClubWorks = React.createClass({
  render: function() {
    return(
      <div className="row list-with-illust">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img src="/img/icon-how-do-clubs-work.svg" alt="icon how do clubs work" />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <h2>How do Clubs work?</h2>
          <ul>
            <li>Grow the web literary of leaners</li>
            <li>Meet regularly in classrooms, libraries, coffee shops &mdash; anywhere!</li>
            <li>Teach with open practices</li>
            <li>Guide people to learn by making</li>
            <li>Connect with local and global networks</li>
          </ul>
        </div>
      </div>
    );
  }
});

var Quote = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <Blockquote className="primary-quote" author="Mikko K, Helsinki, Finland"
              imgSrc="/img/mikko-finland@1x.png" imgSrc2x="/img/mikko-finland@2x.png" imgAlt="Mikko Finland Quote">

            <p>The idea of teachers and students learning at the same time is what makes me excited about this work.</p>
          </Blockquote>
        </div>
      </div>
    );
  }
});

var IconLinks = React.createClass({
  ICON_LINKS: [
    {
      linkTo: "fixme",
      imgSrc: "/img/icon-curriculum.svg",
      imgAlt: "icon curriculum",
      head: "Curriculum",
      subhead: "Modular Web Literacy curriculum"
    },
    {
      linkTo: "fixme",
      imgSrc: "/img/icon-connect.svg",
      imgAlt: "icon connect",
      head: "Connect",
      subhead: "Connect with other Club Leaders"
    },
    {
      linkTo: "fixme",
      imgSrc: "/img/icon-tips.svg",
      imgAlt: "icon tips",
      head: "Helpful Tips",
      subhead: "Tips for running your Club"
    }
  ],
  render: function() {
    // need to have `key`, see: http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    var iconlinks = this.ICON_LINKS.map(function(link,i) {
      return (
        <div className="col-sm-4 col-md-4 col-lg-4" key={i}>
          <IconLink info={link} />
        </div>
      );
    });
    return (
      <div className="row">{iconlinks}</div>
    );
  }
});


var BottomCTA = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
            <img className="divider" src="/img/clubs-line-divider.svg" alt="line divider" />
          <PageEndCTA linkTo={this.props.ctaLink} ctaBtnText="Add your club to the map">
            <p>Do you meet regularly with a group of learners to increase web literacy skills?</p>
          </PageEndCTA>
        </div>
      </div>
    );
  }
});


var ClubsPage = React.createClass({
  statics: {
    pageClassName: "clubs"
  },
  render: function() {
    var theCtaLink = "fixme"; // CTA link should be the same for hero CTA and page bottom CTA
    return (
      <div>
        <HeroUnit image="/img/hero-clubs.jpg">
          <h1>Mozilla Learning Clubs</h1>
          <div><Link to={theCtaLink} className="btn btn-awsm">Add Your Club</Link></div>
          <p className="learn-more">or <Link to="fixme">find out more</Link> about us</p>
        </HeroUnit>
        <section>
          <WebLitMap/>
          <div className="mapDiv" id="mapDivID">
            <Map accessToken={process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg'}
           mapId={process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3'} className={'mapDivChild'}/>
           </div>
        </section>
        <section>
          <HowClubWorks/>
        </section>
        <section>
          <Quote/>
        </section>
        <section>
          <IconLinks/>
        </section>
        <section className="bottomCTA">
          <BottomCTA ctaLink={theCtaLink}/>
        </section>
      </div>
    );
  }
});

module.exports = ClubsPage;
