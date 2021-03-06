import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './SignUp.scss';
import registerImage from '../../images/register.jpg';
import { onRegister } from '../../services/authService';
import { validateEmail, validateUsername, validatePassword, validateRepeatPassword } from '../../validators/authValidate';
import NotifictaionContext from '../../contexts/NotificationContext';
import AuthContext from '../../contexts/AuthContext';

export default function SignUp({
    history,
}) {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRepeatPassword, setErrorRepeatPassword] = useState('');

    const dispatch = useContext(NotifictaionContext)[1];
    const setCurrentUser = useContext(AuthContext)[1];

    function submitForm(e) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const repeatPassword = e.target.elements.repassword.value;

        const emailError = validateEmail(email);
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        const rePasswordError = validateRepeatPassword(password, repeatPassword);

        setErrorEmail(emailError);
        setErrorUsername(usernameError);
        setErrorPassword(passwordError);
        setErrorRepeatPassword(rePasswordError);

        //Validate
        if (emailError || usernameError || passwordError || rePasswordError) return;

        //Register user
        onRegister(email, username, password)
            .then(() => {
                dispatch({ message: 'Successfull registration!', type: 'success', action: 'NOTIFY'});
                setCurrentUser(() => ({uid: localStorage.uid, email, username}));
                history.push('/');
            })
            .catch(err => dispatch({ message: err.message, type: 'error', action: 'NOTIFY'}) );
    }

    return (
        <main className='page-container sign-up'>
            <div className="container">
                <img src={registerImage} width="700px" height="500px" alt="register" />

                <form className="form" onSubmit={submitForm} >
                    <h1>Create a New Account</h1>

                    <label className="error-container" >
                        Email:
                        <input type="text" name="email" className={errorEmail ? 'error' : ''} />
                        <div className={"error-message " + (errorEmail ? '' : 'hide')} >{errorEmail}</div>
                    </label>

                    <label className="error-container" >
                        Username:
                        <input type="text" name="username" className={errorUsername ? 'error' : ''} />
                        <div className={"error-message " + (errorUsername ? '' : 'hide')} >{errorUsername}</div>
                    </label>

                    <label className="error-container" >
                        Password:
                        <input type="password" name="password" className={errorPassword ? 'error' : ''} />
                        <div className={"error-message " + (errorPassword ? '' : 'hide')} >{errorPassword}</div>
                    </label>

                    <label className="error-container" >
                        Repeat Password:
                        <input type="password" name="repassword" className={errorRepeatPassword ? 'error' : ''} />
                        <div className={"error-message " + (errorRepeatPassword ? '' : 'hide')} >{errorRepeatPassword}</div>
                    </label>

                    <label>
                        <input type="submit" className="button" value="Register" />
                    </label>

                    <p>Already have an account? <NavLink to='/sign-in'>Sign in</NavLink> now!</p>
                </form>
            </div>
        </main>
    );
}