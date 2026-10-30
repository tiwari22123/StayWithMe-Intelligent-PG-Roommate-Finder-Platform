const express = require("express");

const {
  addRoommate,
  getAllRoommates,
  searchRoommateByCity,
  filterByBudget,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile
} = require("../controllers/roommateController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addRoommate);

router.get("/all", getAllRoommates);

router.get("/search", searchRoommateByCity);

router.get("/filter", filterByBudget);

router.get("/my-profile", protect, getMyProfile);

router.put("/my-profile", protect, updateMyProfile);

router.delete("/my-profile", protect, deleteMyProfile);

module.exports = router;