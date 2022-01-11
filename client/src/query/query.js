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

export {getCastsQuery, getMoviesQuery};