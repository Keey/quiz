import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class Drawer extends Component {

    clickHandler = () => {
        this.props.onToggle()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.to}
                             exact={link.exact}
                             activeClassName='active' onClick={this.clickHandler}>{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {

        // this.renderLinks(links)

        const links = [
           {to: '/', label: 'Список тестів', exact: false}
        ]

        console.log('AUTH', this.props.isAuthenticated)

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Створити тест', exact: false})
            links.push({to: '/logout', label: 'Вийти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизація', exact: true})
        }

        return (
            <nav className={this.props.isOpen ? "drawer" : "drawer close"}>
                {this.renderLinks(links)}
            </nav>
        )
    }
}

export default Drawer