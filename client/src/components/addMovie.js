import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getCastsQuery, addMovieMutation} from "../query/query";

class AddMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            castId: ""
        }
    }

    displayCasts(){
        var data = this.props.getCastsQuery;
        if(data.loading){
            return(<option disabled>Loading Casts...</option>)
        } else {
            return data.casts.map(cast =>{
                return(<option key={cast.id} value={cast.id}>{cast.name}</option>)
            })
        }
    }
    submitForm(ex){
        ex.preventDefault();
        this.props.addMovieMutation();
    }

    render(){
        
        return(
            <form id="add-movie" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Movie name:</label>
                    <input type="text" onChange={(e)=>this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>this.setState({genre: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Cast:</label>
                    <select onChange={(e)=>this.setState({castId: e.target.value})}>
                        <option>Select cast</option>
                        {this.displayCasts()}
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getCastsQuery, {name:"getCastsQuery"}),
    graphql(addMovieMutation, {name: "addMovieMutation"})
)(AddMovie);