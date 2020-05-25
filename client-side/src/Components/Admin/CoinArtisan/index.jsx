import React, { Component } from 'react';
import './style.scss';

class CoinArtisan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            obverse_path: "", 
            reverse_path: "", 
            coin_name: "", 
            short_description: "", 
            full_description: "", 
            issuing_country: "", 
            composition: "Silver",
            quality: "BU",
            denomination: "",
            coin_year: "",
            weight: "",
            price: "",
            coin_type: "1",
            obverseImage: null,
            reverseImage: null,
            countries: [],
            compositions: [],
            editObverseStart: "",
            editReverseStart: ""
        }
    }

    componentDidMount = () => {
        this.checkAccess();
        this.getCountries();
        this.getCompositions();
    }

    checkAccess = async() => {
        const token = localStorage.getItem('token');
        if(!token) {
            alert("Access denied");
            this.props.history.push('/sign-in'); 
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
                price,
                coin_type
            } = data[0];

            const obverseHref = `http://localhost:3010/img/coins/${obverse_path}`;
            const reverseHref = `http://localhost:3010/img/coins/${reverse_path}`;
            
            this.setState({
                data,
                obverse_path: obverseHref, 
                reverse_path: reverseHref, 
                coin_name, 
                short_description, 
                full_description, 
                issuing_country, 
                composition,
                quality,
                denomination,
                coin_year,
                weight,
                price,
                coin_type,
                editObverseStart: obverse_path,
                editReverseStart: reverse_path,
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    getCountries = async() => {
        try {
            const response = await fetch('http://localhost:3010/countries');
            const data = await response.json();
            this.setState({countries: data});
        }
        catch(err) {
            console.log(err);
        }
    }

    getCompositions = async() => {
        try {
            const response = await fetch('http://localhost:3010/compositions');
            const data = await response.json();
            this.setState({compositions: data});
        }
        catch(err) {
            console.log(err);
        }
    }


    handleChange = (e) => {
        switch(e.target.name) {
            case 'coinArtisanName':
                this.setState({coin_name: e.target.value});
            break;

            case 'coinArtisanFaceValue':
                this.setState({denomination: e.target.value});
            break;

            case 'coinArtisanShortDescription':
                this.setState({short_description: e.target.value});
            break;

            case 'coinArtisanYear':
                this.setState({coin_year: Number(e.target.value)});
            break;

            case 'coinArtisanPrice':
                this.setState({price: Number(e.target.value)});
            break;

            case 'coinArtisanLongDescription':
                this.setState({full_description: e.target.value});
            break;

            case 'coinArtisanCountry':
                this.setState({issuing_country: e.target.value});
            break;

            case 'coinArtisanMetal': 
                this.setState({composition: e.target.value});
            break;

            case 'coinArtisanQuality':
                this.setState({quality: e.target.value});
            break;

            case 'coinArtisanWeight':
                this.setState({weight: Number(e.target.value)});
            break;

            case 'coinArtisanType':
                this.setState({coin_type: e.target.value});
            break;

            case 'coinArtisanObverse':
                if(e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.setState({obverse_path: e.target.result})
                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
                this.setState({obverseImage: e.target.files[0]});
            break;

            case 'coinArtisanReverse':
                if(e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.setState({reverse_path: e.target.result})
                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
                this.setState({reverseImage: e.target.files[0]});
            break;
            default: break;
        }
    }

    handleAddSubmit = async(e) => {
        e.preventDefault();    
        try {
            const {
                obverseImage, 
                reverseImage,
                coin_name, 
                short_description, 
                full_description, 
                issuing_country, 
                composition,
                quality,
                denomination,
                coin_year,
                weight,
                price,
                coin_type
            } = this.state;
            
            const formData = new FormData();
            formData.append('obverse', obverseImage);
            formData.append('reverse', reverseImage);
            formData.append('coin_name', coin_name);
            formData.append('short_description', short_description);
            formData.append('full_description', full_description);
            formData.append('issuing_country', issuing_country);
            formData.append('composition', composition);
            formData.append('quality', quality);
            formData.append('denomination', denomination);
            formData.append('coin_year', coin_year);
            formData.append('weight', weight);
            formData.append('price', price);
            formData.append('coin_type', coin_type);

            const options = {
                body: formData,
                method: "POST"
            };

            const response = await fetch("http://localhost:3010/coins", options);
            console.log(response);
            if(response.ok) {
                alert(`${coin_name} created!`);
                this.props.history.push('/admin-panel');
            }
            else {
                console.log(response);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    handleEditSubmit = async(e) => {
        e.preventDefault();
        try {
            const {
                data,
                coin_name, 
                short_description, 
                full_description, 
                issuing_country, 
                composition,
                quality,
                denomination,
                coin_year,
                weight,
                price,
                coin_type,
                obverseImage,
                reverseImage,
                editObverseStart,
                editReverseStart
            } = this.state;
            
    
            const formData = new FormData();
            formData.append('coin_name', coin_name);
            formData.append('short_description', short_description);
            formData.append('full_description', full_description);
            formData.append('issuing_country', issuing_country);
            formData.append('composition', composition);
            formData.append('quality', quality);
            formData.append('denomination', denomination);
            formData.append('coin_year', coin_year);
            formData.append('weight', weight);
            formData.append('price', price);
            formData.append('coin_type', coin_type);
            if(obverseImage && reverseImage) {
                formData.append('obverse', obverseImage);
                formData.append('reverse', reverseImage);
            }
            else { 
                formData.append('editObverseStart', editObverseStart);
                formData.append('editReverseStart', editReverseStart);
            }
    
            const options = {
                body: formData,
                method: "PUT"
            };
    
            const response = await fetch(`http://localhost:3010/coins/${data[0].id}`, options);
            console.log(response);
            if(response.ok) {
                alert(`${coin_name} updated!`);
                this.props.history.push('/admin-panel');
            }
            else {
                console.log(response);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    render = () => {
        const id = this.props.match.params.id;
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
            price,
            coin_type,
            countries,
            compositions,
            editObverseStart,
            editReverseStart
        } = this.state;

        return (
            <div className="coin-artisan">
                <header>
                    <h1>Admin Panel</h1>                    
                </header>
                <main>
                    <form onSubmit={(id !== 'create' && !isNaN(id)) ? this.handleEditSubmit : this.handleAddSubmit}>                    
                        <div className="coin-artisan-first-floor">
                            <div className="coin-artisan-first-floor-item">
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanName">Coin name</label>
                                    </div>
                                    <input required type="text" id="coinArtisanName" onChange={this.handleChange} value={coin_name} name="coinArtisanName"/>
                                </div>
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanFaceValue">Face value</label>
                                    </div>
                                    <input required type="text" id="coinArtisanFaceValue" onChange={this.handleChange} value={denomination} name="coinArtisanFaceValue"/>
                                </div>
                            </div>
                            <div className="coin-artisan-first-floor-item customTextareaViaLabel">
                                <div>
                                    <label htmlFor="coinArtisanShortDescription">Short description</label>
                                </div>
                                <textarea required name="coinArtisanShortDescription" id="coinArtisanShortDescription" cols="30" rows="9" onChange={this.handleChange} value={short_description}></textarea>
                            </div>
                            <div className="coin-artisan-first-floor-item coin-artisan-file-wrapper">
                                {
                                    obverse_path ? 
                                        <label htmlFor="coinArtisanObverse"><img src={obverse_path} alt="coin.PNG"/></label>
                                    : <label htmlFor="coinArtisanObverse"><span>+</span></label>
                                }
                                <div>
                                    <input 
                                        required={(id !== 'create' && !isNaN(id)) ? false : true}
                                        type="file" 
                                        id="coinArtisanObverse" 
                                        accept="image/png, image/jpeg" 
                                        name="coinArtisanObverse" 
                                        onChange={this.handleChange}
                                    />
                                    {
                                        (id !== 'create' && !isNaN(id)) ? 
                                        <a href={`http://localhost:3010/img/download/coins/${editObverseStart}`} target="_blank" rel="noopener noreferrer" >Download the actual obverse</a>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>



                        <div className="coin-artisan-second-floor">
                            <div className="coin-artisan-second-floor-item">
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanYear">Year of issue</label>
                                    </div>
                                    <input min="1000" max="2099" step="1" required type="number" id="coinArtisanYear" value={coin_year} onChange={this.handleChange} name="coinArtisanYear"/>
                                </div>
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanPrice">Price</label>
                                    </div>
                                    
                                    <input required type="number" id="coinArtisanPrice" name="coinArtisanPrice" value={price} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="coin-artisan-second-floor-item customTextareaViaLabel">
                                <div>
                                    <label htmlFor="coinArtisanLongDescription">Long description</label>
                                </div>
                                <textarea required name="coinArtisanLongDescription" id="coinArtisanLongDescription" cols="30" rows="9" value={full_description} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="coin-artisan-second-floor-item coin-artisan-file-wrapper">
                                {
                                    reverse_path ?
                                    <label htmlFor="coinArtisanReverse"><img src={reverse_path} alt="coin.PNG"/></label>
                                    : <label htmlFor="coinArtisanReverse"><span>+</span></label>
                                }
                                <div>
                                    <input 
                                        required={(id !== 'create' && !isNaN(id)) ? false : true}
                                        type="file" 
                                        id="coinArtisanReverse" 
                                        accept="image/png, image/jpeg" 
                                        name="coinArtisanReverse" 
                                        onChange={this.handleChange}
                                    />
                                    {
                                        (id !== 'create' && !isNaN(id)) ? 
                                        <a href={`http://localhost:3010/img/download/coins/${editReverseStart}`} target="_blank" rel="noopener noreferrer" >Download the actual reverse</a>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>




                        <div className="coin-artisan-third-floor">
                            <div className="coin-artisan-third-floor-item">
                                <div className="customSelectViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanCountry">Country</label>
                                    </div>
                                    <select required name="coinArtisanCountry" id="coinArtisanCountry" value={issuing_country} onChange={this.handleChange}>
                                        {
                                            countries.map((element) => {
                                                return (
                                                    <option value={element.country_name} key={element.id}>
                                                        {element.country_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="customSelectViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanMetal">Metal</label>
                                    </div>
                                    <select required id="coinArtisanMetal" name="coinArtisanMetal" value={composition} onChange={this.handleChange}>
                                        {
                                            compositions.map((element) => {
                                                return (
                                                    <option value={element.metal} key={element.id}>
                                                        {element.metal}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="coin-artisan-third-floor-item">
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanQuality">Quality of the coin</label>
                                    </div>
                                    <input required type="text" id="coinArtisanQuality" name="coinArtisanQuality" value={quality} onChange={this.handleChange} />
                                </div>
                                <div className="customInputViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanWeight">Weight</label>
                                    </div>
                                    <input step="any" required type="number" id="coinArtisanWeight" name="coinArtisanWeight" value={weight} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="coin-artisan-third-floor-item">
                                <div className="customSelectViaLabel">
                                    <div>
                                        <label htmlFor="coinArtisanType">Type</label>
                                    </div>
                                    <select name="coinArtisanType" id="coinArtisanType" required value={coin_type} onChange={this.handleChange}>
                                        <option value="2">Bullion</option>
                                        <option value="3">Exclusive</option>
                                        <option value="1">Commemorative</option>    
                                    </select>
                                </div>
                                <div className="coin-artisan-btns-wrapper">
                                    <button type="submit">
                                        {
                                            (id !== 'create' && !isNaN(id)) ? 'Edit' : 'Save'
                                        }                                    
                                    </button>
                                    <input type="button" onClick={()=>{this.props.history.goBack();}} value="Cancel" />
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