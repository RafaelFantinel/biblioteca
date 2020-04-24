'use_strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Auth Routes

Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/refresh', 'AuthController.refresh')
    Route.post('/logout', 'AuthController.logout')

    ///Restore password
    Route.post('/reset-password', 'AuthController.forgot')
    Route.get('/reset-password', 'AuthController.remember')
    Route.put('/reset-password', 'AuthController.reset')
})
