const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

// /api/users/me
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);

// /api/users/me/change-password
router.put("/me/change-password", protect, changePassword);

module.exports = router;
