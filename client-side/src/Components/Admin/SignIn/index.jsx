import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        this.checkForRedirect();
    }

    checkForRedirect = async() => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }
        try {
            const response  = await fetch(`http://localhost:3010/sign-in/admin-panel/${token}`);
            console.log(response);
            if(!response.ok) {
                return;
            }
            this.props.history.push('/admin-panel');
        }
        catch(err) {
            return;
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
            const response  = await fetch('http://localhost:3010/sign-in', options);
            const data      = await response.json();
            if(!response.ok) {
                if(data.loginError) {
                    this.setState({loginErr:    true});
                }
                if(data.passwordError) {
                    this.setState({passwordErr: true});
                }
                if(data.serverError) {
                    this.setState({serverErr:   true});
                }
                return;
            }
            if(data.token && data.user_role) {
                localStorage.setItem('token', data.token);
                switch(data.user_role) {
                    case 1:
                        this.props.history.push('/admin-panel');
                    break;
                    case 2: 

                    break;
                    default:
                        this.props.history.push('/');
                    break;
                }
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
                    <h1>Login</h1>
                    <div>
                        <Link to="/">Homepage </Link><span>— Login</span>
                    </div>
                </header>
                <main>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div>
                            <div>
                                <div>
                                    <label htmlFor="login">Login</label> 
                                    { loginErr && <span>&nbsp;&#127987;&nbsp;{"Invalid login"}</span> }
                                </div> 
                                <input type="text" id="login" value={login} onChange={this.handleLoginChange} required placeholder="login" />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    { passwordErr && <span>&nbsp;&#127987;&nbsp;{"Invalid password"}</span> }
                                </div>
                                <input type="password" id="password" value={password} onChange={this.handlePasswordChange} required placeholder="password" />
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