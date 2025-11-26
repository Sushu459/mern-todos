const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const router = express.Router();

// All routes below require authentication
router.use(protect);

// GET /api/users/me
// PUT /api/users/me
router
  .route("/me")
  .get(getMe)
  .put(updateProfile);

// PUT /api/users/me/change-password
router.put("/me/change-password", changePassword);

module.exports = router;
