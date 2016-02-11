var React = require('react');
var Link = require('react-router').Link;
var EventDetail = require('./EventDetail.jsx');

module.exports = [
  {
    "head": "the basics",
    "content": (
      <div>
        <EventDetail head="Find a Venue">
          <div>
            Look for a comfortable, flexible space that's appropriate for the number of participants you expect. Contact local community spaces, museums, hackerspaces, coworking spaces, organizations, libraries, schools, or coffee shops to see if that have space available for events. Send them information on your event, the missions and what you hope to achieve and offer opportunities for their community to attend. Ensure there is reliable internet, enough power outlests and good lighting.
          </div>
        </EventDetail>
        <EventDetail head="Prepare Equipment">
          <div>
            Create a list of what equipment you need for your event. Check out the event space ahead of time to learn what additional items you might need to buy or bring. If learners need to supply their own equipment, like laptops, make sure this is communicated clearly ahead of time. Also reach out to your venue, mentors or other local organizations to see if they can lend equipment.
          </div>
        </EventDetail>
        <EventDetail head="Gather Materials">
          <div>
            Since we know there will be note-taking, brainstorming and making, you are going to need some materials. Have a sign-up sheet, name tags, post-it notes, pens and paper easily accessible. Prepare any other materials you will need ahead of time and set a table aside at the event where learners can grab materials as needed.
          </div>
        </EventDetail>
        <EventDetail head="Make Some Gear">
          <div>
            Use this <a href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyLogo.eps">logo</a> to create Maker Party t-shirts at your local print shop. Here's an example of what your <a href="https://stuff.webmaker.org/teach.mozilla.org/makerparty_tshirtpreview.jpg">shirts</a> could look like. Don't have all the budget for printing? Ask participants to bring their own shirts and create Maker Party t-shirts with <a href="https://tbx.makes.org/thimble/stencil-a-tshirt">this activity</a>. You can also print these <a href="https://makerparty2014.makes.org/thimble/LTEzNDM3NTAxNDQ=/maker-party-love-bomb">certificates</a> to give to the participants at the event that successfully complete the activities.
          </div>
        </EventDetail>
        <EventDetail head="All About The Wi-Fi">
          <div>
            Have you ever heard of an event with perfect Wi-Fi? Neither have we. Prepare for the worst and have a back-up plan in case you lose connection. There are also a lot of <a href="https://keyboardkat.makes.org/thimble/LTIxMDA3NTY0ODA=/lofi-nofi-teaching-kit">activities that require no Internet access</a>. Print out a few activities and keep them with you just in case.
          </div>
        </EventDetail>
      </div>
    )
  },
  {
    "head": "before event",
    "content": (
      <div>
        <EventDetail head="Recruit Mentors">
          <div>
            Whether they’re colleagues, students or a group of talented friends, you can find volunteer mentors by tapping into your own networks. Provide them a <a href="https://stuff.webmaker.org/teach.mozilla.org/Sample_Volunteer_Package.pdf">Sample Volunteer Package</a> with information on the event, activities, social media and any other necessary information in advance. Depending on how many volunteers you have, you might consider holding a meet-up in person or online prior to the event to answer any questions. Don't forget to gather and distribute contact information so that you can stay in touch with them in the days and weeks leading up to the event.
          </div>
        </EventDetail>
        <EventDetail head="Promote Your Event">
          <div>
            Start spreading the word - share the link to your event so people can plan to attend or share it with others. Local coffee shops, community places, listservs, mailing lists, social networks and forums are all great places to post details. Consider making a <a href="https://techkim.makes.org/thimble/maker-party-movie-poster">poster</a> with event information.
          </div>
        </EventDetail>
        <EventDetail head="Sign Up Learners">
          <div>
            Your event can be drop-in or require registration but make sure there is an effective way for individuals to indicate they are attending and can get access to event information. Having a rough idea of how many learners will attend will give you a better idea of how to prepare stations, materials and mentors.
          </div>
        </EventDetail>
        <EventDetail head="Schedule">
          <div>
            Plan your schedule ahead of time but be flexible; your participants might surprise you with interesting questions or challenges to explore. A checklist of things you will need for set-up/during/after is very useful. Don't forget to leave yourself adequate prep and clean-up time.
          </div>
        </EventDetail>
        <EventDetail head="Press">
          <div>
            Media coverage is an essential part of promoting an event and showing off what you accomplish. Use the <a href="https://wiki.mozilla.org/Maker_Party/Communications/Press_Kit">Maker Party Press Kit</a> for guidelines on how to reach out to local media (newspapers, blogs, local news shows). Our <a href="https://wiki.mozilla.org/Maker_Party/Communications/Social_Media_Guide">social media toolkit</a> will also help you get more out of your posts online. Be sure to use hashtag <a href="https://twitter.com/search?f=realtime&q=%23makerparty">#MakerParty</a>. If your event is open to the public you may also want to invite community leaders and officials to attend.
          </div>
        </EventDetail>
      </div>
    )
  },
  {
    "head": "during event",
    "content": (
      <div>
        <EventDetail head="Design a fun experience">
          <div>
            Your event should feel like a party! Create a welcoming, creative atmosphere that might include music, decorations and providing name tags. Starting your event with an offline activity or icebreaker such as a <a href="https://mozteach.makes.org/thimble/how-to-run-a-spectrogram-icebreaker">spectrogram</a> is a great way to get everyone socializing. Raffles and challenges are good ways to keep the crowd engaged throughout the day.
          </div>
        </EventDetail>
        <EventDetail head="Set-up">
          <div>
            When preparing for event, be sure to arrive early to set-up the space using this sample <a href="https://stuff.webmaker.org/teach.mozilla.org/Event_Set_Up_Checklist.pdf">event checklist</a>. This will allow you plenty of time in case unexpected issues arise. Use posters or other clear signage to indicate different activity stations. Make sure washrooms and exits are clearly marked. Remind facilitators to welcome newcomers, and make sure the volunteers know what their responsibilities are and who to ask if they have questions.
          </div>
        </EventDetail>
        <EventDetail head="Activities">
          <div>
            Find activity kits and tools online that encourage hands-on making, collaborating and participation from your attendees. Here are <Link to="/activities">some of ours</Link> to get you started.
          </div>
        </EventDetail>
        <EventDetail head="Documentation">
          <div>
            Time flies when you’re having fun! It's often impossible to capture or get links of all the awesome things being made. Appoint a volunteer to be the photographer and make sure that activities are well-documented and that photos/video can be shared online. Use the <a href="https://twitter.com/search?f=realtime&q=%23makerparty">#MakerParty</a> hashtag so we can see them too.
          </div>
        </EventDetail>
        <EventDetail head="Share-outs">
          <div>
            Set aside time for attendees to see each others' activities and exchange ideas. At the end of the event, bring everyone back together in a circle. Celebrate what participants made and invite a few people to share their work with the entire group.
          </div>
        </EventDetail>
        <EventDetail head="Wrap-up">
          <div>
            You’re done! Make sure to check the <a href="https://stuff.webmaker.org/teach.mozilla.org/Event_Take_Down_Checklist.pdf">event take down checklist</a> to make sure you’ve covered your bases. Do your best to make sure the space is in the same condition (if not better) than when you arrived.
          </div>
        </EventDetail>
      </div>
    )
  },
  {
    "head": "after event",
    "content": (
      <div>
        <EventDetail head="Feedback">
          <div>
            Ask participants for feedback. What did they learn? What did they enjoy? If they have suggestions for improvement, be sure to take notes or invite them to blog about it.  Provide links to websites where they can continue learning new skills. Later, conduct a debrief with participating organizations and volunteers, so your next event can be even better.
          </div>
        </EventDetail>
        <EventDetail head="Share what you learned">
          <div>
            Post pictures of your event on Twitter and Flickr using the hashtag <a href="https://twitter.com/search?f=realtime&q=%23makerparty">#MakerParty</a> or write a blog post using our <a href="https://stuff.webmaker.org/teach.mozilla.org/Sample_Blog_Post_Guidelines.pdf">sample guidelines</a> to share a deeper reflection.
          </div>
        </EventDetail>
        <EventDetail head="Thank you’s">
          <div>
            <a href="https://stuff.webmaker.org/teach.mozilla.org/Sample_Thank_You_Letters.pdf">Send a heartfelt</a> "Thank you!" to participating organizations, volunteers, facilitators, participants, partners, the venue and anyone else who helped make your event a success. Include photos, videos and links to the work that was created. Ask for feedback on the event and discuss next steps to getting involved, learning more or hosting a future event.
          </div>
        </EventDetail>
      </div>
    )
  }
];
