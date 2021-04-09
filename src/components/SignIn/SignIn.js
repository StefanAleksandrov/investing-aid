import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import './SignIn.scss';
import loginImage from '../../images/login.jpg';
import { onLogin } from '../../services/authService';
import { validateEmail, validatePassword } from '../../validators/authValidate';

export default function SignIn () {
    const history = useHistory();
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    function submitForm(e) {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const rememberMe = e.target.remember.checked;

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrorEmail(emailError);
        setErrorPassword(passwordError);

        if (emailError || passwordError) return;

        onLogin(email, password)
            .then(resp => {
                if ( rememberMe ) {
                    localStorage.setItem('user', resp.user.uid);
                    localStorage.setItem('email', resp.user.email);
                }
                
                history.push('/');
            })
            .catch(console.log);
    }

    return (
        <main className='page-container sign-in'>
            <div className="container">
                <img src={loginImage} width="700px" height="500px" alt="register" />

                <form className="form" onSubmit={submitForm} >
                    <h1>Login with your Account</h1>

                    <label className="error-container" >
                        Email:
                        <input type="text" name="email" className={errorEmail ? 'error' : ''} />
                        <div className={"error-message " + (errorEmail ? '' : 'hide') } >{errorEmail}</div>
                    </label>

                    <label className="error-container" >
                        Password:
                        <input type="password" name="password" className={errorPassword ? 'error' : ''} />
                        <div className={"error-message " + (errorPassword ? '' : 'hide') } >{errorPassword}</div>
                    </label>

                    <label className="center" >
                        Remember me
                        <input type="checkbox" className="checkbox" name="remember" />
                    </label>

                    <label>
                        <input type="submit" className="button" value="Login" />
                    </label>

                    <p>Don't have an account yet? <NavLink to='/sign-up'>Sign up here!</NavLink></p>
                </form>
            </div>
        </main>
    );
}