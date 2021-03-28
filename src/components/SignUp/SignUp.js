import { NavLink } from 'react-router-dom';

import './SignUp.scss';
import registerImage from '../../images/register.jpg';
import { onRegister } from '../../services/authService';

export default function SignUp({ history }) {
    function submitForm(e) {
        e.preventDefault();

        //TODO validate

        //Register user
        onRegister(e.target.elements.email.value, e.target.elements.username.value, e.target.elements.password.value)
            .then(() => {
                history.push('/');
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <main className='page-container sign-up'>
            <div className="container">
                <img src={registerImage} width="700px" height="500px" alt="register" />

                <form className="form" onSubmit={submitForm} >
                    <h1>Create a New Account</h1>

                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>

                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>

                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>

                    <label>
                        Repeat Password:
                        <input type="password" name="re-password" />
                    </label>

                    <label>
                        <input type="submit" className="button" value="Register" />
                    </label>

                    <p>Already have an account? <NavLink to='/sign-in'>Login here!</NavLink></p>
                </form>
            </div>
        </main>
    );
}