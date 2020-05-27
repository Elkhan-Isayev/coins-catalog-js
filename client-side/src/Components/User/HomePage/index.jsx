import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from '../../Common/SeachBar/index';
import './style.scss';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false
        }
    }

    handleSearchSubmit = (e, criteria) => {
        e.preventDefault();
        this.props.history.push('/list', criteria);
    }

    componentDidMount = () => {
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
                        this.setState({isRegistered: true});
                    break;
                    default: break;
                }
            }
        }
        catch(err) {
            return;
        }
    }

    handleLogOut = () => {
        localStorage.removeItem('token');
        this.setState({isRegistered: false});
    }

    render = () => {
        const {isRegistered} = this.state;
        return (
            <div className="homepage">
                <header>
                    <h1>Homepage</h1>
                    <div>
                        <Link to="/list">Coins</Link>
                        {
                            
                        }
                        {
                            isRegistered ? 
                            <>
                                <Link to="/cart">Cart</Link> 
                                <button onClick={this.handleLogOut}>Log out</button>
                            </>                        
                            : 
                            <Link to="/sign-in">Log in</Link>
                        }
                    </div>
                </header>

                <main>
                    <SearchBar handleSearchSubmit={this.handleSearchSubmit} isFilter={true} />

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