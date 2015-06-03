var FAKE_POSTS = {
  "featuredPost": {
    "title": "What’s next for Thimble?",
    "author": "Hannah Kane",
    "publishedDate": "Tue, 12 May 2015 10:47:33 -0700",
    "contentSnippet": "Last week we announced that Thimble will soon be moving over to our new site for people who teach the web, teach.mozilla.org. We also shared that Professor David Humphrey and a team of students from Seneca College have been working to make Thimble an even more powerful teaching, learning, and development tool.\nWe wanted to follow up with more specifics about what you can expect from the new Thimble:\n\nOver the next...",
    "link": "https://blog.webmaker.org/whats-next-for-thimble"
  },
  "latestPosts": [
    {
      "title": "What’s next for Webmaker tools",
      "publishedDate": "Mon, 04 May 2015 11:53:23 -0700",
      "link": "https://blog.webmaker.org/whats-next-for-webmaker-tools"
    },
    {
      "title": "Understanding Web Literacy within the Web Journey",
      "publishedDate": "Tue, 21 Apr 2015 08:04:56 -0700",
      "link": "https://blog.webmaker.org/understanding-web-literacy-within-the-web-journey"
    },
    {
      "title": "Learning Through Making: The Best Kind of Education",
      "publishedDate": "Thu, 16 Apr 2015 12:04:55 -0700",
      "link": "https://blog.webmaker.org/learning-through-making-the-best-kind-of-education"
    }
  ]
};

module.exports = function(cb) {
  process.nextTick(cb.bind(null, FAKE_POSTS));
};
