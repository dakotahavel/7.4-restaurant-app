var React = require('react');
var ReactDOM = require('react-dom')

var menuModel =  require('../models/menu.js');
var menuCollection = new menuModel.MenuItemCollection();

var orderModel =  require('../models/order.js');
var orderCollection = new orderModel.OrderItemCollection();
var orderPending = new orderModel.OrderPendingCollection();

// console.log(orderCollection.url)
var MenuContainer = React.createClass({

  getInitialState: function() {
    var containerThis = this;
    orderCollection.fetch().done(function(){
      containerThis.setState({
        'orderCollection': orderCollection
      })
    })
    return {
      'orderCollection':orderCollection
      , 'menuCollection': menuCollection
    }
  }

  , componentWillMount: function(){
    menuCollection.add([
      {title: '#1', description:'number 1 combo best Thai food you get', price: 7.50}
      , {title: '#2', description:'ok no like number 1 it ok number 2 good', price: 8.30}
      , {title: '#3', description:"you don't like thai food but your friends dragged you here", price: 9.20}
      , {title: '#4', description:'the first three are better really why you come here?', price: 7.90}
    ])
  }
  , addOrder: function(model){
    model.set('count', model.get('count') + 1)
    this.state.orderCollection.add(model)
    console.log(model.get('count'))
    // model.set('pending',true)
    console.log('this',orderCollection)
    // console.log(orderCollection)
    // order collection already has the model in it?
    // orderCollection.save()
    // console.log(orderPending)

  }
  , render: function(){
    return(
      <div>
        <MenuList menuCollection={this.state.menuCollection.models}
           orderCollection={this.state.orderCollection}
           addOrder={this.addOrder}>
        </MenuList>
      </div>

    )
  }
});

var MenuList = React.createClass({
  handleClick: function(model, event){
    this.props.addOrder(model)
  }
  , render: function(){
    var self = this;
    var menuItems = this.props.menuCollection.map(function(model){
      return(
        <li key={model.cid} onClick={self.handleClick.bind(self, model)} className="well list-group-item">
            <div><span className='menu-title'>{model.get('title')}</span><span className="menu-price float-right">${model.get('price')}</span></div>
            <div className='menu-description'><span>{model.get('description')}</span></div>
        </li>
      )
    })

    return(
      <ul className="list-group">
        {menuItems}
      </ul>
    )
  }
});

module.exports = {
  'MenuContainer': MenuContainer
  , 'MenuList': MenuList
}
