import React, { Component } from 'react';
import './style.scss';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [],

        }
    }

    componentDidMount = () => {
        
    }

    render = () => {
        const {coinsPerPage, totalCoins, changeCurrPage} = this.props;
        const pages = this.state.pages;

        for(let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
            pages.push(i);
        }

        return (
            <div className="pagination">
                <ul>
                    {
                        pages.map((element, index) => {
                            return (
                                <li key={index} onClick={()=>changeCurrPage()}>
                                    <p>{element}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Pagination;


/*

import React from "react";
import style from "./styles/Pagination.module.css";

const Pagination = ({coinsPerPage, totalCoins, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pageNumbers.push(i);
    }

    return totalCoins ? (
        <div>
            <ul className={style.main}>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)}>
                        <p>{number}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : '';
}

export default Pagination;
*/