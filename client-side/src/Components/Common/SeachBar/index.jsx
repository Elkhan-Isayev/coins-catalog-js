import React, {Component} from 'react';
import './style.scss';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            isFilterShow: false,
            countries: [],
            compositions: [],
            selectedCountry: "",
            selectedMetal: "",
            priceFrom: 0,
            priceTo: 0,
            yearFrom: 0,
            yearTo: 0
        }
    }

    componentDidMount = () => {
        if(this.props.isFilter) {
            this.getCountries();
            this.getCompositions();
        }
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

    handleChange = (e) => {
        // this.setState({inputValue: e.target.value});
        switch(e.target.name) {
            case 'mainInput':
                this.setState({inputValue: e.target.value});
            break;

            case 'filterIssuingCountry':
                this.setState({selectedCountry: e.target.value})
            break;

            case 'filterMetal':
                this.setState({selectedMetal: e.target.value});
            break;

            case 'priceFrom':
                this.setState({priceFrom: Number(e.target.value)});
            break;

            case 'priceTo':
                this.setState({priceTo: Number(e.target.value)});
            break;

            case 'yearFrom':
                this.setState({yearFrom: Number(e.target.value)});
            break;

            case 'yearTo':
                this.setState({yearTo: Number(e.target.value)});
            break;

            default: break;
        }
    }

    validateSubmit = (e) => {
        const {handleSearchSubmit, isFilter} = this.props;
        const {inputValue, selectedCountry, selectedMetal, priceFrom, priceTo, yearFrom, yearTo} = this.state;
        let criteria = {};
        if(!isFilter) {
            criteria.inputValue = inputValue;
            handleSearchSubmit(e, criteria);
            return;
        }
        if(inputValue === " ") {
            alert("Search input is empty");
            return;
        }
        if(priceFrom > priceTo || yearFrom > yearTo) {
            alert("Uncorrect year/price fields");
            return;
        }
        if(priceFrom === 0 && priceTo === 0 && selectedCountry === "" && selectedMetal === "" && yearFrom === 0 && yearTo === 0) {
            criteria.inputValue = inputValue;
            handleSearchSubmit(e, criteria);
            return;
        } 
        else {
            criteria = {
                inputValue,
                selectedCountry,
                priceFrom, 
                priceTo, 
                yearFrom, 
                yearTo
            }
            handleSearchSubmit(e, criteria);
            return;
        }
    }

    showFilter = (e) => {   
        this.setState({isFilterShow: !this.state.isFilterShow})
    }

    render = () => {
        const {isFilter} = this.props;
        const {inputValue, isFilterShow, countries, compositions, selectedCountry, selectedMetal, priceFrom, priceTo, yearFrom, yearTo} = this.state;
        
        return ( 
            <div className="search-bar">
                <form onSubmit={this.validateSubmit}>
                    <label htmlFor="searchBarId">Input field</label>
                    <div className="search-bar-main-wrapper">
                        <div><input id="searchBarId" type="text" value={inputValue} onChange={this.handleChange}  required  placeholder="name or description..." name="mainInput"/></div>
                        <div><button type="submit">Search</button></div>         
                    </div>   
                    {
                        isFilter ? 
                            <div className="search-bar-filter-title">
                                <input type="button" onClick={this.showFilter} value="Advanced filter" /> 
                                <span>&#8693;</span>
                            </div>
                            
                        : null
                    }
                    {
                        isFilterShow ?
                            <div className="filter-wrapper slideExpandUp">
                                <div className="filter-issuing-metal">
                                    <div className="filter-row">
                                        <div><label htmlFor="filterIssuingCountry">Issuing country</label></div>
                                        <select name="filterIssuingCountry" id="filterIssuingCountry" value={selectedCountry} onChange={this.handleChange}>
                                            {
                                                countries.length > 0 &&
                                                countries.map((element, index) => {
                                                    return (
                                                        <option value={element.country_name} key={index}>{element.country_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>  
                                    <div className="filter-row">
                                        <div><label htmlFor="filterMetal">Metal</label></div>
                                        <select name="filterMetal" id="filterMetal" value={selectedMetal} onChange={this.handleChange}>
                                            {
                                                compositions.length > 0 &&
                                                compositions.map((element, index) => {
                                                    return (
                                                       <option value={element.metal} key={index}>{element.metal}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="filter-price-year">
                                    <div className="search-bar-price-wrapper filter-row" >
                                        <label htmlFor="priceFrom">Price</label>
                                        <div>
                                            <label htmlFor="priceFrom" className="filter-from-to">from</label>
                                            <input type="number" id="priceFrom" value={priceFrom} onChange={this.handleChange} name="priceFrom"/>
                                            <label htmlFor="priceFrom" className="filter-from-to">to</label>
                                            <input type="number" id="priceTo" value={priceTo} onChange={this.handleChange} name="priceTo"/>
                                        </div>
                                    </div>
                                    <div className="search-bar-year-of-issue-wrapper filter-row">
                                        <label htmlFor="yearFrom">Year of issue</label>
                                        <div>
                                            <label htmlFor="yearFrom" className="filter-from-to">from</label>
                                            <input type="number" id="yearFrom" value={yearFrom} onChange={this.handleChange} name="yearFrom"/>
                                            <label htmlFor="yearTo" className="filter-from-to">to</label>
                                            <input type="number" id="yearTo" value={yearTo} onChange={this.handleChange} name="yearTo"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null
                    }
                </form>
            </div>
        )
    }
}

export default SearchBar;