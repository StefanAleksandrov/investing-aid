import './SignUp.scss';
import registerImage from '../../images/register.jpg';

export default function SignUp () {
    return (
        <main className='page-container sign-up'>

            <div className="container">

                <img src={registerImage} width="700px" height="500px" alt="register"/>

                <form className="form" >
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
                        Age:
                        <input type="number" name="age" />
                    </label>
                    
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    
                    <label>
                        Repeat Password:
                        <input type="number" name="re-password" />
                    </label>

                    <label>
                        <input type="submit" className="button" value="Register" />
                    </label>
                </form>
            </div>
        </main>
    )
}