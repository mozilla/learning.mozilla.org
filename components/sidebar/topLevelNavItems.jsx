var React = require('react');
var TopLevelNavItem = require('./TopLevelNavItem.jsx');

var config = require('../../config/config.js');

var MENU_ENTRIES = [
  {
    name: "Teaching Activities",
    to: '/activities',
    icon: "/img/components/sidebar/svg/icon-nav-activities.svg",
    className: "activities",
  },
  {
    name: "Web Literacy",
    to: "/web-literacy",
    icon: "/img/components/sidebar/svg/icon-nav-weblit.svg",
    className: "web-literacy",
    subItems: [
      {
        name: "21st Century Skills",
        to: '/web-literacy/skills'
      }
    ]
  },
  {
    name: "Leadership Opportunities",
    to: '/opportunities',
    icon: "/img/components/sidebar/svg/icon-nav-maker.svg",
    className: 'opportunities',
    subItems: [
      {
        name: "Mozilla Clubs",
        to: '/clubs'
      },
      {
        name: "Maker Party",
        to: '/events'
      },
      {
        name: "Hive Learning Networks",
        to: config.HIVE_LEARNING_NETWORKS_URL
      },
      {
        name: "MozFest",
        to: config.MOZFEST_SITE_LINK
      },
      {
        name: "Gigabit Community Fund",
        to: config.GIGABIT_SITE_LINK
      }
    ]
  },
  {
    name: "Credentials",
    to: '/badges',
    icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
    className: "badge-page"
    // FIXME: TODO: we need to give this its own icon
  },
  {
    name: "Tools",
    to: '/tools',
    icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
    className: "tools-page"
  },
  {
    name: "Community",
    to: "/community",
    icon: "/img/components/sidebar/svg/icon-nav-community.svg",
    className: "community",
    subItems: [
      {
        name: "Community Call",
        to: '/community/community-call'
      },
      {
        name: "Curriculum Workshop",
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
