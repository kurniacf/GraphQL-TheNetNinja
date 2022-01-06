const graphql = require('graphql');
const lodash = require('lodash');
const Movie = require('../models/movie');
const Cast = require('../models/cast');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;


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
                return Cast.findById(parent.castId);
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
                return Movie.find({
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
                return Movie.findById(args.id);
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
                return Cast.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movie.find({

                });
            }
        },
        casts: {
            type: new GraphQLList(CastType),
            resolve(parent, args){
                return Cast.find({

                });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCast: {
            type: CastType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt) 
                }
            },
            resolve(parent, args){
                let cast = new Cast({
                    name: args.name,
                    age: args.age
                });
                return cast.save();
            }
        },
        addMovie:{
            type: MovieType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                castId: {
                    type: new GraphQLNonNull(GraphQLID) 
                }
            },
            resolve(parent, args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    castId: args.castId
                });
                return movie.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});