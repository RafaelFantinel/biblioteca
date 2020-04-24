'use strict'

const Database = use('Database');
const User = use('App/Models/User');
class AuthController {
    async register({ request, response }) {
        try {
            const { codigo_associado,username, email, password } = request.all();
            const user = await User.create({ codigo_associado, username, email, password })
            return response.status(201).send({ data: user });
        } catch (error) {
            return response.status(400).send({
                message: 'Erro ao realizar cadastro!'
            })
        }
    }
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        console.log(auth)
        let data = await auth.withRefreshToken().attempt(email, password)
        return response.send({ data })

    }
    async refresh({ request, response, auth }) {
        var refresh_token = request.input('refresh_token');

        if (!refresh_token) {
            refresh_token = request.header('refresh_token');
        }
        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token);
        return response.send({ data: user })
    }
    async logout({ request, response, auth }) {
        let refresh_token = request.input('refresh_token');

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }
        const loggedOut = await auth.authenticator('jwt').revokeTokens([refresh_token], true); // "true" deleta o token da base
        
        return response.status(204).send({ })//204 Indica que foi com sucesso e que a função é de retorno void

    }
    async forgot({ request, response }) {

    }
    async remember({ request, response }) {

    }
    async reset({ request, response }) {

    }
}

module.exports = AuthController