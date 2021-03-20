import { Component } from 'react'
import './NavItem.scss'

class NavItem extends Component {
    render() {
        return (
            <ul className='header-navigation'>
            {this.props.links.map(x => {
                return <li className='nav-item' key={x.id}><a href={x.link}>{x.title}</a></li>
            })}
            </ul>
        )
    }
}

export default NavItem;