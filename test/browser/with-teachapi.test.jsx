var EventEmitter = require('events').EventEmitter;
var React = require('react');
var ReactDOM = require('react-dom');

var StubTeachAPI = require('./stub-teach-api.js');
var stubContext = require('./stub-context.jsx');

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

describe('withTeachApi', function() {
  var teachAPI, component;
  var MyComponent = React.createClass({
    statics: {
      teachAPIEvents: {
        'blah': 'handleBlah',
        'username:change': 'forceUpdate'
      }
    },
    getInitialState: function() {
      return {blah: 0};
    },
    handleBlah: function() {
      this.setState({blah: this.state.blah + 1});
    },
    render: function() {
      return <div refs="content">{this.props.teachAPI.getUsername()}</div>;
    }
  });

  beforeEach(function() {
    teachAPI = new StubTeachAPI();
  });

  afterEach(function() {
    if (component) {
      stubContext.unmount(component);
    }
  });

  it('should provide access to Teach API', function() {
    teachAPI.getUsername.returns("foo");
    var withTeach = stubContext.render(withTeachAPI(MyComponent), {
      teachAPI: teachAPI
    });
    component = withTeach.getComponent();
    ReactDOM.findDOMNode(component).textContent.should.eql("foo");
  });

  it('should bind to events that call forceUpdate', function() {
    component = stubContext.render(withTeachAPI(MyComponent), {
      teachAPI: teachAPI
    });
    teachAPI.getUsername.returns("bar");
    ReactDOM.findDOMNode(component).textContent.should.not.eql("bar");
    teachAPI.emit('username:change');
    ReactDOM.findDOMNode(component).textContent.should.eql("bar");
  });

  it('should bind to events that call methods', function() {
    var withTeach = stubContext.render(withTeachAPI(MyComponent), {
      teachAPI: teachAPI
    });
    component = withTeach.getComponent();
    component.state.blah.should.equal(0);
    teachAPI.emit('blah');
    component.state.blah.should.equal(1);
  });

  it('should unbind event listeners when unmounting', function() {
    component = stubContext.render(withTeachAPI(MyComponent), {
      teachAPI: teachAPI
    });
    EventEmitter.listenerCount(teachAPI, 'username:change').should.equal(1);

    stubContext.unmount(component);
    component = null;

    EventEmitter.listenerCount(teachAPI, 'username:change').should.equal(0);
  });

});
