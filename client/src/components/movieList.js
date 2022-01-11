import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getMoviesQuery} from "../query/query";
import MovieDetails from './movieDetails';

class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayMovies(){
        var data = this.props.data;
        if(data.loading){
            return( 
                <div>Loading Movies...</div> 
            );
        } else {
            return data.movies.map(movie => {
                return(
                    <li key={ movie.id } onClick={(e)=>{this.setState({selected: movie.id})}}>{ movie.name }</li>
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
                <MovieDetails movieId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getMoviesQuery)(MovieList);
