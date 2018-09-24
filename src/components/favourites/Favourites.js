import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";

import DisplayResult from '../common/DisplayResult';

import './Favourites.css';
class Favourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: props.favourites.allFavourites, // global state of which repos are favourite
        };

    }

    // used to check if global favourites is updated, if true, re-render component
    componentWillReceiveProps(nextProps) {
        if (
            this.props.favourites.allFavourites !== nextProps.favourites.allFavourites
        ) {
            this.setState({ favourites: nextProps.favourites.allFavourites });
        }
    }

    // calls the redux function
    handleClick = (repo) => {
        this.props.removeFavourite(repo)
    }

    // render a table to display the favourite repos
    // keep in mind that it renders if there are MORE THAN ONE favourites (as requested)
    render() {
        const {favourites} = this.state
        if(favourites.length < 2) {
            return (
                <div className="Favourites-container"></div>
            );
        }
        return (
            <div className="Favourites-container">
                <div className="Table-container">
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <th>Name</th>
                            <th>Language</th>
                            <th>Latest Tag</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {favourites.map((repo) => (

                            <tr key={repo.id} >
                                <td><a className="repo-name" href={repo.url} target={"_blank"}>{repo.name}</a></td>
                                <td>{repo.language}</td>
                                <td>{repo.tag}</td>
                                <td onClick={() => this.handleClick(repo)}><span className="repo-btn">remove</span></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

// used to map state to global favourites
const mapStateToProps = state => {
    return {
        favourites: state.favourites
    };
};

export default connect(mapStateToProps, actions)(Favourites);