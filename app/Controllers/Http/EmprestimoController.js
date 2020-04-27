'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Emprestimo = use('App/Models/Emprestimo')
const Database = use('Database')

/**
 * Resourceful controller for interacting with emprestimos
 */
class EmprestimoController {
  /**
   * Show a list of all emprestimos.
   * GET emprestimos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, view }) {
    const emprestimos = await Emprestimo.all()

    return view.render('/emprestimoHistorico', {
      emprestimos: emprestimos.toJSON()
    })
  }





  async alugar ({ request,response, view }) {
    
return view.render('alugar')
}
  
  


  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request,auth, response,view }) {
    try {
console.log('store')
      auth.getUser()
      const { user_id, livro_id, exemplar } = request.all();

      const titulo = await Database.select('titulo').from('livros').where('id', livro_id)
      const username = await Database.select('username').from('users').where('id', user_id)
      titulo.toString();
      username.toString();

      const emprestimos = await Emprestimo.create({ username,user_id,livro_id,exemplar,titulo })
      return view.render('/home')
    } catch (error) {
      response.status(400).send(error.toString())
    }

  }


  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response,view }) {
    console.log('show')
    const emprestimo = await Emprestimo.findOrFail(id)
    return render.view('/emprestimosHistorico')
  }

  /**
   * 
   * PUT or PATCH emprestimos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    console.log('update')
    const emprestimo = await Emprestimo.findOrFail(id)
    try {
      
      const { livro_id, titulo, exemplar} = request.all()
      emprestimo.merge({ livro_id, titulo, exemplar})
      await emprestimo.save()
      return response.send(emprestimo)
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'não foi possível atualizar o emprestimo!'
      })
    }
  }

  /**
   * Delete a emprestimo with id.
   * DELETE emprestimos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const emprestimo = await Emprestimo.findOrFail(id)
    const trx = await Database.beginTransaction()
    try {
      await emprestimo.livro().delete(trx)
      await emprestimo.user().delete(trx)
      await emprestimo.delete(trx)
      await trx.commit()
      return response.status(204).send()
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'Erro ao deletar este Emprestimo!'
      })
    }
  }


}



module.exports = EmprestimoController