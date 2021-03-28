import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.scss';

export default class NavItem extends Component {
    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }

    signOut(e) {
        e.preventDefault();

        if (this.props.username && localStorage.getItem('user') && localStorage.getItem('email')) {
            localStorage.removeItem('user');
            localStorage.removeItem('email');

            window.location.replace("http://localhost:3000");
            // this.setState((oldState) => ({ ...oldState, redirect: true}));
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
            </ul>
        )
    }
}