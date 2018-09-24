import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import DisplayResult from '../common/DisplayResult';

import { API_URL, API_TOKEN } from '../../config'

import './Search.css';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            search: "", // used to get user query
            display: false, // used for DisplayResult: the table that display's repos
        };

    }

    // used to update the search query string
    handleInputChange = (e) => {
        this.setState({ search: e.target.value })
    }

    // used to call the api to get repos tags, returns the latest tag name
    getTag = (url, cb) => {
        fetch(url, {
            headers: { "Authorization": `Token ${API_TOKEN}` }
        })
            .then((tagResponse) => {
                return tagResponse.json().then(json => {
                    return tagResponse.ok ? json : Promise.reject(json);
                })
            })
            .then((tagResult) => {
                try {
                    cb(tagResult[0].name)
                } catch (error) {
                    cb('-')
                }
            })
    }

    // used to fetch repos based on search. mutates repos state with new repos based on search
    handleBtnClick = () => {
        const { search } = this.state;

        // if search is empty, don't display table and end it
        if (search == '') {
            this.setState({ display: false });
            return null
        }

        // reset the repo to be empty
        this.setState({ repos: [] })

        // fetch repos with api
        fetch(`${API_URL}?q=${search}&per_page=10`, {
            headers: { "Authorization": `Token ${API_TOKEN}` }
        })
            .then((response) => {
                return response.json().then(json => {
                    return response.ok ? json : Promise.reject(json);
                })
            })
            .then((result) => {
                let repo = {}
                // iterate and get valuable info of each repo
                for (let i = 0; i < result.items.length; i++) {

                    repo.tag = this.getTag(result.items[i].tags_url, (tag) => {
                        repo.id = result.items[i].id
                        repo.name = result.items[i].full_name
                        repo.language = result.items[i].language
                        repo.url = result.items[i].html_url
                        repo.tag = tag;
                        this.setState(prevState => ({
                            repos: [...prevState.repos, repo]
                        }))
                        repo = {}
                    })

                }
                // once done, display table
                this.setState({ display: true })
            })

    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.handleBtnClick()
        }
    }
    render() {
        const { search, display, repos } = this.state;
        return (
            <div className="container-fluid">
                <div className="row github-input-container">
                    <div className="col-md-10 max-height no-padding">
                        <input className="form-control github-search-input" type="text" name="title" value={search} onKeyPress={this.handleKeyPress} onChange={e => this.handleInputChange(e)} />
                    </div>
                    <div className="col-md-2 max-height no-right-padding btn-container">
                        <button className="btn github-search-btn" onClick={() => this.handleBtnClick()}>Search</button>
                    </div>
                </div>
                {display ? <DisplayResult repos={repos} /> : null}
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps, actions)(Search);