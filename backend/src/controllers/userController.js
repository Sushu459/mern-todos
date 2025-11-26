const User = require("../models/User");

// GET /api/users/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/me
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, avatarUrl } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatarUrl: updatedUser.avatarUrl || "",
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/me/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword; // will be hashed by pre('save') hook
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMe,
  updateProfile,
  changePassword,
};
