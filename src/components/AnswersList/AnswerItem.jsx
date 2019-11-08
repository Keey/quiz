import React from 'react'

const AnswerItem = props => {
    // console.log(props)
    return (
        <li className={props.state ? props.state : null }
            onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )

}


export default AnswerItem