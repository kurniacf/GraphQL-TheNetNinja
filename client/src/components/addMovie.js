import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getCastsQuery} from "../query/query";

class AddMovie extends Component {
    displayCasts(){
        var data = this.props.data
        if(data.loading){
            return(<option disabled>Loading Casts...</option>)
        } else {
            return data.casts.map(cast =>{
                return(<option key={cast.id} value={cast.id}>{cast.name}</option>)
            })
        }
    }
    render(){
        
        return(
            <form id="add-movie">
                <div className="field">
                    <label>Movie name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Cast:</label>
                    <select>
                        <option>Select cast</option>
                        {this.displayCasts()}
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default graphql(getCastsQuery)(AddMovie);