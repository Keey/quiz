import React, {Component} from 'react'

const links = [1,2,3]

class Drawer extends Component{
    renderLinks(){
        return links.map((link,index) => {
            return(
                <li key={index}>
                    <a> Link {link}</a>
                </li>
            )
        })
    }

    render(){
        return(
            <nav className={this.props.isOpen ? "drawer" : "drawer close"}>
                {this.renderLinks()}
            </nav>
        )
    }
}
export default Drawer