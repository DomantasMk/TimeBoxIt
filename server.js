const express = require('express');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-authenticated');

const graphqlHttp = require ('express-graphql');

const items = require('./routes/api/roadmapItems');

const graphqlSchema = require('./graphql/Schemas/mainSchema');
const graphqlResolver = require('./graphql/Resolvers/mainResolver');

const app = express();

//bodyparser
app.use(express.json())

app.use(isAuth);


// DB key
const dbKey = require('./config/keys').mongoKey;

// connect to mongo server

mongoose.connect(dbKey)
    .then(() => console.log("mongo connected"))
    .catch(err => console.log(err));


// Use Routes 
//app.use('/api/items', items);

const tasks = []

//Graphql route
// ! specifies that returning null is not an option
app.use('/graphiql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql:true,

}));

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`server started on port ${port}`))