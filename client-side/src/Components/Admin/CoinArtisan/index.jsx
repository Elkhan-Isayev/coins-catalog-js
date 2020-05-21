import React, { Component } from 'react';
import './style.scss';

class CoinArtisan extends Component {
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
            price: null,
            obverseImage: null,
            reverseImage: null
        }
    }

    componentDidMount = () => {
        this.checkAccess();
    }

    checkAccess = async() => {
        const token = localStorage.getItem('token');
        if(!token) {
            alert("Access denied");
            this.props.history.push('/sign-in'); // change to sign-in
            return;
        }
        try {
            const response  = await fetch(`http://localhost:3010/sign-in/admin-panel/${token}`);
            if(!response.ok) {
                alert("Access denied");
                this.props.history.push('/sign-in');
            }
        }
        catch(err) {
            alert("Access denied");
            this.props.history.push('/sign-in');
        }
        const id = this.props.match.params.id;
        if(id !== 'create' && !isNaN(id)) {
            this.getData();
        }
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
            console.log(data);  
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

    handleSubmit = (e) => {
        e.preventDefault();
        const {obverseImage, reverseImage} = this.state;
        const formData = new FormData();
        formData.append('obverse', obverseImage);
        formData.append('reverse', reverseImage);

        // try {
        //     const options = {
                
        //         body: formData
        //     }
            
        // }
        // catch(err) {
        //     console.log(err);
        // }
    }

    handleChange = (e) => {
        switch(e.target.name) {
            default: break;
        }
    }

    render = () => {
        const id = this.props.match.params.id;
        // if(id !== 'create' && !isNaN(id)) {
            // this.getData();
            // accept="image/png, image/jpeg"
        // }

        /*
        app.get('/download', function(req, res){
  const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  res.download(file); // Set disposition and send it.
});
        */

        return (
            <div className="coin-artisan">
                <header>
                    <h1>Admin Panel</h1>                    
                </header>
                <main>
                    <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                        
                        <div className="coin-artisan-first-floor">
                            <div className="coin-artisan-first-floor-item">
                                <div>
                                    <label htmlFor="">Coin name</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label htmlFor="">Face value</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="coin-artisan-first-floor-item">
                                <label htmlFor="">Short description</label>
                                <textarea name="" id="" cols="30" rows="5"></textarea>
                            </div>
                            <div className="coin-artisan-first-floor-item">
                                <label htmlFor="coinArtisanFirstFloorImgInput">+</label>
                                <input type="file" id="coinArtisanFirstFloorImgInput"/>
                            </div>
                        </div>

                        <div className="coin-artisan-second-floor">
                            <div className="coin-artisan-second-floor-item">
                                <div>
                                    <label htmlFor="">Year of issue</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label htmlFor="">Price</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="coin-artisan-second-floor-item">
                                <label htmlFor="">Long description</label>
                                <textarea name="" id="" cols="30" rows="5"></textarea>
                            </div>
                            <div className="coin-artisan-second-floor-item">
                                <label htmlFor="coinArtisanSecondFloorImgInput">+</label>
                                <input type="file" id="coinArtisanSecondFloorImgInput"/>
                            </div>
                        </div>

                        <div className="coin-artisan-third-floor">
                            <div className="coin-artisan-third-floor-item">
                                <div>
                                    <label htmlFor="">Country</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label htmlFor="">Metal</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="coin-artisan-third-floor-item">
                                <div>
                                    <label htmlFor="">Quality of the coin</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label htmlFor="">Weight</label>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="coin-artisan-third-floor-item">
                                <div>
                                    <label htmlFor="">Type</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <button>Save</button>
                                    <button>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

export default CoinArtisan;