var React = require('react');
var TopLevelNavItem = require('./TopLevelNavItem.jsx');

var config = require('../../config/config.js');

var MENU_ENTRIES = [
  {
    name: "Teaching Activities",
    to: '/activities',
    icon: "/img/components/sidebar/svg/icon-nav-activities.svg",
    className: "activities",
    subItems: [
      {
        name: "Web Literacy",
        to: "/activities/web-literacy"
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
  }
];

var topLevelNavItems = MENU_ENTRIES.map(function(entry, i) {
  return <TopLevelNavItem key={entry.name} {...entry} />;
});

module.exports = topLevelNavItems;
