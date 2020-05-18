import React, {Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from '../Components/User/HomePage/index';
import SignIn from '../Components/Admin/SignIn/index';
import AdminPanel from '../Components/Admin/AdminPanel/index';

class App extends Component {

    render = () => {
        return (
            <div>
                <BrowserRouter>
                    {/* <Redirect to='/account'/> */}
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/sign-in" component={SignIn} />
                    <Route exact path="/admin-panel" component={AdminPanel} />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;