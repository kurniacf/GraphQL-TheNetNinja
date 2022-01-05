const graphql = require('graphql');
const lodash = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// Dummy Test Data
let movies = [
    {
        name: 'Spiderman No Way Home',
        genre: 'Action',
        id: '1',
        castId: '4'
    },
    {
        name: '500 Days of Summer',
        genre: 'Romance',
        id: '2',
        castId: '3'
    },
    {
        name: 'Loki',
        genre: 'Action',
        id: '3',
        castId: '1'
    },
    {
        name: 'Thor: Ragnarock',
        genre: 'Action',
        id: '4',
        castId: '1'
    },
    {
        name: 'Free Guy',
        genre: 'Sci-Fi',
        id: '5',
        castId: '2'
    }
]; 

let casts = [
    {
        name: 'Tom Hiddleston',
        age: 40,
        id: '1'
    },
    {
        name: 'Ryan Reynolds',
        age: 45,
        id: '2'
    },
    {
        name: 'Zooey Deschanel',
        age: 41,
        id: '3'
    },
    {
        name: 'Tom Holland',
        age: 25,
        id: '4'
    }
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ()=>({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        cast: {
            type: CastType,
            resolve(parent, args){
                console.log(parent);
                return lodash.find(casts, {
                    id: parent.castId
                })
            }
        }
    })
});

const CastType = new GraphQLObjectType({
    name: 'Cast',
    fields: ()=>({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return lodash.filter(movies, {
                    castId: parent.id
                });
            }
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
                    type:GraphQLID
                }
            },
            resolve(parent, args){
                // Get Data from DB
                // console.log(typeof(args.id)) // --> String
                return lodash.find(movies, {
                    id: args.id
                });
            }
        },
        cast: {
            type: CastType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return lodash.find(casts, {
                    id: args.id
                });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});