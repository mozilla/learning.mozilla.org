var EventEmitter = require('events').EventEmitter;
var React = require('react');

var StubTeachAPI = require('./stub-teach-api.js');
var stubContext = require('./stub-context.jsx');
var TeachApiClientMixin = require('../../mixins/teach-api-client');

describe('TeachApiClientMixin', function() {
  var teachAPI, component;
  var MyComponent = React.createClass({
    mixins: [TeachApiClientMixin],
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
      return <div>{this.getTeachAPI().getUsername()}</div>;
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
    component = stubContext.render(MyComponent, {}, {
      teachAPI: teachAPI
    });
    component.getDOMNode().textContent.should.eql("foo");
  });

  it('should bind to events that call forceUpdate', function() {
    component = stubContext.render(MyComponent, {}, {
      teachAPI: teachAPI
    });
    teachAPI.getUsername.returns("bar");
    component.getDOMNode().textContent.should.not.eql("bar");
    teachAPI.emit('username:change');
    component.getDOMNode().textContent.should.eql("bar");
  });

  it('should bind to events that call methods', function() {
    component = stubContext.render(MyComponent, {}, {
      teachAPI: teachAPI
    });
    component.state.blah.should.equal(0);
    teachAPI.emit('blah');
    component.state.blah.should.equal(1);
  });

  it('should unbind event listeners when unmounting', function() {
    component = stubContext.render(MyComponent, {}, {
      teachAPI: teachAPI
    });
    EventEmitter.listenerCount(teachAPI, 'username:change').should.equal(1);

    stubContext.unmount(component);
    component = null;

    EventEmitter.listenerCount(teachAPI, 'username:change').should.equal(0);
  });

});
