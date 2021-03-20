import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './NavItem.scss'

class NavItem extends Component {
    render() {
        return (
            <ul className='header-navigation'>
                {this.props.links.map(x => {
                    return (
                        <li className='nav-item' key={x.id}>
                            <NavLink to={x.link}>{x.title}</NavLink>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default NavItem;