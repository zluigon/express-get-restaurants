const express = require("express");
const app = express();
const restaurantRoutes = require("../routes/restaurants");

app.use(express.json());
app.use(express.urlencoded());

app.use("/restaurants", restaurantRoutes);

// routes moved to dedicated route handler

// //TODO: Create your GET Request Route Below:
// // get all
// app.get("/restaurants", async (req, res) => {
//   const allRestaurants = await Restaurant.findAll();
//   res.json(allRestaurants);
// });

// // get by ID
// app.get("/restaurants/:id", async (req, res) => {
//   const foundRestaurant = await Restaurant.findByPk(req.params.id);
//   res.json(foundRestaurant);
// });

// // create
// app.post("/restaurants", async (req, res) => {
//   const newRestaurant = await Restaurant.create(req.body);
//   res.json(newRestaurant);
// });

// // update
// app.put("/restaurants/:id", async (req, res) => {
//   const currRestaurant = await Restaurant.findByPk(req.params.id);
//   const updatedRestaurant = await currRestaurant.update(req.body);
//   res.json(updatedRestaurant);
// });

// // delete
// app.delete("/restaurants/:id", async (req, res) => {
//   const currRestaurant = await Restaurant.findByPk(req.params.id);
//   const deletedRestaurant = await currRestaurant.destroy();
//   res.json(deletedRestaurant);
// });

module.exports = app;
