
const { DataTypes } = require('sequelize');
const sequelize = require('../connect')
const Strms = require('./streams.model1')

const User = sequelize.define('user', {
   
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    login: {
      type: DataTypes.STRING,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    streamID:{
      type: DataTypes.STRING,
      
    },
    nmsStreamID:{
      type: DataTypes.STRING,
      
    }
    //streams:{} // streams table using
},{});

// User.hasOne(Strms, {foreignKey: 'authorID'});
// User.belongsTo(Strms, {foreignKey:'authorId'})
// Strms.hasOne(User, {foreignKey: 'streamID'});

module.exports = User;