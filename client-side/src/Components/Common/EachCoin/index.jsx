import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class EachCoin extends Component {
    render = () => {
        const {id, coin_name, obverse_path, short_description} = this.props;       
        return (
            <div className="each-coin">
                {
                    id && coin_name && obverse_path && short_description &&
                    <Link to={`/description/${id}`} className="each-coin-link">
                        <div className="each-coin-wrapper">
                            <div className="each-coin-image-wrapper">
                                <img src={`http://localhost:3010/img/coins/${obverse_path}`} alt="COIN.png" className="each-coin-image" />
                            </div>
                            <div className="each-coin-info">
                                <div className="each-coin-description">
                                    <h3 className="each-coin-description-header">{coin_name}</h3>
                                    <p>
                                        {short_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        )
    }
}

export default EachCoin;