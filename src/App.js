import React, {Component} from 'react';
import './App.css';

import {Search, Table,Button} from './components'

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';


function isSearched(searchTerm)
{
    return function(item)
    {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            searchTerm: DEFAULT_QUERY,
            result: null
        }
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.setSearchTopStories=this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this);
        this.onSearchSubmit=this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(event)
    {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDefault();

    }

    setSearchTopStories(result)
    {
        this.setState({result});
    }

    fetchSearchTopStories(searchTerm, page=0)
    {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error);
    }

    
    componentDidMount()
    {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm);
    }

    onDismiss(id)
    {
        console.log(id)
        function isNotID(item)
        {
            return item.objectID!==id
        }
        const updatedList=this.state.result.hits.filter(isNotID);
        this.setState({
            result : { ...this.state.result, hits: updatedList }
        })

    }

    onSearchChange(event)
    {
        console.log(event.target.value);
        this.setState({searchTerm: event.target.value});
    }

    render()
    {
        const {result, searchTerm} = this.state;
        if (!result) {return null;}
        const page = (result && result.page) || 0;
        return(
            <div className="page">
                <div className="interactions">

                    <Search value={searchTerm}
                            onChange={this.onSearchChange}
                            onSubmit={this.onSearchSubmit}
                    >Search
                    </Search>

                    {result &&
                    <Table list={result.hits}
                           onDismiss={this.onDismiss}
                    />
                    }
                    <div className={"interactions"}>
                        <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                            More
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}




export default App;
