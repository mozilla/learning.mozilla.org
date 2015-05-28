var should = require('should');

var loader = require('../../lib/google-blog-feed-loader');

var RAW_FEED = {
  "feedUrl": "https://blog.webmaker.org/tag/teachtheweb/feed",
  "title": "Mozilla Learning » #teachtheweb",
  "link": "https://blog.webmaker.org",
  "author": "",
  "description": "People, products and programs to teach, learn and make the Web",
  "type": "rss20",
  "entries": [
    {
      "title": "What’s next for Thimble?",
      "link": "https://blog.webmaker.org/whats-next-for-thimble",
      "author": "Hannah Kane",
      "publishedDate": "Tue, 12 May 2015 10:47:33 -0700",
      "contentSnippet": "Last week we announced that Thimble will soon be moving over to our new site for people who teach the web, teach.mozilla.org. ...",
      "content": "<p>Last week we <a href=\"https://blog.webmaker.org/whats-next-for-webmaker-tools\">announced</a> that Thimble will soon be moving over to our new site for people who teach the web, teach.mozilla.org. We also shared that Professor David Humphrey and a team of students from Seneca College have been working to make Thimble an even more powerful teaching, learning, and development tool.</p>\n<p>We wanted to follow up with more specifics about what you can expect from the new Thimble:</p>\n<ul>\n<li>Over the next few months, we’re focusing on <strong>making Thimble an even more useful tool, both for beginners and professionals</strong>. Thimble has always been well suited for new makers, and we are going to keep that focus. However, we’re also going to allow the user to turn on more powerful features as they learn new skills, and have Thimble grow to match their teaching and learning needs. Our goal is to make sure that Thimble can continue to serve users, no matter what level they are at in their web making experience.</li>\n<li>We’re also focusing on making Thimble <strong>a powerful tool for teaching others how to be creators</strong> <strong>of the Web</strong>. Imagine improved tutorials, error messages that serve as learning opportunities, and an environment that can be enhanced as you learn with more advanced extensions.</li>\n<li>We also want to <strong>improve the user experience and functionality</strong>. Though the roadmap is a work-in-progress, we’re already thinking about integration with Dropbox, collaborative editing, and improved image handling. The Selfie feature is an example:</li>\n</ul>\n<p><span style=\"text-align:center;display:block\"><iframe width=\"640\" height=\"390\" src=\"https://www.youtube.com/embed/t7V3h2x-5JU?version=3&amp;rel=1&amp;fs=1&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent\" frameborder=\"0\" allowFullScreen=\"true\"></iframe></span></p>\n<p><strong>How are we doing this? Thimble is going to integrate Brackets.<br>\n</strong><br>\n<a href=\"http://brackets.io/\">Brackets</a> is a lightweight, powerful, open source code editor for the Web. While it was originally designed to run on the desktop as a native application, the Seneca College team has been working to integrate Brackets into the Web and Thimble (code name “Bramble” for “Brackets in Thimble”). Soon you’ll see improvements like these:</p>\n<ul>\n<li>multiple-file support (for more complex web sites, apps with files and folders)</li>\n<li>smarter live preview, with highlighting, desktop and mobile modes, and more</li>\n<li>image preview on URL hover</li>\n<li>inline editors for JavaScript, CSS, and colors</li>\n<li>autocomplete for <b>everything</b></li>\n<li>auto-closing tags and strings</li>\n<li>real-time JavaScript analysis, with intellisense style suggestions</li>\n<li>extensions, and so much more</li>\n</ul>\n<p>In the meantime, you can:</p>\n<ul>\n<li>check out the work we’re doing on <a href=\"https://bramble.mofostaging.net\">https://bramble.mofostaging.net</a></li>\n<li>follow along, contribute, or report issues and ideas here: <a href=\"https://github.com/mozilla/thimble.webmaker.org/issues\">https://github.com/mozilla/thimble.webmaker.org/issues</a></li>\n<li>hang out with us in the #thimble channel on irc!</li>\n</ul>\n<p>p.s. If you’re interested in being a user tester for new Thimble features, please email hannah@mozillafoundation.org.</p>",
      "categories": [
        "Teaching",
        "Webmaking",
        "#teachtheweb",
        "brackets",
        "Thimble"
      ]
    },
    {
      "title": "What’s next for Webmaker tools",
      "link": "https://blog.webmaker.org/whats-next-for-webmaker-tools",
      "author": "Mozilla Webmaker",
      "publishedDate": "Mon, 04 May 2015 11:53:23 -0700",
      "contentSnippet": "Thanks to our devoted community, Webmaker has grown substantially over the years. And with growth often comes change. Our ...",
      "content": "",
      "categories": [
        "Teaching",
        "Updates",
        "Webmaking",
        "#teachtheweb"
      ]
    },
    {
      "title": "Understanding Web Literacy within the Web Journey",
      "link": "https://blog.webmaker.org/understanding-web-literacy-within-the-web-journey",
      "author": "Laura de Reynal",
      "publishedDate": "Tue, 21 Apr 2015 08:04:56 -0700",
      "contentSnippet": "Since 2012, pioneering educators and web activists have been reflecting and developing answers to the question, &#8220;What is ...",
      "content": "",
      "categories": [
        "Research",
        "Uncategorized",
        "#teachtheweb",
        "get involved",
        "Web Journey",
        "web literacy"
      ]
    },
    {
      "title": "Learning Through Making: The Best Kind of Education",
      "link": "https://blog.webmaker.org/learning-through-making-the-best-kind-of-education",
      "author": "Chris Lawrence",
      "publishedDate": "Thu, 16 Apr 2015 12:04:55 -0700",
      "contentSnippet": "Learning scientists and educational philosophers have long understood that when we learn with the combination of our hands and ...",
      "content": "",
      "categories": [
        "Mozilla",
        "Teaching",
        "#teachtheweb"
      ]
    }
  ]
};

describe('GoogleBlogFeedLoader', function() {
  it('should convert HTML content snippet to plain text', function() {
    loader.makeContentSnippet('<p>hello there</p>', 1000)
      .should.eql('hello there');
  });

  it('should limit word count of content snippet', function() {
    loader.makeContentSnippet('hello there human', 2)
      .should.eql('hello there\u2026');
  });

  it('should provide featured post metadata', function() {
    loader.formatBlogPosts(RAW_FEED).featuredPost.should.eql({
      author: 'Hannah Kane',
      link: 'https://blog.webmaker.org/whats-next-for-thimble',
      contentSnippet: 'Last week we announced that Thimble will soon be moving over to our new site for people who teach the web, teach.mozilla.org. We also shared that Professor David Humphrey and a team of students from Seneca College have been working to make Thimble an even more powerful teaching, learning, and development tool.\nWe wanted to follow up with more specifics about what you can expect from the new Thimble:\n\nOver the next\u2026',
      publishedDate: 'Tue, 12 May 2015 10:47:33 -0700',
      title: 'What’s next for Thimble?'
    });
  });

  it('should provide latest posts metadata', function() {
    loader.formatBlogPosts(RAW_FEED).latestPosts.should.eql([
      {
        link: 'https://blog.webmaker.org/whats-next-for-webmaker-tools',
        publishedDate: 'Mon, 04 May 2015 11:53:23 -0700',
        title: 'What’s next for Webmaker tools'
      },
      {
        link: 'https://blog.webmaker.org/understanding-web-literacy-within-the-web-journey',
        publishedDate: 'Tue, 21 Apr 2015 08:04:56 -0700',
        title: 'Understanding Web Literacy within the Web Journey'
      },
      {
        link: 'https://blog.webmaker.org/learning-through-making-the-best-kind-of-education',
        publishedDate: 'Thu, 16 Apr 2015 12:04:55 -0700',
        title: 'Learning Through Making: The Best Kind of Education'
      }
    ]);
  });
});
