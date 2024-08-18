import jwt from "jsonwebtoken";
const isLoggedIn = function (req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("Signed Cookies: ", req.signedCookies);
    console.log("token", token);
    const tokenDetails = jwt.verify(token, process.env.JWT_KEY);
    console.log("tokenDetails", tokenDetails);
    if (!tokenDetails || !token) {
      res.status(401).send("Request Unauthinticated");
    }
    req.user = tokenDetails;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send("jwt must be provided JWT verification failed");
  }
};

export default isLoggedIn;
