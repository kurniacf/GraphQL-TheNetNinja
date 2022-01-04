const express = require('express');
const PORT = process.env.PORT || 5000;
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`);
});