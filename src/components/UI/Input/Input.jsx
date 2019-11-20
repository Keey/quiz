import React from 'react'

function isInvalid({valid,touched,shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {

    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`


    return (
        <div className={ isInvalid(props) ? 'input-wrapper invalid' : 'input-wrapper' } >
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType} id={htmlFor} value={props.value} onChange={props.onChange}/>

            { isInvalid(props) ? <span>{props.errorMassage}</span> : null }

        </div>
    )
}

export default Input