// Step 2 is controlled by an "intent" field, which indicatess
// whether an applicant wants to start a new club, or integrate
// their existing club into the Mozilla program.
//
// We Use a dedicated form just for this choiceGrooup, with a
// form update listener so that changes to this field can be
// used to update the labels for all the fields in the "real"
// form, defined below.


var intent = {
  start: "Start a new club",
  integrate: "Integrate a Mozilla Club with your existing program"
};

intent.fields = {
  intent: {
    type: "choiceGroup",
    label: "Do you want to...",
    options: [intent.start, intent.integrate],
    validator: {
      error: "You need to fill in this part of the application."
    }
  }
};

module.exports = intent;
