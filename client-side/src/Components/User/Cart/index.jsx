import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../Common/Pagination/index';
import EachCoin from '../../Common/EachCoin/index';
import './style.scss';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageSize: 6,
            currentPage: 1,
            userId: 0
        }
    }


    componentDidMount = () => {
        this.checkAccessToCart();
    }

    getCartItems = async() => {
        try {
            const { userId } = this.state;
            const response = await fetch(`http://localhost:3010/cart/${userId}`);
            if(!response.ok) {
                alert("Something goes wrong. Please, try again");
                this.props.history.push('/');
                return;
            }
            const data = await response.json();
            if(data.length > 0) {
                this.setState({data});
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    checkAccessToCart = async() => {
        const token = localStorage.getItem('token');
        if(!token) {
            alert("Something goes wrong. Please, try again");
            this.props.history.push('/');
            return;
        }
        try {
            const response  = await fetch(`http://localhost:3010/sign-in/admin-panel/${token}`);
            if(!response.ok) {
                this.props.history.push('/');
                return;
            }
            else {
                const data = await response.json();
                switch(data.role) {
                    case 2: 
                        this.setState({userId: data.id}, this.getCartItems);
                    break;
                    default: break;
                }
            }
        }
        catch(err) {
            return;
        }
    }

    handleRemoveFromCart = async(id, index) => {
        const { data } = this.state;
        const options   = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        };
        try {
            const response = await fetch(`http://localhost:3010/cart/${id}`, options);
            if(response.ok) {
                const newArr = [...data];
                newArr.splice(index, 1);
                console.log(newArr)
                this.setState({data: [...newArr]});
            }
            else {
               alert("Something goes wrong. Please, try again");
               return;
            }
        }
        catch(err) {
            console.log('Request failed', err);
        }   
    }

    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }

    render = () => {
        const {data, pageSize, currentPage} = this.state;
        return (
            <div className="cart">
                {/* Coming soon */}
                <header>
                    <h1>Cart</h1>
                    <div>
                        <Link to="/">Homepage </Link><span>— Cart</span>
                    </div>
                </header>
                <main>
                    {
                        data.length > 0 ?
                        <div>
                            <h2><a href="https://pay.google.com/gp/w/u/0/home/signup" target="_blank" rel="noopener noreferrer">Make payment</a></h2>

                            <div className="cart-coins-wrapper">
                                {
                                    data.length > 0 &&
                                    data.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((element, index) => {
                                        return (
                                            <div key={index} className="cart-per-coin slideLeft">
                                                <EachCoin {...element} />
                                                <div className="remove-from-cart-coin-wrapper">
                                                    <button onClick={() => this.handleRemoveFromCart(element.cart_id, index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }) 
                                }
                            </div>

                        </div>
                        : 
                        <div>
                            <h1>Cart is empty</h1>
                        </div>
                    }
                </main>
                <footer>
                    {
                        data.length > 0 ?
                            <Pagination 
                                coinsPerPage={pageSize} 
                                totalCoins={data.length}
                                changeCurrPage={this.handlePageChange} 
                            />
                        :null
                    }
                </footer>
            </div>
        )
    }
}

export default Cart;