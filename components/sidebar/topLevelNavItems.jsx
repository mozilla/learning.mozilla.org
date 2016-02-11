var React = require('react');
var TopLevelNavItem = require('./TopLevelNavItem.jsx');

var config = require('../../config/config.js');

var MENU_ENTRIES = [
  {
    name: "Teaching Activities",
    link: '/activities',
    icon: "/img/components/sidebar/svg/icon-nav-activities.svg",
    className: "activities",
    subItems: [
      {
        name: "Web Literacy",
        link: "/activities/web-literacy"
      }
    ]
  },
  {
    name: "Leadership Opportunities",
    link: '/opportunities',
    icon: "/img/components/sidebar/svg/icon-nav-maker.svg",
    className: 'opportunities',
    subItems: [
      {
        name: "Mozilla Clubs",
        link: '/clubs'
      },
      {
        name: "Maker Party",
        link: '/events'
      },
      {
        name: "Hive Learning Networks",
        link: config.HIVE_LEARNING_NETWORKS_URL
      },
      {
        name: "MozFest",
        link: config.MOZFEST_SITE_LINK
      },
      {
        name: "Gigabit Community Fund",
        link: config.GIGABIT_SITE_LINK
      }
    ]
  },
  {
    name: "Tools",
    link: '/tools',
    icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
    className: "tools-page"
  },
  {
    name: "Community",
    link: "/community",
    icon: "/img/components/sidebar/svg/icon-nav-community.svg",
    className: "community",
  }
];

var topLevelNavItems = MENU_ENTRIES.map(function(entry, i) {
  return <TopLevelNavItem key={entry.name} {...entry} />;
});

module.exports = topLevelNavItems;
