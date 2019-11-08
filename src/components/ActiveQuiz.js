import React from 'react'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className="active-quiz">
        <div className="title-quiz">
            <p><strong>{props.activeQuestion}.</strong> {props.question}</p>

            <small>{props.activeQuestion} з {props.quizLength}</small>
        </div>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)


export default ActiveQuiz