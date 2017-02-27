var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom')

// var MenuContainer = require('./components/menu.jsx').MenuContainer
// var OrderContainer = require('./components/order.jsx').OrderContainer
var MainContainer = require('./components/main.jsx').MainContainer


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  }
  , index: function(){
    ReactDOM.render(
      React.createElement(MainContainer)
      , document.getElementById('app')
    )
  }
})

var appRouter = new AppRouter();

module.exports = appRouter;
