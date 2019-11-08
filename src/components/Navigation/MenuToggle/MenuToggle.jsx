import React from 'react'


const MenuToggle = props => {

    return (
        <div className="menu-toggle">
            <i className={props.isOpen ? 'fa fa-times open' : 'fa fa-bars'} onClick={props.onToggle}> </i>
        </div>
    )

}
export default MenuToggle