import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EachCoin from '../../Common/EachCoin/index';
import SearchBar from '../../Common/SeachBar/index';
import './style.scss';

class CoinsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        this.getCoins();
    }

    getCoins = async() => {
        try {       
            if(this.props.location.state === undefined) {
                const response              = await fetch(`http://localhost:3010/coins`);
                const data                  = await response.json();
                this.setState({data});
                return;
            }    
            if(this.props.location.state.inputValue !== undefined) {
                const searchBarMainInput    = this.props.location.state.inputValue !== undefined ? `?searchBarMainInput=${this.props.location.state.inputValue}` : '';
                const priceFrom             = this.props.location.state.priceFrom !== undefined ? `&priceFrom=${this.props.location.state.priceFrom}` : ''; 
                const priceTo               = this.props.location.state.priceTo !== undefined ? `&priceTo=${this.props.location.state.priceTo}` : '';
                const yearFrom              = this.props.location.state.yearFrom !== undefined ? `&yearFrom=${this.props.location.state.yearFrom}` : '';
                const yearTo                = this.props.location.state.yearTo !== undefined ? `&yearTo=${this.props.location.state.yearTo}` : '';
                const issuingCountry        = this.props.location.state.issuingCountry !== undefined ? `&issuingCountry=${this.props.location.state.issuingCountry}` : '';
                const composition           = this.props.location.state.composition !== undefined ? `&composition=${this.props.location.state.composition}` : '';
                const quality               = this.props.location.state.quality !== undefined ? `&quality=${this.props.location.state.quality}` : '';
                
                const response  = await fetch(`http://localhost:3010/coins/${searchBarMainInput}${priceFrom}${priceTo}${yearFrom}${yearTo}${issuingCountry}${composition}${quality}`);
                const data      = await response.json();
                this.setState({data});
            }
            else if(this.props.location.state.type !== undefined) {
                const type                  = this.props.location.state.type !== undefined ? `?type=${this.props.location.state.type}` : ' ';
                const response              = await fetch(`http://localhost:3010/coins/${type}`);
                const data                  = await response.json();
                this.setState({data});
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    handleSearchSubmit = async(e, criteria) => {
        e.preventDefault();
        if(criteria.inputValue !== undefined) {
            const searchBarMainInput    = criteria.inputValue !== undefined ? `?searchBarMainInput=${criteria.inputValue}` : '';
            const priceFrom             = criteria.priceFrom !== undefined ? `&priceFrom=${criteria.priceFrom}` : ''; 
            const priceTo               = criteria.priceTo !== undefined ? `&priceTo=${criteria.priceTo}` : '';
            const yearFrom              = criteria.yearFrom !== undefined ? `&yearFrom=${criteria.yearFrom}` : '';
            const yearTo                = criteria.yearTo !== undefined ? `&yearTo=${criteria.yearTo}` : '';
            const issuingCountry        = criteria.issuingCountry !== undefined ? `&issuingCountry=${criteria.issuingCountry}` : '';
            const composition           = criteria.composition !== undefined ? `&composition=${criteria.composition}` : '';
            const quality               = criteria.quality !== undefined ? `&quality=${criteria.quality}` : '';
            
            const response  = await fetch(`http://localhost:3010/coins/${searchBarMainInput}${priceFrom}${priceTo}${yearFrom}${yearTo}${issuingCountry}${composition}${quality}`);
            const data      = await response.json();
            this.setState({data});
        } 
        else {
            alert("Fill all fields!");
        }
    }

    render = () => {
        const {data} = this.state;
        return (
            <div className="list">
                <header>
                    <h1>List of the coins</h1>
                    <div>
                        <Link to="/">Homepage </Link><span>— List of the coins</span>
                    </div>
                </header>
                <main>
                    <div className="list-search-wrapper">
                        <SearchBar isFilter={true} handleSearchSubmit={this.handleSearchSubmit}/>
                    </div>
                    
                    <div className="list-coins-wrapper">
                        {
                            data.length > 0 &&
                            data.map((element, index) => {
                                return (
                                    <div key={element.id} className="list-per-coin">
                                        <EachCoin {...element} />
                                        
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </main>
            </div>
        )
    }
}

export default CoinsList;