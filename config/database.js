import { Sequelize } from "sequelize";

const db = new Sequelize("ppdb_zonasi", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

export default db;
