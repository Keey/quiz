import React, {Component} from 'react'
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

    redirectHome() {
        document.location.href="/";
    }

    componentDidMount() {
            this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillMount() {
        this.props.retryQuiz()
    }

    render() {

        const iPlus = this.props.activeQuestion;

        return (
            <div className="quiz">
                <div className="active-quiz-wrap">
                    { this.props.loading || !this.props.quiz ? <Loader/> : this.props.isFinish
                        ? <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                            onHome={this.redirectHome}
                        />
                        : <>
                            <h1>Дайте відповідь на питання</h1>
                            <ActiveQuiz
                                answers={this.props.quiz[iPlus].answers}
                                question={this.props.quiz[iPlus].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                activeQuestion={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                        </>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinish: state.quiz.isFinish,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: ()  => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)