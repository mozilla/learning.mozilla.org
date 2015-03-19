require('shelljs/global');
var inquirer = require('inquirer');

inquirer.prompt([{
  name: 'name',
  message: 'What is your new component\'s name?',
  validate: function (input) {
    if (!input) {
      return 'You need to name your component!';
    } else if (input.match(/[^a-z\-]/)) {
      return 'Components need to be named with hyphen-case!';
    } else {
      return true;
    }
  }
}], function(answers) {
  var componentName = answers.name;
  var testPath = 'components/' + componentName + '/tests';

  // Create directories
  mkdir('-p', testPath);

  // Scaffold primary component
  'var React = require(\'react\');\n\n'.to('components/' + componentName + '/' + componentName + '.jsx');

  // Scaffold component test files
  ''.to(testPath + '/' + componentName + '-browser-test.jsx');
  ''.to(testPath + '/' + componentName + '-node-test.jsx');
  ''.to(testPath + '/' + componentName + '-manual-test.jsx');

  console.log('Component "' + componentName + '" created!');
});
