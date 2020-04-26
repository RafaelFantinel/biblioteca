'use_strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
//Auth view 
Route.get('register', ({ view }) => {
    return view.render('register')
  })
  Route.get('login', ({ view }) => {
    return view.render('login')
  })
  Route.get('/logado', ({ view }) => {
    return view.render('logado')
  })
//Auth Routes
Route.group(() => {
    Route.post('/register', 'AuthController.register').validator(['Register'])
    Route.post('/login', 'AuthController.login')
    Route.post('/refresh', 'AuthController.refresh')
    Route.post('/logout', 'AuthController.logout')

    ///Restore password
    Route.post('/reset-password', 'AuthController.forgot')
    Route.get('/reset-password', 'AuthController.remember')
    Route.put('/reset-password', 'AuthController.reset')
})
Route.group(() => {
    Route.resource('livros', 'LivroController').apiOnly().middleware(['auth'])

})
Route.group(() => {
    Route.resource('emprestimos', 'EmprestimoController').apiOnly().middleware(['auth'])

})