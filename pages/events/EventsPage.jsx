var React = require('react');
var Link = require('react-router').Link;

var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var Illustration = require('../../components/illustration.jsx');

var EventsHeader = require('../../components/events/events-header.jsx');
var EventsNav = require('../../components/events/events-nav.jsx');

var EventsPage = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: 'Events',
    pageClassName: 'events'
  },
  render: function() {
    return (
      <div>
        <EventsHeader/>
        <EventsNav/>

        <div className="inner-container">
          <section className="join-global-movement">
            <Illustration
            height={280} width={238}
            src1x="/img/pages/events/svg/maker-party-logo.svg"
            alt="Maker Party logo"
            className="content-first"
            >
              <h2 className="text-center">
                {this.context.intl.formatMessage({id: 'what_is_maker_party'})}
              </h2>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_paragraph_1'})}
              </p>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_paragraph_2'})}
              </p>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_paragraph_3'})}
              </p>
            </Illustration>
          </section>
        </div>

        <div className="inner-container">
          <section>
            <Illustration
              height={244} width={244}
              src1x="/img/pages/events/maker-party-quote.png"
              src2x="/img/pages/events/maker-party-quote_2x.png"
              alt="Maker Party logo"
            >
              <h2 className="text-center">
                {this.context.intl.formatMessage({id: 'why_love_maker_party'})}
              </h2>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_testimonial_1'})}
              </p>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_testimonial_2'})}
              </p>
            </Illustration>
          </section>

          <div className="row full-row quote">
            <section>
              <div className="text-center">
                <p>
                  {this.context.intl.formatMessage({id: 'maker_party_blockquote'})}
                </p>
                <a href="#" className="btn">
                  {this.context.intl.formatMessage({id: 'learn_more'})}
                </a>
              </div>
            </section>
          </div>

          <section>
            <IconLinks>
              <IconLink
                link="#"
                imgSrc="/img/pages/events/svg/icon-community.png"
                head={this.context.intl.formatMessage({id: 'partner'})}
                subhead={this.context.intl.formatMessage({id: 'become_maker_party_partner'})}
              />
              <IconLink
                link="#"
                imgSrc="/img/pages/events/svg/icon-join.svg"
                head={this.context.intl.formatMessage({id: 'press'})}
                subhead={this.context.intl.formatMessage({id: 'maker_party_press'})}
              />
              <IconLink
                link="#"
                imgSrc="/img/pages/events/svg/icon-home-help.png"
                head={this.context.intl.formatMessage({id: 'contact'})}
                subhead={this.context.intl.formatMessage({id: 'maker_party_contact'})}
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = EventsPage;
