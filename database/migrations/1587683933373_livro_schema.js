'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LivroSchema extends Schema {
  up () {
    this.create('livros', (table) => {
      table.increments()
      table.string('titulo').notNullable()
      table.string('editora').notNullable()
      table.string('local_edicao').notNullable()
      table.string('isbn').notNullable()
      table.string('palavras-chave').notNullable()
      table.timestamps()
      
    })
  }

  down () {
    this.drop('livros')
  }
}

module.exports = LivroSchema
