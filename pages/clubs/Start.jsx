var React = require('react');
var ThumbCarousel = require('mofo-ui').ThumbCarousel;
var Link = require('react-router').Link;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;

var Start = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function () {
    var carouselData = [{
      image: '/img/pages/clubs/club-captains/asisipho.png',
      caption: this.context.intl.formatMessage({id: 'captain_quote_asisipho_message'}),
      attribution: this.context.intl.formatMessage({id: 'captain_quote_asisipho_attribution'})
    }, {
      image: '/img/pages/clubs/club-captains/patience.png',
      caption: this.context.intl.formatMessage({id: 'captain_quote_patience_message'}),
      attribution: this.context.intl.formatMessage({id: 'captain_quote_patience_attribution'})
    }, {
      image: '/img/pages/clubs/club-captains/arkodyuti.png',
      caption: this.context.intl.formatMessage({id: 'captain_quote_arkodyuti_message'}),
      attribution: this.context.intl.formatMessage({id: 'captain_quote_arkodyuti_attribution'})
    }, {
      image: '/img/pages/clubs/club-captains/mark.png',
      caption: this.context.intl.formatMessage({id: 'captain_quote_mark_message'}),
      attribution: this.context.intl.formatMessage({id: 'captain_quote_mark_attribution'})
    }];

    return (
      <section>
        <section className="center-block">
         <h1>{this.context.intl.formatMessage({id: 'why_become_captain_title'})}</h1>
          <p>{this.context.intl.formatMessage({id: 'why_become_captain_message'})}</p>
        </section>

        <section className="center-block">
          <h1>{this.context.intl.formatMessage({id: 'what_captains_think_title'})}</h1>
          <p>{this.context.intl.formatMessage({id: 'what_captains_think_message'})}</p>
        </section>

        <ThumbCarousel contents={carouselData}></ThumbCarousel>

        <section className="center-block">
          <h1><FormattedHTMLMessage id='club_captain_support_title' /></h1>
          <p>
            {this.context.intl.formatMessage({id: 'club_captain_support_message'})}
          </p>
        </section>

        <ul className="icon-list">
          <li className="icon-share">
            {this.context.intl.formatMessage({id: 'captain_support_mentorship_message'})}
          </li>
          <li className="icon-institution">
            {this.context.intl.formatMessage({id: 'captain_support_collaboration_message'})}
          </li>
          <li className="icon-book">
            <FormattedHTMLMessage id='captain_support_curriculum_message' />
          </li>

          <li>
            <div className="coord-cta clearfix">
              <div className="col-sm-8">
                <p>The Regional Coordinator is a person with strong leadership and mentorship skills. They work closely with the staff members and Club Captains to make sure the Clubs program is successfully running in their local region.</p>
                <p>Get to know the <a href="/clubs/coordinators">featured Regional Coordinators</a>.</p>
              </div>
              <div className="col-sm-4">
                <img src="/img/pages/coordinators/mosaic-pitcures.jpg"/>
              </div>
            </div>
          </li>
        </ul>

        <section className="center-block">
          <h1>{this.context.intl.formatMessage({id: 'how_become_captain_title'})}</h1>
          <p>{this.context.intl.formatMessage({id: 'how_become_captain_message'})}</p>
        </section>

        <ol className="icon-list numbered-list">
          <li>{this.context.intl.formatMessage({id: 'fill_out_form_message_message'})}</li>
          <li>{this.context.intl.formatMessage({id: 'email_about_application_message'})}</li>
          <li>{this.context.intl.formatMessage({id: 'online_orientation_message'})}</li>
        </ol>

        <div className="single-button">
          <Link to={"/" + this.context.intl.locale + "/clubs/apply/"} className="btn">{this.context.intl.formatMessage({id: 'apply_to_be_captain_link'})}</Link>
        </div>
      </section>
    );
  }
});

module.exports = Start;
