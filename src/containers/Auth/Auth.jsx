import React, {Component} from 'react'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

    state = {
        isFomrValid: false,
        formControls: {
            email: {
                vale: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введіть коректний Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                vale: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введіть коректний Password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minlength: 6
                }
            }
        }
    }

    submitHandler = (even) => {
        even.preventDefault()
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }

        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPJx79p5hm7vJtT1weQ2PDYQ0_J17Zjcw', authData)
        //
        //     console.log(response.data);
        //
        // } catch (e) {
        //     console.log(e)
        // }

    }

    registerHandler = () => {


        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )


        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }


        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPJx79p5hm7vJtT1weQ2PDYQ0_J17Zjcw', authData)
        //
        //     console.log(response.data);
        //
        // } catch (e)
        // {
        //     console.log(e)
        // }

    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {

            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        // console.log(`${controlName}: `, event.target.value);

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                    errorMessage={control.errorMessage}
                />
            )
        })
    }

    render() {

        return (
            <div className="auth">
                <div>
                    <form onSubmit={this.submitHandler}>
                        <h1>Авторизація</h1>

                        {this.renderInputs()}

                        <div>
                            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
                                Зайти
                            </Button>
                            <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>
                                Реєстрація
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

// function mapStateToProps(dispatch) {
//     return {
//     }
// }

function mapDispatchToProps(dispatch) {
    return {
        auth: (email,password,isLogin) => dispatch(auth(email,password,isLogin))
    }
}

export default connect(null,mapDispatchToProps)(Auth)