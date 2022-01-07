import { Component } from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import MovieList from "./components/movieList";

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
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
