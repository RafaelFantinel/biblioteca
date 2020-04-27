'use_strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', ({ view }) => {
  return view.render('home')
})
//Auth view 
Route.get('register', ({ view }) => {
    return view.render('register')
  })
  Route.get('/login', ({ view }) => {
    return view.render('login')
  })

//Livros view
Route.get('/criarLivros', ({ view }) => {
  return view.render('criarLivros')
})
//Auth Routes
Route.group(() => {
    Route.post('/register', 'AuthController.register').validator(['Register'])
    Route.post('/login', 'AuthController.login').validator(['Login'])

    Route.post('/refresh', 'AuthController.refresh')
    Route.post('/logout', 'AuthController.logout')

    ///Restore password
    Route.post('/reset-password', 'AuthController.forgot')
    Route.get('/reset-password', 'AuthController.remember')
    Route.put('/reset-password', 'AuthController.reset')
})
Route.group(() => {
    Route.resource('livros', 'LivroController').apiOnly()

})
Route.group(() => {
    Route.resource('emprestimos', 'EmprestimoController').apiOnly().validator(['Alugar'])
    Route.get('/alugar', 'EmprestimoController.alugar')
})