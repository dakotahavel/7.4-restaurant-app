var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  idAttribute: "_id"
  , defaults: {
    title: 'item'
    , description: 'item description'
    , price: '$ price'
    , pending: false
    , complete: false
    , count: 0
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
