'use strict'

const Database = use('Database');
const User = use('App/Models/User');

class AuthController {
    async register({ request, response }) {
        console.log('register')
        try {
            const { username, email,password,endereco } = request.all();
           var  data = new Date()
           data = data.getFullYear()
           var random = Math.floor((Math.random() + 5000 + 5000) * 5000);
           const codigo_associado = data +  random 
              const usuario = await User.create({ codigo_associado, username, email, password,endereco })

              
            
            
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao realizar cadastro!'
            })
        }
    }
    async login({request, auth, response}) {
        console.log('login')
        const {email, password} = request.all();
        let token = await auth.attempt(email, password);
        response.redirect('/')
    }
    async refresh({ request, response, auth }) {
        var refresh_token = request.input('refresh_token');

        if (!refresh_token) {
            refresh_token = request.header('refresh_token');
        }
        const usuario = await auth.newRefreshToken().generateForRefreshToken(refresh_token);
        return response.send({ data: usuario })
    }
    async logout({ request, response, auth }) {
        let refresh_token = request.input('refresh_token');

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }
        const loggedOut = await auth.authenticator('jwt').revokeTokens([refresh_token], true); // "true" deleta o token da base
        
        return response.status(204).send({ })

    }
    async forgot({ request, response }) {

    }
    async remember({ request, response }) {

    }
    async reset({ request, response }) {

    }
}

module.exports = AuthController