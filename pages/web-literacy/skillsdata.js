var search = "Search";
var navigate = "Navigate";
var synthesize = "Synthesize";
var evaluate = "Evaluate";
var design = "Design";
var compose = "Compose";
var code = "Code";
var revise = "Revise";
var remix = "Remix";
var share = "Share";
var contribute = "Contribute";
var connect = "Connect";
var protect = "Protect";
var open = "Open Practice";

module.exports = [
  {
    name: "Problem-Solving",
    content: "Using research, analysis, rapid prototyping, and feedback to formulate a problem and develop, test, and refine the solution/plan.",
    imgSrc1x: "/img/pages/web-literacy/21cskills/21c-skill-icon_problem-solving.svg",
    competencies: [
      "Identifying and defining a specific problem, challenge, or questions to investigate based on sound research and relevant data.",
      "Generating relevant questions based on observations.",
      "Conducting independent research to develop hypothesis and research plan to solve the problem."
    ],
    topics: {
      "Read": [search, navigate, synthesize, evaluate],
      "Write": [design, compose, code, revise, remix],
      "Participate": [share, contribute, connect, protect, open]
    }
  },
  {
    name: "Creativity",
    content: "Generating, connecting, synthesizing, transforming, and refining ideas.",
    imgSrc1x: "/img/pages/web-literacy/21cskills/21c-skill-icon_creativity.svg",
    competencies: [
      "Utilizing idea-generating techniques to develop or revise original ideas.",
      "Synthesizing various information to transform ideas into new forms.",
      "Drawing connections between ideas using a variety of organizational techniques, such as categorization, prioritization, or classification.",
      "Comparing one’s ideas with others to identify similarities and differences.",
      "Seeking out and using feedback and critique to revise products and ideas.",
      "Articulating ideas clearly and appropriately.",
      "Incorporating new approaches that may be untested and potentially risky."
    ],
    topics: {
      "Write": [design, revise, remix],
      "Participate": [share, contribute, open]
    }
  },
  {
    name: "Communication",
    content: "Understanding and presenting verbal and nonverbal messages effectively.",
    imgSrc1x: "/img/pages/web-literacy/21cskills/21c-skill-icon_communication.svg",
    competencies: [
      {
        name: "placeholder 1",
        content: [
          "Organizing presentation of ideas to appropriately inform and engage others.",
          "Choosing effective modes and methods of presentation to most effectively convey ideas.",
          "Evaluating one’s own interpretation and seeks data and evidence to enhance understanding of others.",
          "Discerning credible and relevant sources to bolster meaning and enhance understanding.",
          "Analyzing messages from others for implicit or explicit meaning to inform one’s own approach.",
          "Evaluating and adjusting one’s own level of active engagement and degree of participation in group settings.",
          "Seeking guidance to refine technique/approach to enhance effectiveness."
        ]
      },
      {
        name: "placeholder 2",
        content: [
          "Initiating opportunities to communicate, interact, and work positively with individuals and groups.",
          "Using appropriate tone, clarity, and styles of interacting with individuals and groups.",
          "Building upon or synthesizing the contributions of others in a way that facilitates contributions by others.",
          "Offering alternative solutions that build on the ideas of others where appropriate.",
          "Writing with appropriate clarity, grammar and punctuation, and necessary information."
        ]
      }
    ],
    topics: {
      "Read": [synthesize],
      "Write": [compose, remix],
      "Participate": [share, contribute, connect, open]
    }
  },
  {
    name: "Collaboration",
    content: "Interacting and working appropriately with diverse audiences and teams; demonstrating active listening, interacting and contributing constructively in group discussions and meetings; using appropriate technology tools for working together including resolving conflicts on group projects; and sharing responsibility for group work and valuing individual contributions.",
    imgSrc1x: "/img/pages/web-literacy/21cskills/21c-skill-icon_collaboration.svg",
    competencies: [
      {
        name: "Audience & Cultural Awareness",
        content: [
          "Engaging in behaviors and actions that show an awareness of and sensitivity to stereotyping and cultural bias.",
          "Using language that is appropriate to the purpose of the interaction and audience.",
          "Differentiating between appropriate and inappropriate behavior and actions to the purpose of the interaction and audience."
        ]
      },
      {
        name: "Conflict Resolution",
        content: [
          "Redirecting focus toward common ground and the task at hand.",
          "Engaging with conflict in a way that strengthens overall coherence.",
          "Negotiating shared understandings during conflict."
        ]
      },
      {
        name: "Use of Collaboration Technology",
        content: [
          "Participating in selection and utilization of technology tools  that enhance group productivity.",
          "Following norms and conventions of communicating in online forums."
        ]
      },
      {
        name: "Responsibility & Productivity",
        content: [
          "Preparing for obligations by reading, researching, and completing actions on time.",
          "Submitting high-quality work products that meet goals.",
          "Prioritizing and monitoring individual and team progress toward goals and making adjustments as needed.",
          "Engaging in self-critique and self-reflection on strengths and areas of need.",
          "Demonstrating ways that collaboration can lead to better productivity."
        ]
      }
    ],
    topics: {
      "Participate": [share, contribute, connect, open]
    }
  }
];
