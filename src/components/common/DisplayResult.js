import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";

import "./DisplayResult.css"

class DisplayResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: props.repos, // get the repos from other component
            favourites: props.favourites.allFavourites, // get favourites from global state
        };

    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.repos !== nextProps.repos ||
            this.props.favourites.allFavourites !== nextProps.favourites.allFavourites
        ) {
            this.setState({ repos: nextProps.repos, favourites: nextProps.favourites.allFavourites });
        }
    }


    // call approprite function to add favourite
    handleClick = (repo) => {
        this.props.addFavourite(repo);
    }

    render() {
        const { repos, favourites } = this.state
        return (
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
                        {repos.map((repo) => (

                            <tr key={repo.id} >
                                <td><a className="repo-name" href={repo.url} target={"_blank"}>{repo.name}</a></td>
                                <td>{repo.language}</td>
                                <td>{repo.tag}</td>
                                <td onClick={() => this.handleClick(repo)}>{favourites.indexOf(repo) < 0 ? <span className="repo-btn">Add</span> : null}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        );
    }
}

// map state to global state
const mapStateToProps = state => {
    return {
        favourites: state.favourites
    };
};

export default connect(mapStateToProps, actions)(DisplayResult);