const graphql = require('graphql');
const lodash = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// Dummy Test Data
let movies = [
    {
        name: 'Spiderman No Way Home',
        genre: 'Action',
        id: '1'
    },
    {
        name: '500 Days of Summer',
        genre: 'Romance',
        id: '2'
    },
    {
        name: 'Loki',
        genre: 'Action',
        id: '3'
    }
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ()=>({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id:{
                    type:GraphQLString
                }
            },
            resolve(parent, args){
                // Get Data from DB
                return lodash.find(movies, {
                    id: args.id
                });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});