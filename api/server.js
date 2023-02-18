require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const categoriesRoute = require("./routes/category.route");
const brandsRoute = require("./routes/brand.route");
const unitsRoute = require("./routes/productunit.route");
const supplierRoute = require("./routes/sulppier.route");
const productRoute = require("./routes/product.route");
const usersRoute = require("./routes/UserRoute");
const statusRoute = require("./routes/status.route");
// const backupRoute = require("./routes/backup.route");
const userRoleRoute = require("./routes/RoleRoute");
const app = express();

// Middleware

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/audio", express.static(path.join(__dirname, "/audio")));
app.use(express.json()); // parse json bodies in the request object
app.use(userRoleRoute);
app.use(brandsRoute);
app.use(categoriesRoute);
app.use(unitsRoute);
app.use(supplierRoute);
app.use(productRoute);
app.use(usersRoute);
app.use(statusRoute);
// app.use(backupRoute);

app.use(bodyParser.urlencoded({ extended: false }));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
