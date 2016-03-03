var categories = require('./categories');

var PS = categories.PS;
var Com = categories.Com;
var Cre = categories.Cre;
var Col = categories.Col;

var weblitdata = {
	"WEB LITERACY" : {
    "Write": {
      "Design": [PS,Com,Cre],
      "Code": [PS,Cre],
      "Compose": [PS,Com],
      "Revise": [PS,Cre],
      "Remix": [PS,Cre,Com]
    },
    "Read": {
      "Evaluate": [PS],
      "Synthesize": [PS,Cre],
      "Navigate": [PS],
      "Search": [PS]
    },
    "Participate": {
      "Connect": [PS,Cre,Col],
      "Protect": [PS,Com],
      "Open Practice": [Com,Col],
      "Contribute": [PS,Cre,Col],
      "Share": [Com,Col]
    }
	}
};

module.exports = weblitdata;
