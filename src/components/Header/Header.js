import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import NavItem from '../NavItem/NavItem';
import { getUsername } from '../../services/authService';

export default function PageHeader ({
    currentUser
}) {
    const [username, setUsername] = useState('');
    const [links, setLinks] = useState([
                    { id: 0, title: 'About', link: '/about-us' },
                    { id: 1, title: 'Sign In', link: '/sign-in' },
                    { id: 2, title: 'Sign Up', link: '/sign-up' },
                ]);

    useEffect(() => {
        if ( currentUser ) {
            getUsername(currentUser.uid)
                .then(({username}) => {
                    setUsername(username);
                    setLinks([
                        { id: 0, title: 'Currency Rates', link: '/currency-rates' },
                        { id: 1, title: username, link: '/profile' },
                        { id: 2, title: 'Add Record', link: '/add-record' },
                        { id: 3, title: 'Sign Out', link: '/sign-out' }
                    ]);
                    localStorage.username = username;
                })
                .catch(console.log);
        } else {
            setLinks([
                { id: 0, title: 'About', link: '/about-us' },
                { id: 1, title: 'Sign In', link: '/sign-in' },
                { id: 2, title: 'Sign Up', link: '/sign-up' },
            ]);
        }
    }, [currentUser]);

    return (
        <nav className='page-navigation' >
            <Link to='/' className='logo' >
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="bitcoin" className="svg-inline--fa fa-bitcoin fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="yellow" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.191-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.198-6.781-11.153 44.686c-5.922-1.349-11.735-2.682-17.377-4.084l.031-.14-37.53-9.37-7.239 29.062s20.191 4.627 19.765 4.913c11.022 2.751 13.014 10.044 12.68 15.825l-12.696 50.925c.76.194 1.744.473 2.829.907-.907-.225-1.876-.473-2.876-.713l-17.796 71.338c-1.349 3.348-4.767 8.37-12.471 6.464.271.395-19.78-4.937-19.78-4.937l-13.51 31.147 35.414 8.827c6.588 1.651 13.045 3.379 19.4 5.006l-11.262 45.213 27.182 6.781 11.153-44.733a1038.209 1038.209 0 0 0 21.687 5.627l-11.115 44.523 27.213 6.781 11.262-45.128c46.404 8.781 81.299 5.239 95.986-36.727 11.836-33.79-.589-53.281-25.004-65.991 17.78-4.098 31.174-15.792 34.747-39.949zm-62.177 87.179c-8.41 33.79-65.308 15.523-83.755 10.943l14.944-59.899c18.446 4.603 77.6 13.717 68.811 48.956zm8.417-87.667c-7.673 30.736-55.031 15.12-70.393 11.292l13.548-54.327c15.363 3.828 64.836 10.973 56.845 43.035z"></path></svg>
            </Link>

            <NavItem links={links} username={username} />
        </nav>
    );
}