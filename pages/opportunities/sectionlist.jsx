var React = require('react');
var LinkAnchorSwap = require('../../components/link-anchor-swap.jsx');
var config = require('../../config/config');

var BigSection = require('./BigSection.jsx');

var sectionList = [
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
          <p><LinkAnchorSwap to={"/events"}>Learn more about Maker Party</LinkAnchorSwap>.</p>
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
          <p><LinkAnchorSwap to={"/clubs"}>Learn more about Mozilla Clubs</LinkAnchorSwap>.</p>
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
];

module.exports = sectionList.map(function(bigSection){
  return <BigSection {...bigSection} key={bigSection.header} />
});
