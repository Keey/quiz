import React from 'react'
import AnswerItem from "./AnswerItem";

const AnswersList = props =>{
    console.log(props)
    return(
        <ul className='answers-list'>
            {props.answers.map((answer, index) => {
                return (<AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={ props.state ? props.state[answer.id] : null }
                />)
            } )}
        </ul>
    )
}


export default AnswersList