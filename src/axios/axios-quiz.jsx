import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-531cd.firebaseio.com/'
})