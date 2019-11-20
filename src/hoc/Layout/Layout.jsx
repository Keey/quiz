import React, {Component} from 'react'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import {connect} from "react-redux";

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
                <Drawer isOpen={this.state.menu} onToggle={this.toggleMenuHeandler} isAuthenticated={this.props.isAuthenticated}/>
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

function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)