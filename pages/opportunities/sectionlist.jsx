var React = require('react');
var LinkAnchorSwap = require('../../components/link-anchor-swap.jsx');
var config = require('../../config/config');
var FormattedMessage = require('react-intl').FormattedMessage;

var BigSection = require('./BigSection.jsx');

var SectionList = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  sectionList: function() {
    var formatMessage = this.context.intl.formatMessage;
    var newsLink = <a href="https://opennews.org/" className="external-link">{formatMessage({id: 'news'})}</a>;
    var advocacyLink = <a href="https://advocacy.mozilla.org/" className="external-link">{formatMessage({id: 'advocacy'})}</a>;
    var scienceLink = <a href="https://www.mozillascience.org/" className="external-link">{formatMessage({id: 'science'})}</a>;
    var developerNetworkLink = <a href="https://developer.mozilla.org/" className="external-link">{formatMessage({id: 'developer_network'})}</a>;
    var become_a_fellow_message = <FormattedMessage id="become_a_fellow_message" values={{developerNetworkLink: developerNetworkLink, scienceLink: scienceLink, advocacyLink: advocacyLink, newsLink: newsLink}} />;

    return [
      {
        header: formatMessage({id: 'get_your_feet_wet'}),
        description: formatMessage({id: 'get_your_feet_wet_message'}),
        subSections: [
          /*
          {
            header: formatMessage({id: 'become_makerparty_host'}),
            imgSrc: '/img/pages/opportunities/svg/logo-makerparty.svg',
            description:
              (<div>
                <p>{formatMessage({id: 'become_makerparty_host_message'})}</p>
                <p><LinkAnchorSwap to={"/events"}>{formatMessage({id: 'become_makerparty_host_link'})}</LinkAnchorSwap></p>
              </div>)
          },
          */
          {
            header: formatMessage({id: 'become_mozfest_volunteer'}),
            imgSrc: '/img/pages/opportunities/svg/logo-mozfest.svg',
            description:
              (<div>
                <p>{formatMessage({id: 'become_mozfest_volunteer_message'})}</p>
                <p><a href={config.MOZFEST_SITE_LINK} className="external-link">{formatMessage({id: 'become_mozfest_volunteer_link'})}</a></p>
              </div>)
          }
        ]
      },
      {
        header: formatMessage({id: 'ready_for_more'}),
        description: formatMessage({id: 'ready_for_more_message'}),
        subSections: [
          {
            header: formatMessage({id: 'become_a_club_captain'}),
            imgSrc: '/img/pages/opportunities/svg/logo-clubs.svg',
            description:
              (<div>
                <p>{formatMessage({id: 'become_a_club_captain_message'})}</p>
                <p><LinkAnchorSwap to={"/clubs"}>{formatMessage({id: 'become_a_club_captain_link'})}</LinkAnchorSwap></p>
              </div>)
          },
          {
            header: formatMessage({id: 'become_a_fellow'}),
            imgSrc: '/img/pages/opportunities/logo-fellows.png',
            imgSrc2x: '/img/pages/opportunities/logo-fellows@2x.png',
            description:
              (<div>
                <p>{become_a_fellow_message}</p>
              </div>)
          }
        ]
      },
      {
        header: formatMessage({id: 'in_your_city'}),
        description: formatMessage({id: 'in_your_city_message'}),
        subSections: [
          {
            header: formatMessage({id: 'join_hive'}),
            imgSrc: '/img/pages/opportunities/svg/logo-hive.svg',
            description:
              (<div>
                <p>{formatMessage({id: 'join_hive_message'})}</p>
                <p><a href={config.HIVE_LEARNING_NETWORKS_URL} className="external-link">{formatMessage({id: 'join_hive_link'})}</a></p>
              </div>)
          },
          {
            header: formatMessage({id: 'lead_a_gigabit'}),
            imgSrc: '/img/pages/opportunities/svg/logo-gigabit.svg',
            description:
              (<div>
                <p>{formatMessage({id: 'lead_a_gigabit_message'})}</p>
                <p><a href={config.GIGABIT_SITE_LINK} className="external-link">{formatMessage({id: 'lead_a_gigabit_link'})}</a></p>
              </div>)
          }
        ]
      },
    ];
  },
  render: function() {
    return (
      <div>{this.sectionList().map(function(bigSection) {
        return (
            <BigSection {...bigSection} key={bigSection.header} />
        );
      })
      }
      </div>
    );
  }
});

module.exports = SectionList;
