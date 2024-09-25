const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const Item = require("./Item");

Restaurant.hasOne(Menu);
Menu.belongsTo(Restaurant);

Menu.hasMany(Item);
Item.belongsTo(Menu);

module.exports = {
  Restaurant,
  Menu,
  Item,
};
