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
    mutation{
        addMovie(
            name:"",
            genre:"",
            castId:""
        ) {
            name
            id
        }
    }
`

export {getCastsQuery, getMoviesQuery, addMovieMutation};