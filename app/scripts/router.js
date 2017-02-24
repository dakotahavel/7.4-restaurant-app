var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom')

var MenuContainer = require('./components/menu.jsx').MenuContainer
var OrderContainer = require('./components/order.jsx').OrderContainer

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  }
  , index: function(){
    ReactDOM.render(
      React.createElement(MenuContainer)
      , document.getElementById('menu')
    )
    , ReactDOM.render(
      React.createElement(OrderContainer)
      , document.getElementById('order')
    )
  }
})

var appRouter = new AppRouter();

module.exports = appRouter;
