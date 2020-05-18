import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ""
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
            console.log(response);
            if(!response.ok) {
                alert("Access denied");
                this.props.history.push('/sign-in');
            }
        }
        catch(err) {
            alert("Access denied");
            this.props.history.push('/sign-in');
        }
        this.getCoins();
    }

    getCoins = () => {

    }

    handleSignOut = (e) => {
        localStorage.removeItem('token');
    }

    render = () => {
        return (
            <div className="admin-panel">
                <header>
                    <div>
                        <h1>Admin Panel</h1>
                    </div>
                    <div>
                        <Link to="/sign-in" onClick={this.handleSignOut}>Sign out</Link>
                    </div>
                </header>
                <main>

                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

export default AdminPanel;