/*
* The app container itself. It adds the header and the 2 panels needed for this app
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";

import Header from './common/Header'
import SearchContainer from './search/SearchContainer'
import Favourites from './favourites/Favourites'

import logo from '../logo.svg';
import './App.css';
class App extends Component {
    constructor(props) {
        super(props);
        // don't need but here just in case
        this.state = {

        };

    }
    render() {
        // add the header and the 2 panels: one for searching, and one for managing favourites
        return (
            <div>
                <Header />
                <div className="Container">
                    <SearchContainer />
                    <Favourites />
                </div>
            </div>
        );
    }
}

// don't need but here just in case
const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps, actions)(App);