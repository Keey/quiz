import React, {Component} from 'react'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from '../../form/formFramework'
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

function createOption(number) {
    return createControl({
        label: `Варіант ${number}`, errorMessage: 'Значення не може бути пустим', id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Додайте питання', errorMessage: 'Питання не може бути пустим'
        }, {required: true}),
        option1: createOption(1),
        option2: createOption(2),
        option3: createOption(3),
        option4: createOption(4),
    }
}

 class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    onSubmitHandler = event => {
        event.preventDefault()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.createQuizQuestion(questionItem)

        console.log(questionItem)

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }


    createQuizHandler = event => {

        event.preventDefault()

           this.setState({
                   isFormValid: false,
                   rightAnswerId: 1,
                   formControls: createFormControls()
           })

        this.props.finishCreateQuiz()

    }


    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={index}
                    errorMassage={control.errorMessage}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    onChange={event => this.changeHandler(event.target.value, controlName)}

                />

            )

        })
    }

    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value})
    }

    render() {

        const select = <Select
            label="Виберіть правильну відповідь"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={
                [{text: 1, value: 1},
                    {text: 2, value: 2},
                    {text: 3, value: 3},
                    {text: 4, value: 4}]
            }
        />


        return (
            <div className="quiz-creator">
                <div>

                    <form onSubmit={this.onSubmitHandler}>
                        <h1>Створити Тест</h1>

                        {this.renderControls()}

                        {select}

                        <div>
                            <Button onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}> Додати
                                Питання</Button>
                            <Button onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}> Додати
                                Тест</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: ( ) => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)