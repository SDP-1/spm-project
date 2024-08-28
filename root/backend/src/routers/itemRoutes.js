const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

module.exports = (io) => {
  // Route to get all items
  router.get("/", async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Route to add a new item
  router.post("/", async (req, res) => {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });

    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);

      // Emit the new item to all connected clients
      io.emit("itemAdded", savedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};
