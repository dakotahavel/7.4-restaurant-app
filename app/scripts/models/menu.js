var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  idAttribute: "_id"
  , defaults: {
    title: 'item'
    , description: 'item description'
    , price: '$ price'
    , count: 0
    , timestamp: new Date()
    // , type: 'item type'
  }
});

var MenuItemCollection = Backbone.Collection.extend({
  model: MenuItem
  // , url: 'https://tiny-lasagna-server.herokuapp.com/collections/dakotamenu'

})

module.exports = {
  'MenuItem': MenuItem
  , 'MenuItemCollection': MenuItemCollection
}
