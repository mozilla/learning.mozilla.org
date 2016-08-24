var skills = require("./skills");

var SEARCH = skills.SEARCH;
var NAVIGATE = skills.NAVIGATE;
var SYNTHESIZE = skills.SYNTHESIZE;
var EVALUATE = skills.EVALUATE;
var DESIGN = skills.DESIGN;
var COMPOSE = skills.COMPOSE;
var CODE = skills.CODE;
var REVISE = skills.REVISE;
var REMIX = skills.REMIX;
var SHARE = skills.SHARE;
var CONNECT = skills.CONNECT;
var PROTECT = skills.PROTECT;
var OPEN = skills.OPEN;
var CONTRIBUTE = skills.CONTRIBUTE;

module.exports = [
  {
    name: "Kraken the Code",
    topic: "Read",
    webLitSkills: [SEARCH, SYNTHESIZE, EVALUATE],
    skills: ["PS"],
    imgSrc1x: "/img/pages/web-lit-basics/img-kraken-code.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-kraken-code@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-kraken-the-code/#en",
    duration: "60 minutes",
    content: "Learners will use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also learning about search terms, keywords, and how to assess the validity and relevance of web sources.",
    difficulty: "For beginners"
  },
  {
    name: "Ping Kong",
    topic: "Read",
    webLitSkills: [NAVIGATE, SYNTHESIZE],
    skills: ["Com"],
    imgSrc1x: "/img/pages/web-lit-basics/img-ping-kong.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-ping-kong@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-ping-kong/#en",
    duration: "1-2 hours",
    content: "For many, \"the Internet\" is an abstract and overwhelming concept. This activity challenges learners to think concretely about how the internet communicates with a computer.",
    difficulty: "For beginners"
  },
  {
    name: "HTML Puzzle Cubes",
    topic: "Write",
    webLitSkills: [CODE, REMIX],
    skills: ["Cre"],
    imgSrc1x: "/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-puzzle-boxes@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes/#en",
    duration: "45 minutes-1 hour",
    content: "Learners will race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page.",
    difficulty: "For beginners"
  },
  {
    name: "Hack the News",
    topic: "Write",
    webLitSkills: [CONNECT, CODE, COMPOSE, OPEN],
    skills: ["PS", "Cre", "Com"],
    imgSrc1x: "/img/pages/web-lit-basics/img-hack-news.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-hack-news@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-hack-the-news/#en",
    duration: "45 minutes-1 hour",
    content: "Learners will use X-Ray Goggles to remix a news website, learning about openly-licensed resources, different forms of media, and how to create something new on the Web through remix.",
    difficulty: "For beginners"
  },
  {
    name: "Web Chef",
    topic: "Participate",
    webLitSkills: [CONNECT, OPEN, REMIX, SHARE],
    skills: ["Com", "PS", "Col"],
    imgSrc1x: "/img/pages/web-lit-basics/img-web-chef.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-web-chef@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-web-chef/#en",
    duration: "1-2 hours",
    content: "Learners will teach their peers a skill and document the steps by making a web resource that includes properly attributed open content.",
    difficulty: "For beginners"
  },
  {
    name: "Story of Us",
    topic: "Participate",
    webLitSkills: [COMPOSE, CONNECT, SHARE],
    skills: ["Com", "Cre", "Col"],
    imgSrc1x: "/img/pages/web-lit-basics/img-story-of-us.jpg",
    imgSrc2x: "/img/pages/web-lit-basics/img-story-of-us@2x.jpg",
    href: "https://mozilla.github.io/mozilla-club-activity-story-of-us/#en",
    duration: "1-2 hours",
    content: "Learners will learn how to tell their Story of Self, use it to reflect on what they have learned, the role of learning socially, and how they want to learn and participate on the web and with their community going forward.",
    difficulty: "For beginners"
  },
  {
    name: "Why do we use the Web?",
    topic: "Participate",
    webLitSkills: [EVALUATE, OPEN, SHARE, CONTRIBUTE],
    skills: ["Com", "PS", "Col"],
    imgSrc1x: "/img/pages/web-lit-basics-two/why-do-we-use-the-web.png",
    imgSrc2x: "/img/pages/web-lit-basics-two/why-do-we-use-the-web@2x.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session01-why-do-we-use-the-web.html#overview",
    duration: "110 minutes-2 hours",
    content: "Learners will create and research survey questions about their community's Web use, learning collaborating, community participation, and open practices.",
    difficulty: "For beginners"
  },
  {
    name: "The Web is a Tool for Learning",
    topic: "Read",
    webLitSkills: [NAVIGATE, REMIX, EVALUATE, OPEN],
    skills: ["PS"],
    imgSrc1x: "/img/pages/web-lit-basics-two/the-web-is-a-tool-for-learning.jpg",
    imgSrc2x: "/img/pages/web-lit-basics-two/the-web-is-a-tool-for-learning@2x.jpg",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session02-the-web-is-a-tool-for-learning.html#overview",
    duration: "2 to 2 ½ hours",
    content: "Learners will use Web-native instructions to make a meme or build a maker project in real life, learning navigating, remixing, and community participation.",
    difficulty: "For beginners"
  },
  {
    name: "Project Playlist",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, SEARCH, OPEN],
    skills: ["Cre"],
    imgSrc1x: "/img/pages/web-lit-basics-two/project-playlist.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/bridge01-project-playlist.html#overview",
    duration: "70 minutes-90 minutes",
    content: "Learners will build a playlist of songs from the Open Web, learning composing and remixing.",
    difficulty: "For beginners"
  },
  {
    name: "Welcome to My Mixtape",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, SYNTHESIZE, REMIX, OPEN, SHARE, CONTRIBUTE],
    skills: ["Cre"],
    imgSrc1x: "/img/pages/web-lit-basics-two/welcome-to-my-mixtape.jpg",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session03-welcome-to-my-mixtape.html#overview",
    duration: "90 minutes-2 hours",
    content: "Learners will use Web-native music-production tools and share music through an online community, learning composing, remix, sharing, and community participation.",
    difficulty: "For beginners"
  },
  {
    name: "Pixel Portrait",
    topic: "Write",
    webLitSkills: [COMPOSE, OPEN],
    skills: ["Cre"],
    imgSrc1x: "/img/pages/web-lit-basics-two/pixel-portrait.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/bridge02-pixel-portrait.html#overview",
    duration: "105 minutes-120 minutes",
    content: "Learners will create their own pixel art, import it into an online code editor, and then insert it into a webpage, learning composing.",
    difficulty: "For beginners"
  },
  {
    name: "#allthezstickerz",
    topic: "Participate",
    webLitSkills: [CODE, COMPOSE, CONNECT, EVALUATE, OPEN, REMIX, SYNTHESIZE, SHARE, CONTRIBUTE],
    skills: ["Com", "Cre", "PS", "Col"],
    imgSrc1x: "/img/pages/web-lit-basics-two/allthestickerz.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session04-allthestickerz.html#overview",
    duration: "3 hours",
    content: "Learners will create pixel art stickers, publish them for others, and use them to annotate and remix the Web, learning community participation, composing, open practices, remix, and sharing.",
    difficulty: "For beginners"
  },
  {
    name: "Who Am I?",
    topic: "Read",
    webLitSkills: [EVALUATE, NAVIGATE, SEARCH, COMPOSE, REMIX],
    skills: ["PS", "Cre"],
    imgSrc1x: "/img/pages/web-lit-basics-two/who-am-i.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/bridge03-who-am-i.html",
    duration: "90 minutes",
    content: "Learners will conduct a reverse image search to find information about a subject online and then revise a webpage with their own text and images, learning composing and search.",
    difficulty: "For beginners"
  },
  {
    name: "Fair Use Free-for-All",
    topic: "Read",
    webLitSkills: [EVALUATE, NAVIGATE, OPEN, SEARCH],
    skills: ["Com", "PS"],
    imgSrc1x: "/img/pages/web-lit-basics-two/fair-use-free-for-all.png",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session05-fair-use-free-for-all.html#overview",
    duration: "1-2 hours",
    content: "Learners will compete to identify examples and non-examples of fair use in peers' web remixes, learning credibility, search, and sharing.",
    difficulty: "For beginners"
  },
  {
    name: "The Planets & Accessibility",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN, REMIX, REVISE],
    skills: ["Com", "Cre", "PS"],
    imgSrc1x: "/img/pages/web-lit-basics-two/the-planets.jpg",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/web-lit-basics-two-migrated/session06-the-planets-and-accessibility.html#overview",
    duration: "2 hours",
    content: "Learners will improve the accessibility of a webpage by changing its color scheme, content, and embedded media, learning composing, designing for accessibility, and remixing.",
    difficulty: "For beginners"
  },
  {
    name: "CSS Fonts",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN, EVALUATE, REMIX, REVISE, SEARCH],
    skills: ["Com", "Cre", "PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/letterpress.jpg",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session02-css-fonts.html#overview",
    duration: "60 minutes",
    content: "Learners will use webfonts to create moods and tones on webpages, learning about coding, composing, desinging, and remixing.",
    difficulty: "Intermediate"
  },
  {
    name: "Storytelling with Pictures",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, REVISE, SHARE],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/ice-cream.jpg",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session04-storytelling-with-pictures.html#overview",
    duration: "45 to 60 minutes",
    content: "Use HTML, CSS, and JavaScript to tell a simple story using three sequential pictures.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS Fonts Extension: Bridge to Infinity",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN, SYNTHESIZE],
    skills: ["Com", "Cre", "PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/bridge.jpg",
    href: "https://d157rqmxrxj6ey.cloudfront.net/chadsansing/22265/",
    duration: "30 minutes",
    content: "Jump right into this Thimble project to improve the fonts on this remixable movie poster, learning about coding, composing, and design.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS Decoration",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN, SYNTHESIZE],
    skills: ["Com", "Cre", "PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/decoration.jpg",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session05-css-decoration.html#overview",
    content: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about coding, composing, and designing.",
    difficulty: "Intermediate"
  },
  {
    name: "Web-o-tron & the Scrambled Divs",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN, EVALUATE, SYNTHESIZE],
    skills: ["PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/webotron-head.png",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session06-webotron-and-the-scrambled-divs.html#overview",
    content: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about coding, composing, desining, evaluating, and synthesizing.",
    difficulty: "Intermediate"
  },
  {
    name: "Creating a Storytelling Resource",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, SHARE, SYNTHESIZE, CONTRIBUTE, OPEN],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/cats.jpg",
    duration: "45 to 60 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session07-creating-a-storytelling-resource.html#overview",
    content: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to create storytelling prompts.",
    difficulty: "Intermediate"
  },
  {
    name: "Storytelling with Interactive Fiction",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, SYNTHESIZE],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/maze-head.png",
    duration: "45 to 60 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session08-storytelling-with-interactive-fiction.html#overview",
    content: "Learn how HTML, CSS, and JavaScript connect to one another by creating an interactive story that responds to user input.",
    difficulty: "Intermediate"
  },
  {
    name: "Buttons and Alerts",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, REVISE],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/buttons.jpg",
    duration: "45 to 60 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session01-buttons-and-alerts.html#overview",
    content: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to tell a simple story.",
    difficulty: "Intermediate"
  },
  {
    name: "Storytelling with Three Buttons",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX, REVISE],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/buttons2.jpg",
    duration: "30 to 45 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session02-three-buttons.html#overview",
    content: "Learn how to write multiple, short functions that each connect to a button on a webpage.",
    difficulty: "Intermediate"
  },
  {
    name: "Storytelling with User Input",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX],
    skills: ["Com", "Cre", "PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/remix.jpg",
    duration: "30 to 45 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session05-storytelling-with-user-input.html#overview",
    content: "Learn how to use HTML, CSS, and JavaScript to turn user input into a brand new story on a webpage.",
    difficulty: "Intermediate"
  },
  {
    name: "Simple Story Generator",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, CONTRIBUTE, REMIX, REVISE, SHARE],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/sandbucket.jpg",
    duration: "45 to 60 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session03-simple-story-generator.html#overview",
    content: "Learn how to use arrays and the document method to generate random stories and add them to a webpage.",
    difficulty: "Intermediate"
  },
  {
    name: "Storytelling with Color",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, REMIX],
    skills: ["Com", "Cre"],
    imgSrc1x: "/img/pages/intermediate-web-lit-two/colors.png",
    duration: "45 to 60 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session06-storytelling-with-color.html#overview",
    content: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to inspire storytelling in response to different colors.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS Word Pyramid",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN],
    skills: ["PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/blue-pyramid.png",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session01-css-word-pyramid.html#overview",
    content: "Learners will use CSS to change the size of text on an HTML webpage, learning about coding, composing, and designing.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS Building Blocks",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN],
    skills: ["PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/blocks.png",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session04-css-building-blocks.html#overview",
    content: "Learners will position and style boxes on a webpage using CSS while learning about coding, composing, and designing.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS Circles",
    topic: "Write",
    webLitSkills: [CODE, COMPOSE, DESIGN],
    skills: ["PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/circles.jpg",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session03-css-circles.html#overview",
    content: "Learners will search for webfonts to include in a webpage, matching the mood, purpose, tone and voice of the page while learning about coding, composing, and designing.",
    difficulty: "Intermediate"
  },
  {
    name: "CSS External Tutorials",
    topic: "Write",
    webLitSkills: [CODE, DESIGN, EVALUATE, SYNTHESIZE],
    skills: ["PS"],
    imgSrc1x: "/img/pages/intermediate-web-lit/flexbox-froggy.png",
    duration: "60 minutes",
    href: "https://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session07-external-css-tutorials.html#overview",
    content: "Learners will apply multi-part CSS selectors and flexbox positioning with external CSS tutorial games, learning about coding, designing, evaluating, and synthesizing.",
    difficulty: "Intermediate"
  },
  {
    name: "IP Tracer",
    topic: "Read",
    webLitSkills: [PROTECT, SEARCH],
    skills: ["PS"],
    imgSrc1x: "/img/pages/protect-your-data/img-iptracer.png",
    duration: "30 to 45 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session01-ip.html",
    content: "Learners will explore internet protocol (IP) addresses and learn how it may be associated with themselves, a device, or a website. They will trace IP addresses and make a map.",
    difficulty: "Beginner"
  },
  {
    name: "Understanding Security",
    topic: "Read",
    webLitSkills: [PROTECT],
    skills: ["PS"],
    imgSrc1x: "/img/pages/protect-your-data/img-password.png",
    duration: "30 to 45 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session01-password-collage.html",
    content: "Test the strength of passwords using tools called password meters. Learners will look at annual lists of the top 25 worst passwords, compiled from more than 3.3 million leaked passwords during each year and make a collage of what to avoid when creating a password.",
    difficulty: "Beginner"
  },
  {
    name: "Cookies and Third-Party Tracking",
    topic: "Read",
    webLitSkills: [PROTECT, OPEN],
    skills: ["PS", "Com"],
    imgSrc1x: "/img/pages/protect-your-data/img-cookies.png",
    duration: "45 to 60 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session02-lightbeam.html",
    content: "Using a free and open source tool called Mozilla Lightbeam, you can help visually show learners how cookies and third-party trackers are monitoring them as they perform their own everyday tasks on the web. Help learners manage and protect their data trail by having them race to see who can gather the most trackers on their team's Lightbeam graph.",
    difficulty: "Beginner"
  },
  {
    name: "Draw Secure Passwords",
    topic: "Read",
    webLitSkills: [PROTECT],
    skills: ["PS"],
    imgSrc1x: "/img/pages/protect-your-data/img-password.png",
    duration: "45 to 60 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session02-secure-passwords.html",
    content: "Learn about pass-phrases, pronounceable and random passwords using generators. You will find out what you can do to create better passwords, and explore different types of passwords to learn about their pros and cons.",
    difficulty: "Beginner"
  },
  {
    name: "Data Trail Timeline",
    topic: "Read",
    webLitSkills: [PROTECT, REMIX],
    skills: ["PS"],
    imgSrc1x: "/img/pages/protect-your-data/img-datatrail.png",
    duration: "45 to 60 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session03-datatrail.html",
    content: "Learners will create a timeline, video or slideshow remix to demonstrate how information gets collected by companies and other organizations throughout the course of a typical day.",
    difficulty: "Beginner"
  },
  {
    name: "Privacy Coach",
    topic: "Read",
    webLitSkills: [PROTECT, OPEN],
    skills: ["PS", "Com"],
    imgSrc1x: "/img/pages/protect-your-data/img-privacycoach.png",
    duration: "45 to 60 minutes",
    href: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session03-privacycoach.html",
    content: "Learners mentor their peers to enhance their privacy through their online or digital activities. Knowledge and expertise is shared through discussion or by remixing a response template to report on experiences.",
    difficulty: "Beginner"
  },
  {
    name: "Werewolf-in-the-Middle",
    topic: "Read",
    webLitSkills: [CONNECT, EVALUATE, PROTECT, SHARE],
    skills: ["PS", "Com", "Col"],
    imgSrc1x: "http://chadsansing.github.io/curriculum-testing/encryption/images/werewolf-1.png",
    duration: "45 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/encryption/werewolf-in-the-middle.html#overview",
    content: "Introduce the basics of surveillance and man-in-the-middle (MITM) attacks with this social activity adapted from the popular party game Werewolf.",
    difficulty: "Beginner"
  },
  {
    name: "Really Private Messaging",
    topic: "Read",
    webLitSkills: [CONNECT, EVALUATE, PROTECT],
    skills: ["PS", "Com", "Col", "Cre"],
    imgSrc1x: "https://c1.staticflickr.com/3/2824/13334048894_001d3e53d1.jpg",
    duration: "45 minutes",
    href: "http://chadsansing.github.io/curriculum-testing/encryption/really-private-messaging.html#overview",
    content: "Participants will learn the basic importance and mechanics of encryption, modeling public-private key encryption schemes with simple tools like paper and markers, crayons, or colored pencils, thereby learning how to collaborate, connect, evaluate encryption schemes, and secure their communications online.",
    difficulty: "Beginner"
  }
];
