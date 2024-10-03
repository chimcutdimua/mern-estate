const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const updateUser = async (req, res, next) => {
  if (req.user.ID !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, saltRounds);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.ID,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser };
