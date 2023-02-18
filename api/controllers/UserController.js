const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.create = async (req, res, next) => {
  try {
    const [username] = await Users.findByUsername(req.body.username);
    if (username.length !== 0) {
      return res.send({ message: "Username already exist.", success: false });
    }
    if (req.body.email !== "") {
      const [email] = await Users.findByEmail(req.body.email);
      if (email.length !== 0) {
        return res.send({ message: "email already exist.", success: false });
      }
    }

    let password = await bcrypt.hash(req.body.password, 10);
    let user = new Users(
      req.body.username,
      password,
      req.body.email,
      req.body.phone_number,
      req.body.role_id
    );
    await user.save();
    res.status(200).send({ message: "User created.", success: true });
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const [users] = await Users.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.UserLogin = async (req, res, next) => {
  try {
    // validate request
    if (!req.body.email || !req.body.password) {
      return res.send({ message: "Email and Password are required." });
    }
    const [user, _] = await Users.findByEmail(req.body.email);
    //console.log(user);
    if (user.length > 0) {
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) {
        return res.send({
          message: "Wrong email/username or password.",
          success: false,
        });
      }

      const userid = user[0].id;
      const username = user[0].username;
      const email = user[0].email;
      let role = user[0].role_name;
      //console.log(role);

      const accessToken = jwt.sign(
        { userid, username, email, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        { userid, username, email, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await Users.updateRefreshToken(userid, refreshToken);

      await res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.send({ token: accessToken, success: true });
    } else {
      // work when email not correct
      const [username] = await Users.findByUsername(req.body.email);
      if (username.length > 0) {
        const match = await bcrypt.compare(
          req.body.password,
          username[0].password
        );
        if (!match) {
          return res.send({
            message: "Wrong email/username or password.",
            success: false,
          });
        }

        const userid = username[0].id;
        const user_name = username[0].username;
        const email = username[0].email;
        let role = username[0].role_name;

        const accessToken = jwt.sign(
          { role, userid, user_name, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        const refreshToken = jwt.sign(
          { userid, user_name, email, role },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        await Users.updateRefreshToken(userid, refreshToken);

        await res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.send({ token: accessToken, success: true });
      } else {
        res.send({
          message: "Wrong username/email or password.",
          success: false,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteToken = async (req, res, next) => {
  try {
    const result = await Users.updateRefreshToken(req.params.id, "");
    res.send(result);
  } catch (err) {}
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    //console.log(refreshToken);
    if (!refreshToken) return res.sendStatus(204);
    const [user] = await Users.findByRefreshToken(refreshToken);
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.updateRefreshToken(userId, null);
    res.clearCookie("refreshToken");
    return res.send("Your logout successfully.");
  } catch (error) {
    next(error);
  }
};

exports.resetpassword_mail = async (req, res, next) => {
  try {
    if (!req.body.email) return res.send({ msg: "Email required." });
    const [user] = await Users.findByEmail(req.body.email);

    if (user.length > 0) {
      const userid = user[0].id;
      const email = user[0].email;

      const token = jwt.sign({ userid }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "180s",
      });
      const links = `<h1>Hello! ${user[0].username}</h1>
      <p>Please! click this <a href="http://localhost:5173/forgotpassword/${userid}/${token}/">link</a> to reset your password. Remember link will expire in 3mn and password reset only once.</p>
    `;
      const result = await sendEmail(email, "POS reset password mail!.", links);

      if (result === true) {
        await Users.updateRefreshToken(userid, token);
        res.send({
          message: "password reset link sent to your email account",
          success: true,
        });
      } else {
        res.send({ message: "An error occured!", success: false });
      }
    } else {
      res.send({
        message: "user with given email doesn't exist",
        success: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.forgotpassword = async (req, res, next) => {
  try {
    const [user] = await Users.findByTokenAndId(
      req.params.token,
      req.params.id
    );
    //console.log(user);
    if (user.length > 0) {
      jwt.verify(
        req.params.token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
          if (err) return res.send({ success: false });
          res.send({ success: true });
        }
      );
    } else {
      return res.send({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // verify token
    jwt.verify(
      req.params.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decode) => {
        if (err)
          return res.send({
            success: false,
            message: "Time out! to reset password",
          });
      }
    );

    const [user] = await Users.findByTokenAndId(
      req.params.token,
      req.params.id
    );

    //console.log(user);
    if (user.length > 0) {
      const password = await bcrypt.hash(req.body.password, 10);

      const [result] = await Users.updatePassword(password, req.params.id);

      if (result.affectedRows !== 0) {
        await Users.updateRefreshToken(req.params.id, "");
        return res.send({
          message: "Password reset successfully.",
          success: true,
        });
      }

      return res.send({ message: "Password reset failed.", success: false });
    } else {
      res.send({
        message: "Password reset exspired. Please! send mail again!.",
        success: false,
      });
    }
  } catch (err) {
    //next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    const [user] = await Users.findById(req.params.id);

    console.log(user[0].password);
    const match = await bcrypt.compare(req.body.password, user[0].password);
    console.log(match);
    if (!match) {
      return res.send({
        message: "លេខសម្ងាត់របស់អ្នកមិនត្រូវ!",
        success: false,
      });
    } else {
      const [re_update] = await Users.updatePassword(
        newPassword,
        req.params.id
      );
      if (re_update.affectedRows > 0) {
        return res.send({
          message: "លេខសសម្ងាត់របស់អ្នកត្រូបានផ្លាស់ប្ដូរដោយជោគជ័យ!",
          success: true,
        });
      } else {
        return res.send({
          message: "ការផ្លាស់ប្ដូរលេខសម្ងាត់ត្រូវបានបរាជ័យ!",
          success: false,
        });
      }
    }
  } catch (err) {
    next();
  }
};

module.exports.findById = async (req, res, next) => {
  try {
    const [user] = await Users.findById(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const [result] = await Users.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.send({
        message: "អ្នកប្រើប្រាស់ត្រូវបានលុបដោយជោគជ័យ!",
        success: true,
      });
    } else {
      res.send({ message: "ការលុបត្រូវបានបរាជ័យ!", success: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updateOne = async (req, res, next) => {
  try {
    const [result] = await Users.updateOne(
      req.body.username,
      req.body.email,
      req.body.phone_number,
      req.body.role_id,
      req.params.id
    );
    if (result.affectedRows > 0) {
      res.send({
        message: "អ្នកប្រើប្រាស់ត្រូវបានកែប្រែដដោយជោគជ័យ!",
        success: true,
      });
    } else {
      res.send({ message: "ការកែប្រែបរាជ័យ!", success: false });
    }
  } catch (err) {
    next(err);
  }
};
