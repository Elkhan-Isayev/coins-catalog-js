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
            const type      = this.props.location.state.type !== undefined ? `?type=${this.props.location.state.type}` : '';
            const response  = await fetch(`http://localhost:3010/coins/${type}`);
            const data      = await response.json();
            
            this.setState({data});
        }
        catch(err) {
            console.log(err);
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
                        <SearchBar isFilterMode={true} />
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