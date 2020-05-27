import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",    
            regLogin: "",
            regPass: "",
            regPassConfirm: "",        
            loginErr: false,
            passwordErr: false,
            serverErr: false,
            isRegistrationMode: false
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
            if(!response.ok) {
                return;
            }
            else {
                const data = await response.json();
                switch(data.role) {
                    case 1:
                        this.props.history.push('/admin-panel');
                    break;
                    case 2: 
                        this.props.history.push('/');
                    break;
                    default: break;
                }
            }
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
                        this.props.history.push('/');
                    break;
                    default:
                        alert("Something goes wrong. Please, try again");
                    break;
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    handleRegistration = async(e) => {
        e.preventDefault();
        const {
            regLogin, 
            regPass, 
            regPassConfirm
        } = this.state;
        if(regPass !== regPassConfirm) {
            alert("Confirm password!");
            return;
        }   
        const loginViaPass  = {regLogin, regPass};
        const options       = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(loginViaPass)
        };

        try {
            const response = await fetch('http://localhost:3010/registration', options);
            console.log(response);
            if(response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                switch(data.role) {
                    case 1:
                        this.props.history.push('/admin-panel');
                    break;

                    case 2:
                        this.props.history.push('/');
                    break;
                    default: break;
                }
            }
            else {
                alert("Something goes wrong. Please try again");
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

    handleRegLoginChange = (e) => {
        this.setState({regLogin: e.target.value});
    }

    handleRegPass = (e) => {
        this.setState({regPass: e.target.value});
    }

    handleRegPassConfirm = (e) => {
        this.setState({regPassConfirm: e.target.value});
    }

    render = () => {
        const {
            login, 
            password, 
            loginErr, 
            passwordErr, 
            serverErr, 
            isRegistrationMode, 
            regLogin, 
            regPass, 
            regPassConfirm
        } = this.state;

        return (
            <div className="sign-in">
                <header>
                    <h1>Log in</h1>
                    <div>
                        <Link to="/">Homepage </Link><span>— Log in</span>
                    </div>
                </header>
                <main>
                    {
                        isRegistrationMode ?
                        <form autoComplete="off" onSubmit={this.handleRegistration} className="slideRigth">
                            <div>
                                <div>
                                    <div><label htmlFor="">Username</label></div>
                                    <input type="text" placeholder="login" onChange={this.handleRegLoginChange} value={regLogin} pattern=".{6,}"   required title="Login should be at least 6 characters" />                                    
                                </div>        
                                <div>
                                    <div><label htmlFor="">Password</label></div>
                                    <input type="password" placeholder="new password" onChange={this.handleRegPass} value={regPass} pattern=".{6,}" required title="Password should be at least 6 characters"/>                                    
                                </div>        
                                <div>
                                    <div><label htmlFor="">Confirm password</label></div>
                                    <input type="password" placeholder="confirm new password" onChange={this.handleRegPassConfirm} value={regPassConfirm} pattern=".{6,}" required title="Password should be at least 6 characters"/>                                    
                                </div>        
                                <button type="submit">Confirm</button>
                                <p>
                                    Have an account  ?
                                    <span onClick={() => {this.setState({isRegistrationMode: !isRegistrationMode})}} style={{color: "blue", cursor: "pointer"}}>  
                                        {" "}Log in
                                    </span>
                                </p>
                            </div>
                        </form>
                        :
                        <form onSubmit={this.handleSubmit} autoComplete="off" className="slideLeft">
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

                                <p>
                                    Don't have an account  ?
                                    <span onClick={() => {this.setState({isRegistrationMode: !isRegistrationMode}) }} style={{color: "blue", cursor: "pointer"}}>  
                                        {" "}Registration
                                    </span>
                                </p>
                            </div>
                        </form>
                    }
                </main>
            </div>
        )
    }
}

export default SignIn;