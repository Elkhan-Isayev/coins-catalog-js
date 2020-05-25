import React from 'react';
import './style.scss';

const Pagination = ({coinsPerPage, totalCoins, changeCurrPage}) => {
    
    const pages = [];


    for(let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <ul>
                {
                    pages.map((element, index) => {
                        return (
                            <li key={index} onClick={()=>changeCurrPage(element)}>
                                <p>{element}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default Pagination;
