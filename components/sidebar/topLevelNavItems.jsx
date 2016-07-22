var React = require('react');
var TopLevelNavItem = require('./TopLevelNavItem.jsx');

var config = require('../../config/config.js');

var MENU_ENTRIES = [
  {
    name: "teaching_activities",
    to: '/activities',
    icon: "/img/components/sidebar/svg/icon-nav-activities.svg",
    className: "activities",
  },
  {
    name: "web_literacy",
    to: "/web-literacy",
    icon: "/img/components/sidebar/svg/icon-nav-weblit.svg",
    className: "web-literacy",
    subItems: [
      {
        name: "21st_century_skills",
        to: '/web-literacy/skills'
      }
    ]
  },
  {
    name: "leadership_opportunities",
    to: '/opportunities',
    icon: "/img/components/sidebar/svg/icon-nav-maker.svg",
    className: 'opportunities',
    subItems: [
      {
        name: "mozilla_clubs",
        to: '/clubs'
      },
      {
        name: "maker_party",
        to: '/events'
      },
      {
        name: "hive_learning_networks",
        to: config.HIVE_LEARNING_NETWORKS_URL
      },
      {
        name: "mozfest",
        to: config.MOZFEST_SITE_LINK
      },
      {
        name: "gigabit_community_fund",
        to: config.GIGABIT_SITE_LINK
      }
    ]
  },
  {
    name: "credentials",
    to: '/badges',
    icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
    className: "badge-page"
    // FIXME: TODO: we need to give this its own icon
  },
  {
    name: "tools",
    to: '/tools',
    icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
    className: "tools-page"
  },
  {
    name: "community",
    to: "/community",
    icon: "/img/components/sidebar/svg/icon-nav-community.svg",
    className: "community",
    subItems: [
      {
        name: "community_call",
        to: '/community/community-call'
      },
      {
        name: "curriculum_workshop",
        to: '/community/curriculum-workshop'
      }
    ]
  }
];

// FEATURE FLAG:
// remove badges if its feature flag is not used
if (!config.ENABLE_BADGES) {
  MENU_ENTRIES.splice(3,1);
}

var topLevelNavItems = MENU_ENTRIES.map(function(entry, i) {
  return <TopLevelNavItem key={entry.name} {...entry} />;
});

module.exports = topLevelNavItems;
