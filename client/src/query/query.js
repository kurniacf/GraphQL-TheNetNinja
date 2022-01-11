import { gql } from "apollo-boost";

const getMoviesQuery = gql`
    {
        movies{
            name
            id
        }
    }
`;

const getCastsQuery = gql`
    {
        casts{
            name
            id
        }
    }
`;

const addMovieMutation = gql`
    mutation($name: String!, $genre: String!, $castId:ID!){
        addMovie(
            name: $name,
            genre: $genre,
            castId: $castId
        ) {
            name
            id
        }
    }
`
const getMovieQuery = gql`
    query($id: ID){
        movie(id: $id){
            id
            name
            genre
            cast{
                id
                name
                age
                movies{
                    name
                    id
                }
            }
        }
    }
`

export {getCastsQuery, getMoviesQuery, addMovieMutation, getMovieQuery};