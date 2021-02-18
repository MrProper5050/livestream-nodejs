
const { DataTypes } = require('sequelize');
const sequelize = require('../connect')
const User = require('./user.model');

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
    }
   
});
// Strms.belongsTo(User)
// Strms.hasOne(User,{foreignKey: 'streamID'});

module.exports = Strms;