import React, {Component} from 'react'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import BackDrop from "../../components/UI/BackDrop/BackDrop";

class Layout extends Component {

    state = {
        menu: false
    }

    toggleMenuHeandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        return (
            <div className="layout">
                <Drawer isOpen={this.state.menu} />
                <BackDrop isOpen={this.state.menu} onToggle={this.toggleMenuHeandler}/>
                <MenuToggle
                    onToggle={this.toggleMenuHeandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout