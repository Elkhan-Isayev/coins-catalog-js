import React, { Component } from 'react';
import './style.scss';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            obverse_path: null, 
            reverse_path: null, 
            coin_name: null, 
            short_description: null, 
            full_description: null, 
            issuing_country: null, 
            composition: null,
            quality: null,
            denomination: null,
            coin_year: null,
            weight: null,
            price: null
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = async() => {
        const id = this.props.match.params.id;
        if(!id) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3010/coins/${id}`);
            if(!response.ok) {
                console.log(response.statusText);
                return;
            }
            const data = await response.json();
            if(data.length !== 1) {
                console.log(data.length);
                return;
            }
            const {
                obverse_path, 
                reverse_path, 
                coin_name, 
                short_description, 
                full_description, 
                issuing_country, 
                composition,
                quality,
                denomination,
                coin_year,
                weight,
                price
            } = data[0];

            this.setState({
                data,
                obverse_path, 
                reverse_path, 
                coin_name, 
                short_description, 
                full_description, 
                issuing_country, 
                composition,
                quality,
                denomination,
                coin_year,
                weight,
                price
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    render = () => {
        const {
            data,
            obverse_path, 
            reverse_path, 
            coin_name, 
            short_description, 
            full_description, 
            issuing_country, 
            composition,
            quality,
            denomination,
            coin_year,
            weight,
            price
        } = this.state;
        
        return (
            <div className="description">
                {
                    data.length === 1 &&
                    <article>
                        <div className="description-icon-img"> 
                            <div className="description-obverse">
                                <img src={`http://localhost:3010/img/${obverse_path}`} alt="COIN.png" />
                            </div>

                            <div className="description-reverse">
                                <img src={`http://localhost:3010/img/${reverse_path}`} alt="COIN.png" />
                            </div>
                        </div>
                        <div className="description-icon-info">
                            <h1>{coin_name}</h1>
                            <p>{short_description}</p>
                            <p>{full_description}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Issuing Country</td>
                                        <td>{issuing_country}</td>
                                    </tr>
                                    <tr>
                                        <td>Composition</td>
                                        <td>{composition}</td>
                                    </tr>
                                    <tr>
                                        <td>Quality</td>
                                        <td>{quality}</td>
                                    </tr>
                                    <tr>
                                        <td>Denomination</td>
                                        <td>{denomination}</td>
                                    </tr>   
                                    <tr>
                                        <td>Year</td>
                                        <td>{coin_year}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>{weight} g</td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td>{price} $</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="description-btn-wrapper">
                                <button onClick={()=>{this.props.history.goBack();}}>Back</button>
                            </div>
                        </div>
                    </article>
                }
            </div>
        )
    }
}

export default Description;