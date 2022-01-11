import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMoviesQuery} from "../query/query";

class MovieList extends Component {
    displayMovies(){
        var data = this.props.data;
        if(data.loading){
            return( 
                <div>Loading Movies...</div> 
            );
        } else {
            return data.movies.map(movie => {
                return(
                    <li key={ movie.id }>{ movie.name }</li>
                );
            })
        }
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <ul id="movie-list">
                    { this.displayMovies() }
                </ul>
            </div>
        );
    }
}

export default graphql(getMoviesQuery)(MovieList);
