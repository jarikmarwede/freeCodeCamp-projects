const server = require("./server");
const apiRoutes = require("./routes/api");
const appRoutes = require("./routes/app");

const crypto = require("crypto");
const exphbs  = require("express-handlebars");
const cookieParser = require("cookie-parser");
const express = require("express");

// express configuration
const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(async (request, response, next) => {
  const loggedIn = await server.isLoggedIn(request.cookies.session, request.cookies.username);
  request.middlewareData = {
    loggedIn
  };

  // handle XSRF checking
  if (request.method === "GET" && !request.path.startsWith("/api") && request.path !== "/favicon.ico") {
    const newXsrfFormValue = crypto.randomBytes(16).toString("hex");
    response.cookie("xsrfFormValue", newXsrfFormValue);
    hbs._renderTemplate = (template, context, options) => {
      context.loggedIn = loggedIn;
      context.xsrfFormValue = newXsrfFormValue;
      return template(context, options);
    };
  }

  next();
});

// routes
app.use(appRoutes);
app.use("/api", apiRoutes);

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("App listening on port " + listener.address()["port"]);
});
