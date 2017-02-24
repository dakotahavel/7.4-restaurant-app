var React = require('react');
var ReactDOM = require('react-dom')

var orderModel =  require('../models/order.js');
var orderCollection = new orderModel.OrderItemCollection();
var orderPending = new orderModel.OrderPendingCollection();

var OrderContainer = React.createClass({
  getInitialState: function() {
    var containerThis = this;
    orderCollection.fetch().done(function(){

      containerThis.setState({
        'orderCollection': orderCollection
        , 'orderPending': orderPending
      })
    })
    return {
      'orderCollection':orderCollection
      , 'orderPending': orderPending
    }
  }
  , render: function(){
    return(
      <ul className='well list-group'>
        <li className="list-group-item">
          <h3 className='order-header'>
            <span>Items</span> -------------- <span>Price</span>
            </h3></li>

        <li className="list-group-item">
          <OrderList
            orderCollection={this.state.orderCollection}
            orderPending={this.state.orderPending}
            ></OrderList></li>

        <li className="list-group-item">
          <OrderPrice orderPending={this.state.orderPending}>
          </OrderPrice></li>

      </ul>
    )
  }
});

var OrderList = React.createClass({
  render: function(){
    var self = this;
    // console.log(this.props.orderPending)
    console.log(this.props.orderPending.models)
    var pendingItems = this.props.orderPending.map(function(model){
      console.log(model.get(title))
      // console.log(this.props.orderPending.models)

      return <div key={model.cid}><span>{model.get('title')}</span><span>{model.get('price')}</span></div>
    })
    return(
      <div className="here">
      {pendingItems}
      </div>
    )
  }
})

var OrderPrice = React.createClass({

  render: function(){
    return(
      <div>Total: <span className="order-total"> Total Price</span></div>
    )
  }
})

module.exports = {
  'OrderContainer': OrderContainer
}
