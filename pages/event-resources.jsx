var React = require('react');
var ImageTag = require('../components/imagetag.jsx');

var LinksContainer = React.createClass({
  render: function() {
    return (
      <div className="row">{this.props.children}</div>
    );
  }
});
var PageLinker = React.createClass({
  render: function() {
    return (
      <div className="page-linker col-sm-3 col-md-3 col-lg-3">
        <a href={this.props.href}>{this.props.head}</a>
        {this.props.children}
      </div>
    );
  }
});
var EventItem = React.createClass({
  render: function() {
    return (
      <div className="event-item">
        <div className="event-icon">
          <div className="participants-number">{this.props.participants}</div>
          <div className="participants-label">PARTICIPANTS</div>
        </div>
        <div className="event-content">
          <div className="event-item-header">{this.props.head}</div>
          <div className="event-item-subheader">{this.props.subHead}</div>
          <p className="event-item-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
});
var LogoAsset = React.createClass({
  render: function() {
    return (
      <div className="col-sm-3 col-md-3 col-lg-3">
        <ImageTag
        width={200} height={200}
        src1x={this.props.src1x} src2x={this.props.src2x}
        alt={this.props.alt}/>
        <div>{this.props.children}</div>
        <div>{this.props.head}</div>
      </div>
    );
  }
});
var LogoAssetLink = React.createClass({
  render: function() {
    return (
      <a href={this.props.children}><span className="ion ion-ios-copy"></span>{this.props.children}</a>
    );
  }
});
var Tabulator = React.createClass({
  render: function() {
    return (
      <div></div>
    );
  }
});

var EventsResources = React.createClass({
  statics: {
    pageClassName: 'event-resources'
  },
  render: function() {
    return (
      <div className="inner-container">
        <h1>Event Resources</h1>
        <p>That you for helping us celebrate webmaking around the world! These resources will help you plan a unique event tailored especially for your audience.</p>

        <LinksContainer>
          <PageLinker head="event guides" href="#event-guides">
            <p></p>
          </PageLinker>
          <PageLinker head="logos & assets" href="#logo-assets">
            <p></p>
          </PageLinker>
          <PageLinker head="event details" href="#event-details">
            <p></p>
          </PageLinker>
          <PageLinker head="event support" href="#event-support">
            <p></p>
          </PageLinker>
        </LinksContainer>

        <h2 id="event-guides">Event Guides</h2>
        <p>No matter the size of your event, we have a guide for you.</p>

        <EventItem participants="2-5"
          head="small event"
          subHead="Perfect for 2 to 5 participants"
          content="A fun way to spend an hour on a rainy day, hang out as a family, learn to hack with a friend, and make cool things on the web."
        />
        <EventItem participants="5-50"
          head="medium event"
          subHead="Great for 5 to 50 participants"
          content="A fantastic way to team up people with different skill-sets to collaboratively build something new or improve something existing on the web, all while learning and teaching new skills."
        />
        <EventItem participants="50+"
          head="large event"
          subHead="For those ready for the adventure of 50+ participants"
          content="A rewarding way to bring together local organizations in a science fair setting to demonstrate cool web ideas, provice fun hands-on activities, and introduce your community to making and hacking."
        />

        <h2 id="logo-assets">Logos & Assets</h2>
        <p>Feel free to use these Maker Party graphics in any of you promotional materials:</p>

        <div className="row">
          <LogoAsset head="Maker Party Logo"
          src1x="/img/event-resources-page/MakerPartyLogo-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Brand Palette"
          src1x="/img/event-resources-page/MakerPartyBanner-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Poster"
          src1x="/img/event-resources-page/MakerPartyBanner-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Desktop Wallpaper"
          src1x="/img/event-resources-page/MakerPartyWallpaper-1-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Certificate"
          src1x="/img/event-resources-page/MakerPartyCertificateMake-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Table Cloth Design"
          src1x="/img/event-resources-page/MakerPartyTableClothDesign-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Buttons"
          src1x="/img/event-resources-page/MakerPartyButtons-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="KUMI Papertoy"
          src1x="/img/event-resources-page/KUMI-Papertoy-blank-tees-thumb.png"
          src2x="">
            <LogoAssetLink href="">EPS</LogoAssetLink>
            <LogoAssetLink href="">PNG</LogoAssetLink>
          </LogoAsset>
        </div>

        <h2 id="event-details">Event Details</h2>
        <p>There are many details to consider when planning your event. Here's a list of what you need to know:</p>

        <Tabulator>

        </Tabulator>

        <h2 id="event-support">Event Support</h2>
        <p>Get help from the community and our staff.</p>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img></img>
            <h3 className="event-support-header">Ask The Community</h3>
            <p>
              We have a large, global community of people like you who have hosted events and have lots of advice to share. Visit our <a href="">discussion forum</a> to ask questions or share your own advice and experience with others.
            </p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img></img>
            <h3 className="event-support-header">Request Support</h3>
            <p>
              Still can't find an answer to your question? Our team is here to help you with all things Maker Party. <a href="">Contact us</a> and we will get back to you as soon as possible.
            </p>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = EventsResources;
