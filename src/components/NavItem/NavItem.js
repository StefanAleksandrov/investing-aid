import { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { auth } from '../../config/firebaseInit';

import './NavItem.scss';

export default class NavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }

        this.signOut = this.signOut.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    signOut(e) {
        e.preventDefault();

        if (localStorage.getItem('user') && localStorage.getItem('email')) {
            localStorage.removeItem('user');
            localStorage.removeItem('email');
        }

        this.setState((state) => ({
            ...state,
            redirect: true,
        }));

        auth.signOut();
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <ul className='header-navigation'>
                {this.props.links.map(x => {
                    return (
                        <li className='nav-item' key={x.id}>
                            { x.link === '/sign-out'
                                ? <a href='/' onClick={this.signOut} >{x.title}</a>
                                : <NavLink to={x.link} >{x.title}</NavLink>
                            }
                        </li>
                    )
                })}

                { this.renderRedirect() }
            </ul>
        )
    }
}