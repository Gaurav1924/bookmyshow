import User from "../models/user.model.js";

const isAuthorised = (role) => {
  return async (req, res, next) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
      if (role.toUpperCase() == role.toUpperCase()) {
        next();
      } else {
        res
          .status(401)
          .send({ success: false, message: "Unauthorised access" });
      }
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };
};

export default isAuthorised;
