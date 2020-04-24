'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LivroSchema extends Schema {
  up () {
    this.create('emprestimos', table => {
      table.increments()
      
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.integer('livro_id').unsigned().index()
      table.foreign('livro_id').references('id').on('livros').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('emprestimos')
  }
}

module.exports = LivroSchema


