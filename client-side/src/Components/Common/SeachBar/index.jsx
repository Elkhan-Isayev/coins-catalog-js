import React, {Component} from 'react';
import './style.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
    }

    handleInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    render = () => {
        // const {isFilterMode, handleSearchSubmit} = this.props;
        const {handleSearchSubmit} = this.props;
        const {inputValue} = this.state;
        return ( 
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="searchBarId">Input field</label>
                    <div>
                        <div><input id="searchBarId" type="text" value={inputValue} onChange={this.handleInputChange}  required  placeholder="name or description..."/></div>
                        <div><button type="submit">Search</button></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;