const express = require("express");
const router = express.Router();
const FoodModel = require("../models/Food");

router.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
    res.send("Successfully saved food to database");
  } catch (err) {
    console.log(err);
  }
});
router.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
router.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});
module.exports = router;
