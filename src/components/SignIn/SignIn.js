import { NavLink } from 'react-router-dom';

import './SignIn.scss';
import loginImage from '../../images/login.jpg';

export default function SignIn () {
    function submitForm(e) {
        e.preventDefault();
        console.log((e.target.elements.email.value));
    }
    
    return (
        <main className='page-container sign-in'>
            <div className="container">
                <img src={loginImage} width="700px" height="500px" alt="register"/>

                <form className="form" onSubmit={submitForm} >
                    <h1>Login with your Account</h1>

                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    
                    <label>
                        Password:
                        <input type="password" name="password" />
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
    )
}