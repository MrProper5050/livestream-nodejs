
const { DataTypes } = require('sequelize');
const sequelize = require('../connect');
// const StreamsT = require('./streams.model1');
// const User = require('./user.model');

const Strms = sequelize.define('streams', {
   
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
      },
      
      authorLogin: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      //authorId
      authorId: {
        type: DataTypes.STRING,
        allowNull: false
      },
  
      title: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      state: {
          type: DataTypes.STRING,
          allowNull:false,
      },
      nmsId:{
        type: DataTypes.STRING
      }
   
});
// Strms.belongsTo(User)
// Strms.hasOne(User, {foreignKey: 'streamID'});
// User.hasOne(Streams, {foreignKey: 'authorID'});
// Strms.belongsTo(User, {foreignKey:'streamID'})
// User.hasOne(Strms, {foreignKey: 'authorId'});
// Strms.belongsTo(StreamsT)
// Strms.hasOne(User, {foreignKey: 'streamID'});
module.exports = Strms;