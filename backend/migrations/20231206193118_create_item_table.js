/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments('item_ID').primary();
    table.integer('user_info_ID');
    table.foreign('user_info_ID').references('user_info.user_info_ID')
    table.string('item_name');
    table.string('description');
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('user_info_ID')
  })
  .then(function(){
    return knex.schema.dropTableIfExists('item')
  })
};

