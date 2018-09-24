/*
* The search panel container
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";

import Search from './Search'

import './SearchContainer.css';
class SearchContainer extends Component {
    constructor(props) {
        super(props);
        // don't need but here just in case
        this.state = {

        };

    }
    render() {
        return (
            <div className="Search-Container">
                <Search />
            </div>
        );
    }
}
// don't need but here just in case
const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps, actions)(SearchContainer);