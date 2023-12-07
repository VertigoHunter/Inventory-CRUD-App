/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {item_ID: 1, user_info_ID: '2', item_name: 'ACME Main Engine', description: 'This is the main engine of an ACME space launch vehicle.', quantity: '1'},
    {item_ID: 2, user_info_ID: '2', item_name: 'ACME Fuel Tank', description: 'This is a generic fuel tank for ACME missiles, rockets, and launch vehicles.', quantity: '1'},
  ]);
};
