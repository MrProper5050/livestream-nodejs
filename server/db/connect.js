const {Sequelize} = require('sequelize')
module.exports = new Sequelize('mp5tream','postgres','1234',{
    dialect:'postgres',
    port:5432,
    sync:true,
    host:'localhost'
  })
  