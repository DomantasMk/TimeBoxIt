const express = require("express");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-authenticated");
var cors = require("cors");
const graphqlHttp = require("express-graphql");

const graphqlSchema = require("./graphql/Schemas/mainSchema");
const graphqlResolver = require("./graphql/Resolvers/mainResolver");

const app = express();

app.use(cors());

//bodyparser
app.use(express.json());

app.use(isAuth);

// DB key
const dbKey = require("./config/keys").mongoKey;

// connect to mongo server

mongoose
  .connect(dbKey)
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log(err));

//Graphql route
// ! specifies that returning null is not an option
app.use(
  "/graphiql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);
//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
