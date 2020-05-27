import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EachCoin from '../../Common/EachCoin/index';
import SearchBar from '../../Common/SeachBar/index';
import Pagination from '../../Common/Pagination/index';
import './style.scss';

class CoinsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            pageSize: 6,
            isRegistered: false,
            userId: 0
        }
    }

    componentDidMount = () => {
        this.getCoins();
        this.checkAccessToCart();    
    }

    checkAccessToCart = async() => {
        const token = localStorage.getItem('token');
        if(!token) {
            
            return;
        }
        try {
            const response  = await fetch(`http://localhost:3010/sign-in/admin-panel/${token}`);
            if(!response.ok) {
                return;
            }
            else {
                const data = await response.json();
                switch(data.role) {
                    case 2: 
                        this.setState({isRegistered: true, userId: data.id});
                    break;
                    default: break;
                }
            }
        }
        catch(err) {
            return;
        }
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

    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }

    handleAddToCart = async(coinId) => {
        const {isRegistered, userId} = this.state;
        if(!isRegistered) {
            alert("Something goes wrong. Please, try again");
            return;
        }
        try {
            const addToCartData  = {userId, coinId};
            const options       = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(addToCartData)
            };

            const response  = await fetch("http://localhost:3010/cart",options);
            if(!response.ok) {
                alert("Something goes wrong. Please, try again");
                return;
            }
            else {
                alert("Item added to cart");
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    render = () => {
        const {data, pageSize, currentPage, isRegistered} = this.state;
        return (
            <div className="list">
                <header>
                    <h1>Coins</h1>
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
                            data.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((element, index) => {
                                return (
                                    <div key={element.id} className="list-per-coin slideLeft">
                                        <EachCoin {...element} />
                                        {
                                            isRegistered && 
                                            <div className="add-to-cart-per-coin-wrapper">
                                                <button onClick={() => this.handleAddToCart(element.id)}>
                                                    Add to cart
                                                </button>
                                            </div>
                                            
                                        }
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </main>
                <footer>
                    {
                        data.length > 0 &&
                        <Pagination 
                            coinsPerPage={pageSize} 
                            totalCoins={data.length}
                            changeCurrPage={this.handlePageChange}  
                        />
                    }
                </footer>
            </div>
        )
    }
}

export default CoinsList;