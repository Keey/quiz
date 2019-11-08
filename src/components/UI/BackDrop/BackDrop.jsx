import React from 'react'

const BackDrop = props => {

    return (
        <div className={props.isOpen ? "backdrop open" : "backdrop"} onClick={props.onToggle}> </div>
    )

}


export default BackDrop