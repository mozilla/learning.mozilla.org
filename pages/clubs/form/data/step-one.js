var Select = require('react-select');
var LocationSelector = require('../../../../components/LocationSelector.jsx');

module.exports = {
  'full_name': {
    type: "text",
    label: "Name",
    placeholder: "Your full name",
    validator: {
      error: "You must provide a name for your club."
    }
  },
  location: {
    type: LocationSelector,
    label: "Location",
    placeholder: "City, Country",
    validator: {
      error: "You must provide a location for your club."
    }
  },
  occupation: {
    type: "text",
    label: "Occupation",
    placeholder: "Student or professional at ...",
    validator: {
      error: "Please let us know what your occupation is."
    }
  },
  regionalCoordinator: {
    type: "choiceGroup",
    label: "Are you currently working with a Regional Coordinator?",
    options: [ "Yes", "No" ],
    validator: {
      error: "You must say whether or not you're working with a regional coordinator."
    }
  },
  coordinatorName: {
    type: "text",
    label: "What is your Regional Coordinator's name?",
    placeholder: "Name",
    controller: {
      name: "regionalCoordinator",
      value: "Yes"
    },
    // this field does not count towards total form completion
    metered: false,
    validator: {
      error: "If you work with a Regional Coordinator, you must indicate who they are."
    }
  },
  hostReason: {
    type: "textarea",
    label: "Why do you want to host a Mozilla Club?",
    placeholder: "Describe what you want to achieve and what your goals are. Minimum length 50 words.",
    validator: [
      {
        error: "You must explain the reason for applying."
      },
      {
        validate: function(value) {
          if (!value) {
            return false;
          }

          var count = value.trim().split(' ').length;

          return count < 45;
        },
        error: "Please explain the reason for applying using 45 words or more."
      }
    ]
  },
  howDidYouHear: {
    type: Select,
    label: "How did you hear about Mozilla Clubs?",
    options: [
      { value: 'from a friend', label: 'from a friend' },
      { value: 'from an event', label: 'from an event' },
      { value: 'Mozilla website', label: 'Mozilla website' },
      { value: 'Social media', label: 'Social media' },
      { value: 'other', label: 'other' }
    ],
    validator: {
      error: "Please tell us how you heard about this program."
    }
  },
  howDidYouHearOther: {
    type: "text",
    placeholder: "Let us know how you heard about becoming a club captain",
    controller: {
      name: "howDidYouHear",
      value: "other"
    },
    // this field does not count towards total form completion
    metered: false,
    validator: {
      error: "Please explain how you heard about Mozilla clubs."
    }
  }
};
