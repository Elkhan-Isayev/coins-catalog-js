import React, {Component} from 'react';
import './style.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            isFilterShow: false,
            countries: [],
            compositions: []
        }
    }

    componentDidMount = () => {
        this.getCountries();
        this.getCompositions();
    }


    getCountries = async() => {
        try {
            const response = await fetch('http://localhost:3010/countries');
            const data = await response.json();
            this.setState({countries: data});
        }
        catch(err) {
            console.log(err);
        }
    }

    getCompositions = async() => {
        try {
            const response = await fetch('http://localhost:3010/compositions');
            const data = await response.json();
            this.setState({compositions: data});
        }
        catch(err) {
            console.log(err);
        }
    }

    handleInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    showFilter = (e) => {
        console.log(e);
        this.setState({isFilterShow: !this.state.isFilterShow})
    }

    render = () => {
        const {isFilterMode, handleSearchSubmit} = this.props;
        // const {handleSearchSubmit} = this.props;
        const {inputValue, isFilterShow} = this.state;
        return ( 
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="searchBarId">Input field</label>
                    <div>
                        <div><input id="searchBarId" type="text" value={inputValue} onChange={this.handleInputChange}  required  placeholder="name or description..."/></div>
                        <div><button type="submit">Search</button></div>
                        
                    </div>   
                    {
                        isFilterMode ? 
                            <div className="search-bar-filter-title">
                                <input type="button" onClick={this.showFilter} value="Advanced filter" /> 
                                <span>&#8693;</span>
                            </div>
                            
                        : null
                    }
                    {
                        isFilterShow ?
                            <div className="filter-wrapper">

                            </div>
                        : null
                    }

                </form>
            </div>
        )
    }
}

export default SearchBar;