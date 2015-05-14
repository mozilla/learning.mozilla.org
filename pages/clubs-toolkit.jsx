var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Illustration = require('../components/illustration.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var Expander = require('../components/expander.jsx');

var ToolkitIntro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Clubs Toolkit</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/clubs-toolkit/svg/icon-toolkit.svg"
          alt="icon toolkit"
          className="img-circle">
            <h2>Get ready to start your club! Here are some best practices and resources to help you grow your local group.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var Toolkit = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var ToolkitList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.children}
      </ul>
    );
  }
});

var ToolkitListItem = React.createClass({
  render: function() {
    var header = this.props.headerHref ? <a href={this.props.headerHref}>{this.props.header}</a> : this.props.header;

    return (
      <li>
        <p>
          <span className="italic">{header} </span>
          <span>{this.props.children}</span>
        </p>
      </li>
    );
  }
});

var ClubsToolkit = React.createClass({
  statics: {
    pageTitle: 'Clubs Toolkit',
    pageClassName: 'clubs-toolkit'
  },
  showAddYourClubModal: function() {},
  render: function () {
    return (
      <div className="inner-container">
        <ToolkitIntro/>
        <section className="toolkit-expanders">
          <Expander head="learn from peers">
            <Toolkit>
              <p>There are people all over the world who have done what you are doing. They have additional advice, tips and tricks that can help make your club go more smoothly.</p>
              <p>At at any time use,</p>
              <ToolkitList>
                <ToolkitListItem header="Discussion Forum." headerHref="http://discourse.webmaker.org/category/clubs">
                  Read what others have done and get your questions answered.
                </ToolkitListItem>
                <ToolkitListItem header="Twitter.">
                  Our community loves to tweet! Share ideas and send pictures to <a href="https://twitter.com/webmakerhttps://twitter.com/search?q=%23teachtheweb">@Webmaker</a> and use the tag <a href="https://twitter.com/search?q=%23teachtheweb">#TeachTheWeb</a>
                </ToolkitListItem>
                <ToolkitListItem header="Email.">
                  We’re always here to answer your questions and connect you to other clubs. Send an email to <a href="mailto:help@webmaker.org">help@webmaker.org</a>
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="find a team">
            <Toolkit>
              <p>Running a club with others can be fun and more sustainable. Recruit team members to join you. They can be peers, co-workers, family and more. We suggest having at least one follow co-organizer. There is no magic number of mentors, but a rough 1:7 mentor to  learner ratio ensures participants get personal attention.</p>
              <p>Need help finding mentors? Try one of these tips:</p>
              <ToolkitList>
                <ToolkitListItem header="Local schools.">
                  Approach nearby colleges, universities or schools and see if any students want to mentor. You might contact teachers in a relevant field directly, or leave signs on message boards.
                </ToolkitListItem>
                <ToolkitListItem header="Co-workers.">
                  Often times the people we work with are eager to assist and learn as well. Send out an email to your office asking if anyone is interested.
                </ToolkitListItem>
                <ToolkitListItem header="Local organizations.">
                  There might be an organization nearby that is looking for ways for their employees to get more involved in the community.
                </ToolkitListItem>
                <ToolkitListItem header="Learners.">
                  Ask those who are attending the club if they have a parent, relative or friend who is interested in mentoring. Or maybe they want to become mentors themselves!
                </ToolkitListItem>
                <ToolkitListItem header="Online.">
                  Put a call out for mentors on your website, local forums and social media. You never know where the message will land.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="train your team">
            <Toolkit>
              <p>Now that you have a team, give yourselves the tools you need to be successful. Start by sharing information about Mozilla and explain our mission of <Link to="web-literacy">increasing web literacy</Link> around the world.</p>
              <p>Here are some other tips:</p>
              <ToolkitList>
                <ToolkitListItem header="Meet in-person.">
                  Make sure you have a chance to meet with your team prior to the event.
                  Discuss the best curriculum to use on the day, what the schedule will look like and what parts of the learning will need the most support.
                  Each team member should know what is expected of them so they are poised to give their best effort.
                </ToolkitListItem>
                <ToolkitListItem header="Do the activities yourself first.">
                  Mentors should be aware of the curriculum being used and what they need to prepare ahead of time.
                  Have the team go through the activities together, and discuss any questions. Know who has which skills and make sure everyone is comfortable with the material.
                  You don’t have to know all the answers -- just be confident in helping your learners find out themselves!.
                </ToolkitListItem>
                <ToolkitListItem header="Practice being a facilitative teacher.">
                  Review what it means to <Link to="teach-like-mozilla">teach like Mozilla</Link>. We encourage learning through making, using participatory methods to teach, using open practices and much more.
                  This is an important step and part of the magic of being a club leader.
                </ToolkitListItem>
                <ToolkitListItem header="Join our discussion forum.">
                  Ask your mentors to sign up on our discussion forum, Discourse. Introduce yourselves and review advice from other mentors.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="recruit your learners">
            <Toolkit>
              <p>What’s a club with no learners? Now that you have a stellar team ready to teach, start recruiting individuals to attend your club.</p>
              <ToolkitList>
                <ToolkitListItem dheader="Create a sign-up page.">
                  Your club can be either drop-in or registration, but make sure there is an effective way for individuals to indicate attendance and get access to regular event info.
                   <a href="https://www.eventbrite.com/"> Eventbrite</a> or <a href="http://www.google.com/forms/about/">Google Forms</a> are good spots to gather information and follow up with potential attendees.
                  Having a rough idea of how many learners will attend will give you a better idea of how to prepare stations, materials and mentors.
                </ToolkitListItem>
                <ToolkitListItem header="Print Material.">
                  Don’t underestimate the power of a good old fashioned poster that tells the details of your club.
                  Make sure they stand out so they catch the attention of passer-by’s.
                  You can post them at bus stops, schools, local coffee shops, libraries, community centers and anywhere else that makes sense in your location.
                </ToolkitListItem>
                <ToolkitListItem header="Community boards and mailing lists.">
                  Find places where the local community is talking and sharing about upcoming opportunities.
                  These can even take the form of community groups on Twitter and Facebook. Ask members to help share the club within their networks.
                </ToolkitListItem>
                <ToolkitListItem header="Word of Mouth.">
                  Your friends and family are a powerful network. If they don’t know someone, they might know someone who knows someone.
                  Spread the word far and wide at the next event, function, office or place you go to.
                </ToolkitListItem>
                <ToolkitListItem header="Blog.">
                  Share your experience running a club on your blog, or even write a guest post on other relevant blogs. If you’re looking for somewhere to start, join the community at <a href="http://digitalis.nwp.org/">NWP Digital Is</a> where you can publish posts and connect to educators around the world.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="name and brand your club">
            <Toolkit>
              <p>Your club is yours to design. However if you like, here are some tips if you choose to use our branding, change the name or hack the materials.</p>
              <ToolkitList>
                <ToolkitListItem header="Naming.">
                  We love seeing Mozilla Clubs pop up, yet we also welcome adaptations of the name to better represent your community or language. Example club names include: Toronto Mozilla Club, Xavier School Web All-Stars, St. Patrick's Church Tech Squad or London Library Web Brigade. You can also embed your club in an existing program or brand.
                </ToolkitListItem>
                <ToolkitListItem header="Mozilla branding.">
                  The Mozilla brand helps identify your clubs as part of our global network and mission. Have a look at the <a href="https://www.mozilla.org/en-US/styleguide/identity/mozilla/branding/">Mozilla branding guidelines</a> if you’d like to use it.
                </ToolkitListItem>
                <ToolkitListItem header="Github.">
                  Our curriculum is <a href="http://mozilla.github.io/webmaker-curriculum/">available via Github</a>. You can <a href="https://guides.github.com/activities/forking/">fork</a> any of those pages and make them your own. Share your new pages with <a href="http://discourse.webmaker.org/">the community</a>, you never know who might find them helpful.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="spread the word">
            <Toolkit>
              <p>Tell the world what you and your club are doing! Here are ways to show off the hard work that’s put into teaching and learning the web.</p>
              <ToolkitList>
                <ToolkitListItem header="Social Media.">
                  Share your club activities online. You might even consider creating a new hashtag just for your club so the learners can keep track of all that happens in one place. Write a few sample tweets and posts that your mentors and learners can share on their networks as well. Be sure to share them with us too using <a href="https://twitter.com/search?q=%23teachtheweb">#teachtheweb</a> and <a href="https://twitter.com/webmaker">@Webmaker</a>.
                </ToolkitListItem>
                <ToolkitListItem header="Website.">
                  You might want to consider creating a site where learners can showcase what they make, while potential learners can get a feel for what happens. It can also serve as the place you share your blog, integrate your social media channels and post your print materials for others to print. <a href="https://wordpress.com/">Wordpress</a>, <a href="https://www.blogger.com/">Blogger</a> and <a href="https://www.tumblr.com/">Tumblr</a> are all easy and free places to start. Don’t forget to share the link on <a href="http://discourse.webmaker.org/category/clubs">our discussion forum</a>!
                </ToolkitListItem>
                <ToolkitListItem header="Local Media.">
                  Reach out to local media outlets and tell them what you’re doing. You can tweet or email media outlets, as well as their local reporters who write about similar topics. Remember, you need a good hook. Make it relative to your local club and environment, and tell them why what you’re doing matters in your community.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="write, remix, or find curriculum">
            <Toolkit>
              <p>Within our <a href="http://mozilla.github.io/webmaker-curriculum/">club curriculum</a> you will find activities developed by Mozilla and our communities to help guide you through your regular meetups. Here’s some of what we’ve learned from our early club leaders,</p>
              <ToolkitList>
                <ToolkitListItem header="Format.">
                  Clubs can come in the form of daily, weekly, bi-weekly, monthly or after school meetups. The time and place for your club meetings can vary, but the meetups should remain consistent so that the learning can be on-going and learners have time to grow and complete multiple activities.
                </ToolkitListItem>
                <ToolkitListItem header="Time.">
                  Time is the biggest variable when running a club activity. Though we’ve suggested time allocations per activity, be aware that depending on many factors this can often be too little or too much time. Age, web experience, number of mentors, internet connection and other factors can all impact how long each activity takes. Plan accordingly if you know you will need more time.
                </ToolkitListItem>
                <ToolkitListItem header="Age.">
                  There is no perfect answer for what age your average attendees should be. The majority of the curriculum was designed with youth ages 13-18 in mind, but can be adapted to all levels.. We’ve had many adults complete--and enjoy--these activities!
                </ToolkitListItem>
                <ToolkitListItem header="Participation.">
                  We’ve learned that the most effective way to learn new skills is through hands-on learning and making with one another. The activities were built with this in mind so if you add any additional activities, icebreakers or stations try to make sure that they keep learners actively involved.
                </ToolkitListItem>
                <ToolkitListItem header="Examples.">
                  Consider having an example project, activity or story on hand to help learners visualize what they are doing and better understand the task. This is often most recommended for a younger audience.
                </ToolkitListItem>
                <ToolkitListItem header="Adapt.">
                  Use your best judgement when following the activities; your unique situation will likely require you to adapt a little. For example, if learners are ask to complete four tasks but are running out of time, adjust the expectations so they only have to finish two tasks. Successful clubs have often used students who finish early as peer coaches and teachers. Find moments throughout the event for the team to evaluate how they might adjust activities to better suit the learners and increase the activities’ success.
                </ToolkitListItem>
                <ToolkitListItem header="Share-out.">
                  It’s fun to hear and see what others did during activities. Bring the group together to share what they did and reflect on the experience. This is an important part of the learning process. Try displaying the work on the walls so others can see (and leave positive comments with post-it notes!), or set up a few demo stations and ask learners to give constructive feedback.
                </ToolkitListItem>
                <ToolkitListItem header="Feedback, surveys and assessments.">
                  Have regular check-ins with your learners to see how they are progressing.. You might learn that you need to revisit certain material, recruit more mentors, adjust the difficulty levels of activities, or change the learning environment. We hear pen and paper is often the most effective method for quick feedback, although online forms or an informal discussion can work, too. It’s most important to ask for feedback immediately after completion of a task or session so that the experience is fresh for your learners.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
          <Expander head="fundraise for future events & activities">
            <Toolkit>
              <p>There is a lot of time and energy that goes into planning a club. We know that sometimes there can also be costs. Though we do not provide funding to our club organizers, we have suggestions on how to help minimize and eliminate the costs:</p>
              <ToolkitList>
                <ToolkitListItem header="Venue.">
                  If applicable, ask a venue to sponsor or provide the materials you need. They might have them easily accessible and on-site.
                </ToolkitListItem>
                <ToolkitListItem header="Local donations.">
                  Ask local organizations in the community to help donate or lend electronics, computers, equipment or materials. They might even offer to mentor a club session using their equipment.
                </ToolkitListItem>
                <ToolkitListItem header="Fundraise within the local community.">
                  Use your creativity to set up a donation box in a local space or even run your own online fundraising campaign <a href="https://www.indiegogo.com/projects/mozilla-festival-east-africa">like this one</a>.
                </ToolkitListItem>
                <ToolkitListItem header="Registration.">
                  Many jurisdictions require you to register if you solicit contributions from people or organizations in their borders for charitable or educational activities and raise more than a threshold amount; some jurisdictions require registration of clubs and associations in other circumstances as well. Check the rules applicable to you before proceeding.
                </ToolkitListItem>
                <ToolkitListItem header="More ideas!">
                  As always, there are a <a href="http://thenextweb.com/dd/2015/02/18/300-awesome-free-things-massive-list-free-resources-know/">variety of resources available online</a> that are easy and free to use. Be sure to search around and see what others, even the Mozilla community, has already shared.
                </ToolkitListItem>
              </ToolkitList>
            </Toolkit>
          </Expander>
        </section>
      </div>
    );
  }
});

module.exports = ClubsToolkit;
