'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Livro = use('App/Models/Livro')
/**
 * Resourceful controller for interacting with products
 */
class LivroController {
  /**
   * Show a list of all products.
   * GET livros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, pagination }) {
    const livros = await Livro.all()

    return view.render('/livros', {
      livros: livros.toJSON()
    })
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {
        
      const {autor, titulo , editora , local_edicao  , palavra_chave ,exemplar} = request.all();
      
      var random = Math.floor((Math.random() + 5000 + 5000) * 5000);
      const isbn = "989899-" +  random

    

      const livro = await Livro.create({autor,  titulo , editora , local_edicao , isbn , palavra_chave ,exemplar})
      return response.status(201).send(livro)  
    } catch (error) {
      response.status(400).send({ message: 'Não foi possivel criar o livro '})
    }
    
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, view }) {
    console.log('show')
    const livros = await Livro.find(params.id)
    return view.render('/livros', {
      quote: quote.toJSON()
    })
  }
  

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id}, request, response }) {
    const livro = await Livro.findOrFail(id)
    try {
      
      const {titulo , editora , local_edicao , isbn , palavra_chave } = request.all()
      livro.merge({ titulo , editora , local_edicao , isbn , palavra_chave })
      await livro.save()
      return response.send(livro)
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao atualizar o livro'})
    }

  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const livro = await Livro.findOrFail(id)
    try {
      await livro.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Não foi possivel deletar o livro '});
    }

  }
}

module.exports = LivroController