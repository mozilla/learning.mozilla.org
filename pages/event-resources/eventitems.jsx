var React = require('react');
var EventItem = require('./EventItem.jsx');

module.exports = [
  <EventItem participants="2-5" key="2-5"
    linkToGuide="https://michelle.makes.org/thimble/LTE2NjE1MzQyMDg=/how-to-host-a-maker-party-small"
    head="small event"
    subHead="Perfect for 2 to 5 participants"
    content="A fun way to spend an hour on a rainy day, hang out as a family, learn to hack with a friend, and make cool things on the web."
  />,
  <EventItem participants="5-50" key="5-60"
    linkToGuide="https://michelle.makes.org/thimble/LTE1Nzc2NDgxMjg=/how-to-host-a-maker-party-medium"
    head="medium event"
    subHead="Great for 5 to 50 participants"
    content="A fantastic way to team up people with different skill-sets to collaboratively build something new or improve something existing on the web, all while learning and teaching new skills."
  />,
  <EventItem participants="50+" key="50+"
    linkToGuide="https://michelle.makes.org/thimble/LTEzMDkyMTI2NzI=/how-to-host-a-maker-party-large"
    head="large event"
    subHead="For those ready for the adventure of 50+ participants"
    content="A rewarding way to bring together local organizations in a science fair setting to demonstrate cool web ideas, provide fun hands-on activities, and introduce your community to making and hacking."
  />
];
