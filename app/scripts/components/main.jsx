var React = require('react');
var ReactDOM = require('react-dom')

var menuModel =  require('../models/menu.js');
var menuCollection = new menuModel.MenuItemCollection();
var orderModel =  require('../models/order.js');
var orderedCollection = new orderModel.OrderItemCollection();
var orderPendingCollection = new orderModel.OrderPendingCollection();


var MainContainer = React.createClass({
  getInitialState: function() {
    return {
      'menuCollection': menuCollection
      , 'orderPendingCollection': orderPendingCollection
      , 'orderedCollection': orderedCollection
    }
  }

  , componentWillMount: function(){
    menuCollection.add([
      {title: '#1 Combo: Chinatown '
        , description:"Lo mein noodles with mild Chinese sauce, choice of chicken, pork, beef or tofu. Sweet & Sour, choice of chicken, beef, pork or tofu. Thai white jasmine rice, 2 potstickers and one butterfly."
        , price: 7.50}
      , {title: '#2 Combo: Korean Village'
        , description: "Yakisoba noodles with mild Korean sauce, choice of chicken, beef, pork or tofu. Teriyaki with mildly spicy sauce, choice of chicken, beef, pork or tofu. Thai white jasmine rice, 2 potstickers and one butterfly. Thai white jasmine rice, 2 potstickers and one butterfly."
        , price: 8.30}
      , {title: '#3 Combo: Osaka City'
        , description:" Egg noodles with mild Japanese sauce, choice of chicken, beef, pork or tofu. Tangy sesame mustard sauce, choice of chicken, beef, pork or tofu. Thai white jasmine rice, 2 potstickers and one butterfly."
        , price: 9.20}
      , {title: '#4 Combo: Night in Bangkok'
        , description:"Phad Thai rice noodles, choice of chicken, beef, pork or tofu.Red Curry mildly spicy with choice of chicken, tofu or mixed vegetables. Thai white jasmine rice, 2 potstickers and one butterfly."
        , price: 7.90}
      , {title: 'Guay Tiew Tom Yam'
        , description:"The Famous Hot & sour Thai noodle soup with rice noodles, toasted garlic, baby bok choy, green onions, cilantro & ground peanuts. Choice of chicken, beef, pork, (with prawns add $2.00)"
        , price: 8.95}
      , {title: 'Goong Ob Katiem'
        , description: "Prawns, glass noodles, mushrooms, carrots, onions, snow peas, zucchini and broccoli sautéed in a fresh garlic sweet chili sauce. Very tasty seafood dish!"
        , price: 12.35}
    ])
  }

  , render: function(){
    return(
    <div className="container">
      <div id="menu" className="col-md-8">
        <MenuList
          menuCollection={this.state.menuCollection.models}
          addPending={this.addPending}
        ></MenuList>
      </div>
      <div id="order" className="col-md-4">
        <PendingContainer
          pendingCollection={this.state.orderPendingCollection.models}
          addOrder={this.addOrder}
          ></PendingContainer>
      </div>
    </div>
    )
  }
  , addPending: function(model){
    this.state.orderPendingCollection.push(model)
    model.set('count', model.get('count')+1)
    this.setState({orderPendingCollection : orderPendingCollection})
  }
  , addOrder: function(){
    // console.log(this.state.orderPendingCollection)
    // var order = this.state.order
    // this.setState({orderedCollection: orderedPendingCollection})
    orderedCollection.create([new Date().getTime(), this.state.orderPendingCollection]);
    this.setState({orderPendingCollection: ''})
    alert('Order Submitted, Thank You!')
    location.reload()
  }
})

var MenuList = React.createClass({
  handleClick: function(model, event){
    this.props.addPending(model)
  }
  , render: function(){
    var self = this;
    var menuItems = this.props.menuCollection.map(function(model){
      return(
        <li key={model.cid} onClick={self.handleClick.bind(self, model)} className="well list-group-item">
            <div>
              <span className='menu-title'>{model.get('title')}</span>
              <span className="menu-price float-right">${(model.get('price')).toFixed(2)}</span>
            </div>
            <div className='menu-description'>
              <span>{model.get('description')}</span>
              </div>
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

var PendingContainer = React.createClass({
  render: function(){
    return(
      <ul className='list-group'>

        <li className="list-group-item">
          <h3 className='pending-header'>
            <span>Items</span><span className="float-right">Price</span>
          </h3>
        </li>

        <li className="pending-list list-group-item">
          <PendingList
            pendingCollection={this.props.pendingCollection}
          ></PendingList>
        </li>

        <li className="pending-price list-group-item">
          <PendingPrice
            pendingCollection={this.props.pendingCollection}
            addOrder={this.props.addOrder}
          ></PendingPrice>
        </li>


      </ul>
    )
  }
});

var PendingList = React.createClass({
  render: function(){
    var self = this;
    var pendingItems = this.props.pendingCollection.map(function(model){
      return(
        <div className="pending-items" key={model.cid}>
          <span className="pending-price float-right">${(model.get('price')).toFixed(2)}</span>
          <div>
            <span className="pending-count">Qty:{model.get('count')}&nbsp;&nbsp;&nbsp;</span>
            <span className="pending-title">{model.get('title')}</span>
          </div>
        </div>
      )
    })
    return(
      <div className="here">
        {pendingItems}
      </div>
    )
  }
})

var PendingPrice = React.createClass({
  handleOrder: function(){
    // console.log(this.props.pendingCollection)
    this.props.addOrder()
  }
  , render: function(){
    var self = this;
    var total = 0;
    var pendingPrice = this.props.pendingCollection.forEach(function(model){
        total = total + (model.get('count') * model.get('price'))
    })
    return(
        <div>
          <button onClick={self.handleOrder} className="btn btn-success btn-xs">Submit Order</button>
          <span className="float-right">Total: ${total.toFixed(2)}</span>
        </div>
    )
  }
})


module.exports = {
  'MainContainer': MainContainer
}
