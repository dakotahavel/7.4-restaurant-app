var Backbone = require('backbone');

var OrderItem = Backbone.Model.extend({
  idAttribute: "_id"
  , defaults: {
    title: 'item'
    , description: 'item description'
    , price: '$ price'
    // , timestamp: new Date()
    // , pending: false
    // , complete: false
    // , type: 'order item type'
  }
});

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItem
  , url: 'http://tiny-lasagna-server.herokuapp.com/collections/dakotaorders'


})

var OrderPendingCollection = Backbone.Collection.extend({
  model: OrderItem
})

module.exports = {
  'OrderItem': OrderItem
  , 'OrderItemCollection': OrderItemCollection
  , 'OrderPendingCollection': OrderPendingCollection
}
