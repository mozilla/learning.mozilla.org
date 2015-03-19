var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var Map = require('./map.jsx');
var Blockquote = require('./blockquote.jsx');
var IconLink = require('./icon-link.jsx');
var PageEndCTA = require('./page-end-cta.jsx');
var Modal = require('./modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');

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
          <img src="/img/icon-how-do-clubs-work.svg" alt="icon how do web clubs work" />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <h2>How do Web Clubs work?</h2>
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


var BottomCTA = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <PageEndCTA linkTo={this.props.ctaLink}>
            <div>
              <img className="divider" src="/img/clubs-line-divider.svg" alt="line divider" />
              <p>Do you meet regularly with a group of learners to increase web literacy skills?</p>
              <a className="btn btn-awsm" onClick={this.props.onClick}>Add your club to the map</a>
            </div>
          </PageEndCTA>
        </div>
      </div>
    );
  }
});


var ModalAddYourClub = React.createClass({
  render: function() {
    return(
      <Modal modalTitle="Add Your Clubs To The Map">
        <form>
          <fieldset>
            <label>What is the name of your Club?</label>
            <input type="text" placeholder="We love creative Club names" />
          </fieldset>
          <fieldset>
            <label>Where does it take place?</label>
            <input type="text" placeholder="Type in a city or a country" />
          </fieldset>
          <fieldset>
            <label>Does your Club have a website?</label>
            <input type="text" placeholder="www.myclubwebsite.com" />
          </fieldset>
          <fieldset>
            <label>What do you focus your efforts on?</label>
            <textarea rows="5" placeholder="Give us a brief description about what your Club is about." />
          </fieldset>
          <input type="submit" className="btn" value="Add Your Club To The Map" />
        </form>
      </Modal>
    );
  }
});


var ModalLearnMore = React.createClass({
  render: function() {
    return(
      <Modal modalTitle="Learn More About Hive Learning Clubs">
        <form>
          <fieldset>
            <label>What is your first name?</label>
            <input type="text" placeholder="We're a friendly bunch, promised!" />
          </fieldset>
          <fieldset>
            <label>Where does it take place?</label>
            <input type="text" placeholder="Type in a city or a country" />
          </fieldset>
          <fieldset>
            <label>What is your e-mail?</label>
            <p>A member of our team will personally reach out to you.</p>
            <input type="email" placeholder="email@example.com" />
          </fieldset>
          <input type="submit" className="btn" value="Find Out More" />
        </form>
      </Modal>
    );
  }
});


var ClubsPage = React.createClass({
  mixins: [ModalManagerMixin, TeachAPIClientMixin],
  statics: {
    teachAPIEvents: {
      'clubs:change': 'handleClubsChange'
    },
    pageClassName: "clubs"
  },
  getInitialState: function() {
    return {
      clubs: this.getTeachAPI().getClubs()
    };
  },
  componentDidMount: function() {
    this.getTeachAPI().updateClubs();
  },
  handleClubsChange: function(clubs) {
    this.setState({clubs: clubs});
  },
  showAddYourClubModal: function() {
    this.showModal(ModalAddYourClub);
  },
  showLearnMoreModal: function() {
    this.showModal(ModalLearnMore);
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/hero-clubs.jpg">
          <h1>Mozilla Web Clubs</h1>
          <div><a className="btn btn-awsm" onClick={this.showAddYourClubModal}>Add Your Club</a></div>
          <div><p className="learn-more">or <a onClick={this.showLearnMoreModal}>find out more</a> about us</p></div>
        </HeroUnit>
        <section>
          <WebLitMap/>
          <div className="mapDiv" id="mapDivID">
            <Map className="mapDivChild" clubs={this.state.clubs} />
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
        <section>
          <BottomCTA onClick={this.showAddYourClubModal} />
        </section>
      </div>
    );
  }
});

module.exports = ClubsPage;
