// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

//Middleware that checks if User is Authenticated with valid JWT
const { isAuthenticated } = require("./middlewares/jwt.middleware");
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const searchRoutes = require('./routes/search.routes')
app.use('/api', searchRoutes)

const collectionRoutes = require('./routes/collections.routes')
app.use('/api', isAuthenticated, collectionRoutes)

const statisticsRoutes = require('./routes/statistics.routes')
app.use('/api', isAuthenticated, statisticsRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
