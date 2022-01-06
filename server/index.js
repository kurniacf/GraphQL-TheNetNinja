require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin request
app.use(cors());

mongoose.connect(process.env.MONGODB);
mongoose.connection.once('open', ()=>{
    console.log('Connected to Database')
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`);
});