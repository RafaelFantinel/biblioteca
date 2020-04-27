'use strict'
class Login {
  get rules () {
    return {
      email:'required|email',
      password:'required|min:8',
    }
  }

  get messages(){
    return{
      'email.required':'email is required',
      'password.required':'password is required',
  

    }
  }
}
module.exports = Login