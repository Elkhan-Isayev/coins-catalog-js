import React, {Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from '../Components/User/HomePage/index';
import SignIn from '../Components/Admin/SignIn/index';
import AdminPanel from '../Components/Admin/AdminPanel/index';
import Description from '../Components/Common/Description/index';
import CoinArtisan from '../Components/Admin/CoinArtisan/index';
import CoinsList from '../Components/User/List/index';
import Cart from '../Components/User/Cart/index';

class App extends Component {

    render = () => {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/list" component={CoinsList} />
                    <Route exact path="/sign-in" component={SignIn} />
                    <Route exact path="/admin-panel" component={AdminPanel} />
                    <Route exact path="/coin/artisan/:id" component={CoinArtisan} />
                    <Route exact path="/description/:id" component={Description} />
                    
                </BrowserRouter>
            </div>
        )
    }
}

export default App;