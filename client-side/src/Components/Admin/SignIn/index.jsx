import React, { Component } from 'react';
import './style.scss';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",            
            loginErr: false,
            passwordErr: false,
            serverErr: false
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        if(token) {
            // redirect to admin room..
            // We must check so then redirect this one .
            this.props.history.push('/admin-panel');
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const {login, password} = this.state;
        if(!login || !password) {
            
            return;
        }
        this.setState({loginErr: "", passwordErr: "", serverErr: ""});
        const sendableData  = {login, password};
        const options       = {
            // mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(sendableData)
        };
        try {
            const response  = await fetch('http://localhost:3010/signin', options);
            const data      = await response.json();
            if(!response.ok) {
                if(data.loginError) {
                    this.setState({loginErr: true});
                }
                if(data.passwordError) {
                    this.setState({passwordErr: true});
                }
                if(data.serverError) {
                    this.setState({serverErr: true});
                }
                return;
            }
            if(data.token) {
                localStorage.setItem('token', data.token);
                this.props.history.push('/admin-panel');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    
    // Handle fields changes

    handleLoginChange = (e) => {
        this.setState({login: e.target.value, serverErr: false, loginErr: false});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value, serverErr: false, passwordErr: false});
    }

    render = () => {
        const {login, password, loginErr, passwordErr, serverErr} = this.state;
        return (
            <div className="sign-in">
                <header>
                    <h1>Admin Panel</h1>
                </header>
                <main>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div>
                            <div>
                                <div>
                                    <label htmlFor="login">Login</label> 
                                    { loginErr && <span>&nbsp;&#127987;&nbsp;{"Invalid login"}</span> }
                                </div> 
                                <input type="text" id="login" value={login} onChange={this.handleLoginChange} required />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    { passwordErr && <span>&nbsp;&#127987;&nbsp;{"Invalid password"}</span> }
                                </div>
                                <input type="password" id="password" value={password} onChange={this.handlePasswordChange} required />
                            </div> 
                            <button type="submit">Sign in</button>
                            { serverErr && <span><br/><br/>&#127987;&nbsp;{"Uncaught server error "}</span> }
                        </div>
                    </form>
                    
                </main>
            </div>
        )
    }
}

export default SignIn;