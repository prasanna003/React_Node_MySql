module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "NodeMySql",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  jwtsecretkey: "yektercesym"
};