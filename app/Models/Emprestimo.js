'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Emprestimo extends Model {
  static boot () {
    super.boot()

  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

 



  livro () {
    return this.hasMany('App/Models/Livro','livro_id','id')
  }
}

module.exports = Emprestimo