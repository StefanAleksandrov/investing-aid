import { Component } from 'react'
import './Header.scss'

import NavItem from '../NavItem/NavItem'

class PageHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogged: false,
            user: '',
            links: [
                {id: 0, title: 'About Us', link: '/about-us'},
                {id: 1, title: 'Contacts', link: '/contact-us'},
                {id: 2, title: 'Sign Up', link:'/sign-up'},
                {id: 3, title: 'Sign In', link:'/sign-in'}
            ]
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem('uid');
        console.log(uid);

        if ( uid ) {
            this.setState((state, props) => {
                return {
                    links: [
                        {id: 0, title: 'About Us', link: '/about-us'},
                        {id: 1, title: 'Contacts', link: '/contact-us'},
                        {id: 2, title: `Hello, ${uid}`, link:'/profile'},
                        {id: 3, title: 'Sign Out', link:'/sign-out'}
                    ]
                }
            });
        }
    }

    render() {
        return (
            <nav className='page-navigation' >
                <a href='/'><img src='/bitcoin.svg' alt='Bitcoin Logo' className='logo' /></a>
                
                <NavItem uid={this.state.uid} links={this.state.links} />
            </nav>
        )
    }


}

export default PageHeader;