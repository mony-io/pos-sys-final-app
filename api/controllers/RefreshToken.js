const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = await req.cookies.refreshToken;
    // console.log(refreshToken);
    if (!refreshToken) return res.sendStatus(401);

    const [user] = await UserModel.findByRefreshToken(refreshToken);
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userid = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userid, username, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.send({ access_token: accessToken });
      }
    );
  } catch (error) {
    //next(error);
  }
};
