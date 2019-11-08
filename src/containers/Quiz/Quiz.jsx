import React, {Component} from 'react'
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

    state = {
        results: {}, // { [id] : 'success' 'error' }
        isFinish: false,
        activeQuestion: 0,
        answerState: null, //{ [id]: 'success' 'error'  }
        quiz: [
            {
                question: 'Якого кольору небо?',
                rightAnswersId: 2,
                id: 1,
                answers: [
                    {text: "Чорний", id: 1},
                    {text: "Синій", id: 2},
                    {text: "Жовтий", id: 3},
                    {text: "Червоний", id: 4}
                ]
            },
            {
                question: 'Якого кольору Сонце?',
                rightAnswersId: 1,
                id: 2,
                answers: [
                    {text: "Жовтий", id: 1},
                    {text: "Червоний", id: 2},
                    {text: "Синій", id: 3},
                    {text: "Чорний", id: 4}
                ]
            }
        ]
    }

    onRightAnswersIdHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswersId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    console.log('Finish')

                    this.setState({
                        isFinish: true
                    })


                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {

            results[question.id] = 'error'

            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinish: false,
            results:{}
        })
    }

    render() {

        const iPlus = this.state.activeQuestion;

        return (
            <div className="quiz">
                <div className="active-quiz-wrap">
                    {this.state.isFinish
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <>
                            <h1>Дайте відповідь на питання</h1>
                            <ActiveQuiz
                                answers={this.state.quiz[iPlus].answers}
                                question={this.state.quiz[iPlus].question}
                                onAnswerClick={this.onRightAnswersIdHandler}
                                quizLength={this.state.quiz.length}
                                activeQuestion={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                        </>

                    }

                </div>
            </div>
        )
    }
}

export default Quiz