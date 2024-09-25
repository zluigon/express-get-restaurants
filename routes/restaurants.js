const express = require("express");
const router = express.Router();
const { Restaurant, Menu, Item } = require("../models/.");
const { check, validationResult } = require("express-validator");

// get
router.get("/", async (req, res, next) => {
  try {
    const allRestaurants = await Restaurant.findAll({
      include: [
        {
          model: Menu,
          include: [
            {
              model: Item,
            },
          ],
        },
      ],
    });
    res.json(allRestaurants);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// get by id
router.get("/:id", async (req, res, next) => {
  try {
    const foundRestaurant = await Restaurant.findByPk(req.params.id);
    res.json(foundRestaurant);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// create
router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("name").trim().isLength({min: 10, max: 30}),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const newRestaurant = await Restaurant.create(req.body);
        res.json(newRestaurant);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      next(error);
    }
  }
);

// update
router.put("/:id", async (req, res, next) => {
  try {
    const currRestaurant = await Restaurant.findByPk(req.params.id);
    const updatedRestaurant = await currRestaurant.update(req.body);
    res.json(updatedRestaurant);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

// delete
router.delete("/:id", async (req, res, next) => {
  try {
    const currRestaurant = await Restaurant.findByPk(req.params.id);
    const deletedRestaurant = await currRestaurant.destroy();
    res.json(deletedRestaurant);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    next(error);
  }
});

module.exports = router;
