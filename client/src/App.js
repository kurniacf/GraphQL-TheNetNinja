import { Component } from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import MovieList from "./components/movieList";
import AddMovie from "./components/addMovie";

// Apollo Setup
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component{
  render(){
    return(
      <ApolloProvider client={client}>
        <div>
          <h1>Movie List</h1>
            <MovieList/>
            <AddMovie/>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
