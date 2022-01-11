import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMovieQuery} from "../query/query";


class MovieDetails extends Component {
    displayMovieDetails(){
            const {movie} = this.props.data;
            if(movie){
                return(
                    <div>
                        <h2>{movie.name}</h2>
                        <p>{movie.genre}</p>
                        <p>{movie.cast.name}</p>
                        <p>All movies by this cast: </p>
                        <ul className="other-movies">
                            {movie.cast.movies.map(item => {
                                return <li key={item.id}> {item.name}</li>
                            })}
                        </ul>
                    </div>
                )
            } else {
                return(
                    <div>No Movies Selected...</div>
                )
            }
    }
    render(){
        return(
            <div id='movie-details'>
                {this.displayMovieDetails()}
            </div>
        );
    }
}

export default graphql(getMovieQuery, {
    options: (props)=>{
        return{
            variables: {
                id: props.movieId
            }
        }
    }
})(MovieDetails);