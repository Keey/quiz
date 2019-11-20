import React from 'react'
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success") {
            total++
        }
        return total
    },0)


    return (

        <div className="finish-quiz">
            <div className="h1">Тест пройдено</div>
            <ul>
                {
                    props.quiz.map((quiz, index) => {

                            const cls = props.results[quiz.id] === 'error' ? 'fa fa-times' : 'fa fa-check'

                            return (
                                <li key={index}><strong>{index + 1}. </strong>{quiz.question} <i className={cls}></i></li>
                            )
                        }
                    )

                }
            </ul>
            <p>Правильно {successCount} з {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry}>Повторити</Button>
                <Link to={'/'}>
                 <Button>Перейти в список тестів</Button>
                </Link>
            </div>

        </div>
    )
}
export default FinishedQuiz