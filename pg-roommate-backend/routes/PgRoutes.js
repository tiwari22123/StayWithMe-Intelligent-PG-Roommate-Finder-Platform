const express = require("express");

const {
  addPg,
  getAllPgs,
  searchPgByCity,
  filterByRent
} = require("../controllers/pgController");
const protect =require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect,addPg);

router.get("/all", getAllPgs);

router.get("/search", searchPgByCity);

router.get("/filter", filterByRent);

module.exports = router;