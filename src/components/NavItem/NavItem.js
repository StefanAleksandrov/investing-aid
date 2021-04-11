import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { auth } from '../../config/firebaseInit';
import AuthContext from '../../contexts/AuthContext';

import './NavItem.scss';

export default class NavItem extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut(e) {
        e.preventDefault();
        
        if (localStorage.uid || localStorage.email || localStorage.username ) {
            localStorage.removeItem('uid');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
        }
        
        //set auth context to empty strings
        this.context[1](() => ({email: '', uid: '', username:''}) );
        auth.signOut();
        this.props.history.push('/');
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
            </ul>
        )
    }
}