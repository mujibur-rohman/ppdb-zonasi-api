"use strict";
const { uuid } = require("uuidv4");
const argon2 = require("argon2");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: uuid(),
          fullName: "Admin",
          email: "admin@gmail.com",
          password: await argon2.hash("111111"),
          role: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
