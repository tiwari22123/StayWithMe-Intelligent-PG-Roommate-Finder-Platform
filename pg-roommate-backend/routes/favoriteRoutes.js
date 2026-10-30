const express = require("express");

const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require("../controllers/favoriteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Add favorite
router.post("/add", protect, addFavorite);


// Get all favorites
router.get("/all", protect, getFavorites);


// Remove favorite
router.delete("/remove/:pgId", protect, removeFavorite);


module.exports = router;