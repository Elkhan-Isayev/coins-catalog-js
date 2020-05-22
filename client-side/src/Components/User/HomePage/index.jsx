import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from '../../Common/SeachBar/index';
import './style.scss';

class HomePage extends Component {

    handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    render = () => {
        return (
            <div className="homepage">
                <header>
                    <h1>Admin Panel</h1>
                    <div>
                        <Link to="/sign-in">Login</Link>
                    </div>
                </header>

                <main>
                    <SearchBar handleSearchSubmit={this.handleSearchSubmit} isFilterShow={true} />

                    <div className="categoriesWrapper">
                        <div>
                            <h1>Bullion coins</h1>
                            <div><NavLink to={{ pathname: '/list', state: { type: '2' } }}>Show all &#10095;</NavLink></div>
                            <img src={'/assets/bullion.png'} alt="coin.PNG"/>
                        </div>
                        <div>
                            <h1>Exclusive coins</h1>
                            <div><NavLink to={{ pathname: '/list', state: { type: '3' } }}>Show all &#10095;</NavLink></div>
                            <img src={'/assets/exclusive.png'} alt="coin.PNG"/>
                        </div>
                        <div>
                            <h1>Commemorative coins</h1>
                            <div><NavLink to={{ pathname: '/list', state: { type: '1' } }}>Show all &#10095;</NavLink></div>
                            <img src={'/assets/commemorative.png'} alt="coin.PNG"/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default HomePage;