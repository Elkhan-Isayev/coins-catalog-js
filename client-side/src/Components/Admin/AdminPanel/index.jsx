import React, { Component } from 'react';
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
        console.log(token);
        if(token) {
            // const response  = await fetch('');
            // const data      = await response.json();
        }
        else {
            this.props.history.push('/');
        }
    }

    render = () => {
        return (
            <div>
                admin panel
            </div>
        )
    }
}

export default AdminPanel;