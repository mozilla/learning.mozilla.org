var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;
var HeroUnit = require('../components/hero-unit.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var config = require('../lib/build/config');

var SubSection = React.createClass({
  render: function() {
    return (
      <section>
        <Illustration height={150} width={150}
          src1x={this.props.imgSrc}
          src2x={this.props.imgSrc2x || this.props.imgSrc}
          alt=""
          caption={this.props.caption}
          link={this.props.link}
          className={this.props.className}>
          <div>
            <h3>{this.props.header}</h3>
            {this.props.description}
          </div>
        </Illustration>
      </section>
    );
  }
})


var BigSection = React.createClass({
  render: function() {
    return (
      <div className="big-section">
        <section>
          <h2>{this.props.header}</h2>
          <p>{this.props.description}</p>
        </section>
        {
          this.props.subSections.map(function(subSection) {
            return (<SubSection {...subSection} key={subSection.header} />)
          })
        }
        <section>
          <div className="horizontal-divider full-width"></div>
        </section>
      </div>
    );
  }
});

var OpportunitiesPage = React.createClass({
  statics: {
    pageTitle: 'Leadership Opportunities',
    pageClassName: 'opportunities-page'
  },
  bigSections: [
    {
      header: 'Get Your Feet Wet',
      description: 'These roles are short-term opportunities in the movement towards a free and open Web.',
      subSections: [
        {
          header: 'Become a Maker Party Host',
          imgSrc: '/img/pages/opportunities/svg/logo-makerparty.svg',
          description:
          (<div>
            <p>Plan an event that celebrates making and learning on the Web. Our event guides walk you through every step of the process. This role is a great fit for those who want to activate their communities through individual events.</p>
            <p><Link to="events">Learn more about Maker Party</Link>.</p>
          </div>)
        },
        {
          header: 'Become a MozFest Volunteer',
          imgSrc: '/img/pages/opportunities/svg/logo-mozfest.svg',
          description:
          (<div>
            <p>Help organize the annual Mozilla Festival, a three-day celebration of the world’s most valuable public resource: the open Web. Terrific for those who are passionate about any aspect of the open Web, whether it’s open data, the Internet of Things, privacy, web literacy, or anything else.</p>
            <p><a href={config.MOZFEST_SITE_LINK} className="external-link">Learn more about MozFest</a></p>
          </div>)
        }
      ]
    },
    {
      header: 'Ready for More',
      description: 'These are fantastic opportunities for those who can make an ongoing or longer-term commitment.',
      subSections: [
        {
          header: 'Become a Club Captain',
          imgSrc: '/img/pages/opportunities/svg/logo-clubs.svg',
          description:
          (<div>
            <p>Organize a group that meets regularly to learn how to read, write and participate on the Web. Plan activities using the Mozilla Clubs curriculum. This role is perfect for educators, college students, and anyone who can meet with a group of learners regularly.</p>
            <p><Link to="mozilla-clubs">Learn more about Mozilla Clubs</Link>.</p>
          </div>)
        },
        {
          header: 'Become a Fellow',
          imgSrc: '/img/pages/opportunities/logo-fellows.png',
          imgSrc2x: '/img/pages/opportunities/logo-fellows@2x.png',
          description:
          (<div>
            <p>Mozilla Fellowships offer unique opportunities for technologists, researchers, journalists, and others to influence the future of the open Web through placements with policy, technology, news, and educational institutions. Apply to join the next cohort of <a href="https://www.mozillascience.org/" className="external-link">Science</a>, <a href="https://opennews.org/" className="external-link">News</a>, <a href="https://advocacy.mozilla.org/" className="external-link">Advocacy</a>, and <a href="https://developer.mozilla.org/" className="external-link">Developer Network</a> Fellowships that best matches your interests and skills.</p>
          </div>)
        }
      ]
    },
    {
      header: 'In Your City',
      description: 'These opportunities are available in specific locations, where we have dedicated resources. We add new cities when we can, so check back!',
      subSections: [
        {
          header: 'Join a Hive Learning Networks',
          imgSrc: '/img/pages/opportunities/svg/logo-hive.svg',
          description:
          (<div>
            <p>Connect with other educators in your community through the Hive Networks. Hives are city-based networks that champion digital skills and web literacy through professional development and innovation programs for youth. Hives operate in several cities across the globe.</p>
            <p><a href={config.HIVE_LEARNING_NETWORKS_URL} className="external-link">Learn more about Hive</a></p>
          </div>)
        },
        {
          header: 'Lead a Gigabit Community',
          imgSrc: '/img/pages/opportunities/svg/logo-gigabit.svg',
          description:
          (<div>
            <p>Lead a project that makes use of gigabit technologies and associated curricula to show the impact of high-speed networks on learning. Learn more and apply for funding for your project. Selected projects must be piloted in Chattanooga, Tennessee or Kansas City, Missouri.</p>
            <p><a href={config.GIGABIT_SITE_LINK} className="external-link">Learn more about Gigabit</a></p>
          </div>)
        }
      ]
    },
  ],
  render: function(){
    return (
      <div>
        <HeroUnit>
          <h1>Leadership Opportunities</h1>
          <h2>Explore leadership opportunities in the movement towards a free and open Web.</h2>
        </HeroUnit>
        <div className="inner-container">
          {
            this.bigSections.map(function(bigSection){
              return <BigSection {...bigSection} key={bigSection.header} />
            })
          }
          <section>
            <IconLinks>
              <IconLink
                link={config.TWITTER_LINK}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-twitter.svg"
                width={60}
                head="Follow Us"
                subhead="We're @mozteach on Twitter and our community uses #teachtheweb"
                highlightedText="@mozteach"
              />
              <IconLink
                link="https://discourse.webmaker.org/"
                imgSrc="/img/pages/opportunities/svg/icon-leadership-hello.svg"
                head="Say Hello"
                subhead="Connect on the Discourse forum."
                highlightedText="Discourse forum"
              />
              <IconLink
                link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-question.svg"
                width={60}
                head="Have a Question?"
                subhead="Want to be connected with one of our staff or volunteers? Email us."
                className="mailto"
                highlightedText="Email us"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = OpportunitiesPage;
